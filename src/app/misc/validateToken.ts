import { db } from "../../../prisma/client";

export default async function validateToken(token: string): Promise<any> {
  const tempUser = await db.user.findUnique({
    where: {
      id: token,
    },
  });

  if (!tempUser)
    return {
      error: "Invalid bearer token.",
    };
  else if (new Date() > new Date(tempUser.expiryDate))
    return {
      error: "Token is already expired.",
    };
  else
    return {
      error: false,
    };
}
