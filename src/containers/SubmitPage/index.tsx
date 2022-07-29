import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import countryList from "react-select-country-list";
import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth";
import SimpleTable from "../../components/table";
import { surveyFields, userTypeOptions } from "../../utils/data";

const SubmitPage = () => {
  const authUser = useAuthUser();
  const router = useRouter();

  const [surveyData, setSurveyData] = useState<any>([]);

  useEffect(() => {
    const getSurveyData = async () => {
      const token = await authUser.getIdToken();

      if (!token) return;

      const response = await fetch("/api/survey", {
        method: "GET",
        headers: {
          Authorization: token || "unauthenticated"
        }
      });
      const data = await response.json();
      if (!response.ok) {
        console.error(`Data fetching failed with status ${response.status}: ${JSON.stringify(data)}`);
        return null;
      }
      return data;
    };

    const getTableData = (source: any) => {
      const survey: any = [];
      source.forEach((data: any) => {
        const entityType: string = data.entityType;
        type ObjectKey = keyof typeof surveyFields.document;
        const matched = surveyFields.document[entityType as ObjectKey];
        const VerificationDocument = () => (
          <div className="max-w-full overflow-hidden text-ellipsis">
            {matched.map((matchedData) => {
              if (matchedData.name === "VATnumberCode") {
                return <p>{`Company VAT number : ${data[matchedData.name]}`}</p>;
              }
              return (
                <p
                  onClick={() => {
                    router.push(data[matchedData.name]);
                  }}
                  className="overflow-hidden text-blue-500 underline cursor-pointer text-ellipsis whitespace-nowrap">
                  {matchedData.label}
                </p>
              );
            })}
          </div>
        );

        const EkycDetails = () => (
          <div className="max-w-full overflow-hidden text-ellipsis">
            <p>{`DoB: ${data.birth}`}</p>
            <p
              onClick={() => router.push(data.governmentId)}
              className="overflow-hidden text-blue-500 underline cursor-pointer whitespace-nowrap text-ellipsis">
              Government ID
            </p>
            <p
              onClick={() => router.push(data.passport)}
              className="overflow-hidden text-blue-500 underline cursor-pointer whitespace-nowrap text-ellipsis">
              Passport
            </p>
          </div>
        );

        survey.push([
          <p>{`${data.firstName} ${data.lastName}`}</p>,
          data.email,
          <p
            onClick={() => router.push(data.companySite)}
            className="overflow-hidden text-blue-500 underline cursor-pointer text-ellipsis">
            {data.companySite},
          </p>,
          data.companyEntity,
          countryList().getLabel(data.location),
          userTypeOptions.find((data) => data.value === entityType)?.label,
          data.requestDescription,
          <VerificationDocument />,
          <EkycDetails />
        ]);
      });

      setSurveyData([...survey]);
    };

    getSurveyData()
      .then((res) => {
        if (res) {
          getTableData(res);
        }
      })
      .catch(console.error);
  }, [authUser]);

  return (
    <div className="container px-4 mx-auto">
      <div className="p-6 py-8 space-y-8">
        <button onClick={() => router.push("/")} className="p-2 px-6 text-sm bg-gray-200 rounded ">
          Go Back
        </button>
        <SimpleTable
          header={[
            "First and Last Name",
            "Email",
            "Company Website",
            "Company or Entity Name",
            "Location Registered",
            "Type of Entity",
            "Description of Request",
            "Company Verification Documents",
            "eKYC details"
          ]}
          body={[...surveyData]}
        />
      </div>
    </div>
  );
};

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(SubmitPage);
