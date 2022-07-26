import { AuthAction, useAuthUser, withAuthUser } from "next-firebase-auth";
import { useEffect, useState } from "react";
import SimpleTable from "../../components/table";

const SubmitPage = () => {
  const authUser = useAuthUser();

  const [surveyData, setSurveyData] = useState([]);

  useEffect(() => {
    const getSurveyData = async () => {
      const token = await authUser.getIdToken();

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

    getSurveyData()
      .then((res) => {
        res.map((data: any) => {
          return [];
        });
        console.log("🚀 ~ file: index.tsx ~ line 31 ~ getSurveyData ~ res", res);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="container px-4 mx-auto">
      <div className="p-6 py-8 space-y-8">
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
          body={[]}
        />
      </div>
    </div>
  );
};

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(SubmitPage);
