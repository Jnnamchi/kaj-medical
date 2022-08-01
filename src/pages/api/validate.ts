import { verifyIdToken } from "next-firebase-auth";
import initAuth from "../../utils/initAuth";

initAuth();

export default async (req: any, res: any) => {
  if (req.method === "PUT") {
    const token = req.headers.authorization;

    if (token === "unauthenticated") {
      return res.status(400).json({ error: "unknown, because you called the API without an ID token" });
    } else {
      const authUser = await verifyIdToken(token);
      if (!authUser.id) {
        return res.status(403).json({ error: "Not authorized" });
      }

      const { email } = JSON.parse(req.body);

      try {
        return res.status(200).json({ email });
      } catch (err) {
        return res.status(403).json({ error: "Update data failed" });
      }
    }
  }
};
