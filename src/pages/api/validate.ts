import { verifyIdToken } from "next-firebase-auth";
import initAuth from "../../utils/initAuth";

initAuth();

export default async (req: any, res: any) => {
  if (req.method === "POST") {
    const token = req.headers.authorization;

    if (token === "unauthenticated") {
      return res.status(400).json({ error: "unknown, because you called the API without an ID token" });
    } else {
      const authUser = await verifyIdToken(token);
      if (!authUser.id) {
        return res.status(403).json({ error: "Not authorized" });
      }

      const { email } = JSON.parse(req.body);

      const result = await fetch(
        `https://emailvalidation.abstractapi.com/v1/?api_key=e91abe0d1c724e7bb1df1ca19762b35f&email=${email}`
      ).then((res) => res.json());
      console.log("🚀 ~ file: validate.ts ~ line 26 ~ result", result);

      try {
        return res.status(200).json({ data: result });
      } catch (err) {
        return res.status(403).json({ error: "Update data failed" });
      }
    }
  }
};
