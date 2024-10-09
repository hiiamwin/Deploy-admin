"use server";
import { loginSchema } from "@/schemas";
import { actionClient } from "./safe-action";
import { login } from "@/apis";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { encrypt } from "@/helper";

export const loginAction = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput }) => {
    const data = await login(parsedInput.code, parsedInput.password);
    const session = await encrypt(data);
    cookies().set("session", session, { httpOnly: true, secure: false });

    redirect("/dashboard");
  });

export const logoutAction = actionClient.action(async () => {
  // cookies().set("session", "", { httpOnly: true, secure: false });
  cookies().delete("session");
  redirect("/login");
});
