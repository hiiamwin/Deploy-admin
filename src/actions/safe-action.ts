import MyError, { decrypt } from "@/helper";
import { createSafeActionClient } from "next-safe-action";
import { cookies } from "next/headers";

export const actionClient = createSafeActionClient({
  // Can also be an async function.
  handleServerError(e) {
    if (e instanceof MyError) {
      if (e.statusCode === 400) return e.message;
    }
    throw new Error(e.message);
  },
});

export const authActionClient = actionClient.use(async ({ next }) => {
  const cookie = cookies().get("session")?.value;
  if (!cookie) throw new MyError(401, "access token not found");
  const session = await decrypt(cookie);
  return next({ ctx: { accesstoken: session.accessToken as string } });
});
