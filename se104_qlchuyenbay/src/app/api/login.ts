import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { email, password } = schema.parse(req.body);

      const isAuthenticated = true;

      if (isAuthenticated) {
        res.status(200).json({ success: true, message: "Sign-in successful" });
      } else {
        res
          .status(401)
          .json({ success: false, error: "Authentication failed" });
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      res
        .status(400)
        .json({ success: false, error: "Invalid email or password" });
    }
  } else {
    res.status(405).json({ success: false, error: "Method Not Allowed" });
  }
}
