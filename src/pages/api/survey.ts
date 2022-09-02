import { verifyIdToken } from "next-firebase-auth";
import initAuth from "../../utils/initAuth";
import { database } from "../../config/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

initAuth();

export default async (req: any, res: any) => {
  const databaseRef = collection(database, "surveyData");

  const token = req.headers.authorization;

  if (token === "unauthenticated") {
    return res.status(400).json({ error: "unknown, because you called the API without an ID token" });
  } else {
    const authUser = await verifyIdToken(token);
    if (!authUser.id) {
      return res.status(403).json({ error: "Not authorized" });
    }

    if (req.method === "POST") {
      try {
        const surveyData = JSON.parse(req.body);

        await addDoc(databaseRef, { ...surveyData, submitted_by: authUser.id });
        return res.status(200).json(surveyData);
      } catch (err) {
        return res.status(500).json({ err });
      }
    } else if (req.method === "GET") {
      try {
        const surveyDB = await getDocs(databaseRef);
        const surveyData = surveyDB.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id
        }));

        return res.status(200).json(surveyData);
      } catch (err) {
        return res.status(500).json({ err });
      }
    }
  }
};
