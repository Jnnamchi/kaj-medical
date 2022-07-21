import { verifyIdToken } from 'next-firebase-auth';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import initAuth from '../../utils/initAuth';
import { database } from '../../config/firebase';

initAuth();

export default async (req: any, res: any) => {
  const databaseRef = collection(database, 'User Data');
  if (req.method === 'GET') {
    if (!(req.headers && req.headers.authorization)) {
      return res.status(400).json({ error: 'Missing Authorization header value' });
    }
    const token = req.headers.authorization;

    let response: any;

    if (token === 'unauthenticated') {
      response = 'unknown, because you called the API without an ID token';
    } else {
      try {
        await verifyIdToken(token);
      } catch (e) {
        return res.status(403).json({ error: 'Not authorized' });
      }
    }

    const userDB = await getDocs(databaseRef);

    response = userDB.docs.map(doc => ({
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
  }
};
