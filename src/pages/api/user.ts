import { verifyIdToken } from 'next-firebase-auth';
import initAuth from '../../utils/initAuth';
import { database } from '../../config/firebase';
import { collection, doc, updateDoc, getDocs, addDoc } from 'firebase/firestore';

initAuth();

export default async (req: any, res: any) => {
  const databaseRef = collection(database, 'userData');
  if (req.method === 'GET') {
    const userDB = await getDocs(databaseRef);
    const response = userDB.docs.map(doc => ({
      ...doc.data(),
      docId: doc.id,
    }));

    return res.status(200).json({ response });
  } else if (req.method === 'POST') {
    const { id, email, user_name } = JSON.parse(req.body);

    const savingData = { id, email, user_name };
    try {
      await addDoc(databaseRef, savingData);
      return res.status(200).json(savingData);
    } catch (err) {
      return res.status(500).json({ err });
    }
  } else if (req.method === 'PUT') {
    const token = req.headers.authorization;

    if (token === 'unauthenticated') {
      return res.status(400).json({ error: 'unknown, because you called the API without an ID token' });
    } else {
      const authUser = await verifyIdToken(token);
      if (!authUser.id) {
        return res.status(403).json({ error: 'Not authorized' });
      }

      const { fullName, entity } = JSON.parse(req.body);

      const userDB = await getDocs(databaseRef);
      const users = userDB.docs.map(doc => ({
        ...doc.data(),
        docId: doc.id,
      }));

      const self = users.find((data: any) => data.id === authUser.id);

      try {
        if (self) {
          await updateDoc(doc(databaseRef, self.docId), {
            user_name: fullName,
            user_type: entity,
          });
        }
        return res.status(200).json({ fullName, entity });
      } catch (err) {
        return res.status(403).json({ error: 'Update data failed' });
      }
    }
  }
};
