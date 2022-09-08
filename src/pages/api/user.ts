import { verifyIdToken } from "next-firebase-auth";
import initAuth from "../../utils/initAuth";
import { database } from "../../config/firebase";
import { collection, doc, updateDoc, getDocs, addDoc } from "firebase/firestore";

initAuth();

export default async (req: any, res: any) => {
  const databaseRef = collection(database, "userData");
  if (req.method === "GET") {
    const token = req.headers.authorization;

    if (token === "unauthenticated") {
      return res.status(400).json({ error: "unknown, because you called the API without an ID token" });
    } else {
      const authUser = await verifyIdToken(token);
      if (!authUser.id) {
        return res.status(403).json({ error: "Not authorized" });
      }

      const userDB = await getDocs(databaseRef);
      const users = userDB.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id
      }));
      const self = users.find((data: any) => data.email === authUser.email);

      return res.status(200).json({ self });
    }
  } else if (req.method === "POST") {
    const { id, email, user_name, user_type } = JSON.parse(req.body);

    const savingData = { id, email, user_name, user_type };
    try {
      await addDoc(databaseRef, savingData);
      return res.status(200).json(savingData);
    } catch (err) {
      return res.status(500).json({ err });
    }
  } else if (req.method === "PUT") {
    const token = req.headers.authorization;

    if (token === "unauthenticated") {
      return res.status(400).json({ error: "unknown, because you called the API without an ID token" });
    } else {
      const authUser = await verifyIdToken(token);
      if (!authUser.id) {
        return res.status(403).json({ error: "Not authorized" });
      }

      const body = JSON.parse(req.body);

      const userDB = await getDocs(databaseRef);
      const users = userDB.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id
      }));

      const self = users.find((data: any) => data.email === authUser.email);

      try {
        if (self) {
          await updateDoc(doc(databaseRef, self.docId), body);
        }
        return res.status(200).json(body);
      } catch (err) {
        return res.status(403).json({ error: "Update data failed" });
      }
    }
  }
};
