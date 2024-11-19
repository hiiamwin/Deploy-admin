"use server";
import { loginSchema } from "@/schemas";
import { actionClient, authActionClient } from "./safe-action";
import { changePassword, changeProfile, login } from "@/apis";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { decrypt, encrypt } from "@/helper";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { loginType } from "@/types";

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

export const changeProfileAction = authActionClient
  .schema(
    z.object({
      fullName: z.string(),
      phoneNumber: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const message = await changeProfile(
      parsedInput.fullName,
      parsedInput.phoneNumber,
      accesstoken
    );

    const cookie = cookies().get("session")?.value;
    const data = await decrypt(cookie as string);
    const newData = {
      ...data,
      fullName: parsedInput.fullName,
      phoneNumber: parsedInput.phoneNumber,
    };
    const newSession = await encrypt(newData as loginType);
    cookies().set("session", newSession, { httpOnly: true, secure: false });

    revalidatePath("/dashboardProfile");
    return message;
  });

export const changePasswordAction = authActionClient
  .schema(
    z.object({
      oldPassword: z.string(),
      newPassword: z.string(),
      confirmPassword: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx: { accesstoken } }) => {
    const message = await changePassword(
      parsedInput.oldPassword,
      parsedInput.newPassword,
      parsedInput.confirmPassword,
      accesstoken
    );
    revalidatePath("/dashboardProfile");
    return message;
  });
