import { verifyIdToken } from "next-firebase-auth";
import initAuth from "../../utils/initAuth";
import { database } from "../../config/firebase";
import { collection, addDoc } from "firebase/firestore";

initAuth();

export default async (req: any, res: any) => {
  const databaseRef = collection(database, "surveyData");
  const surveyData = JSON.parse(req.body);
  const token = req.headers.authorization;

  if (token === "unauthenticated") {
    return res
      .status(400)
      .json({ error: "unknown, because you called the API without an ID token" });
  } else {
    const authUser = await verifyIdToken(token);
    if (!authUser.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    try {
      await addDoc(databaseRef, { ...surveyData, submitted_by: authUser.id });
      return res.status(200).json(surveyData);
    } catch (err) {
      return res.status(500).json({ err });
    }
  }
};
