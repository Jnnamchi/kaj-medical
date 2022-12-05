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
      source.forEach((data: any, id: number) => {
        const entityType: string = data.entityType;
        type ObjectKey = keyof typeof surveyFields.document;
        const matched = surveyFields.document[entityType as ObjectKey];
        const VerificationDocument = () => (
          <div className="max-w-full overflow-hidden text-ellipsis">
            {matched?.map((matchedData, idx) => {
              if (matchedData.name === "VATnumberCode") {
                return <p key={`${id}-${idx}`}>{`Company VAT number : ${data[matchedData.name]}`}</p>;
              }

              return (
                <div className="flex space-x-2 ">
                  <p
                    key={`${id}-${idx}`}
                    onClick={() => {
                      router.push(data[matchedData.name]["deployUrl"]);
                    }}
                    className="overflow-hidden text-blue-500 underline cursor-pointer text-ellipsis whitespace-nowrap">
                    {matchedData.label}
                  </p>
                  <TamperStatus status={!data[matchedData.name]?.tamperingDetected?.createEditTimes?.result} />
                </div>
              );
            })}
          </div>
        );

        const EkycDetails = () => (
          <div className="max-w-full overflow-hidden text-ellipsis">
            <p>{`DoB: ${data.birth}`}</p>
            <div className="flex space-x-2 ">
              <p
                onClick={() => router.push(data.governmentId["deployUrl"])}
                className="overflow-hidden text-blue-500 underline cursor-pointer whitespace-nowrap text-ellipsis">
                Government ID
              </p>
              <TamperStatus status={!data.governmentId?.tamperingDetected?.createEditTimes?.result} />
            </div>
            <div className="flex space-x-2 ">
              <p
                onClick={() => router.push(data.passport["deployUrl"])}
                className="overflow-hidden text-blue-500 underline cursor-pointer whitespace-nowrap text-ellipsis">
                Passport
              </p>

              <TamperStatus status={!data.passport?.tamperingDetected?.createEditTimes?.result} />
            </div>
          </div>
        );

        survey.push([
          <p>{`${data.firstName} ${data.lastName}`}</p>,
          <div>
            <p>{data.email}</p>

            <p className={`${data.email_is_valid ? "text-green-500" : "text-red-500"}`}>
              {data.email_is_valid ? "Valid Email" : "Invalid Email"}
            </p>
          </div>,
          <p
            onClick={() => router.push(data.companySite)}
            className="overflow-hidden text-blue-500 underline cursor-pointer text-ellipsis">
            {data.companySite},
          </p>,
          data.companyEntity,
          (data.location && countryList().getLabel(data.location)) || data.location,
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
          console.log("🚀 ~ file: index.tsx:134 ~ .then ~ res", res);
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

const TamperStatus = ({ status }: { status: boolean }) => {
  return (
    <>
      {status ? (
        <div className="w-5 h-4 text-green-600">
          <svg className="fill-current " viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" />
          </svg>
        </div>
      ) : (
        <div className="w-5 h-4 text-red-600">
          <svg className="fill-current " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
          </svg>
        </div>
      )}
    </>
  );
};

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(SubmitPage);
