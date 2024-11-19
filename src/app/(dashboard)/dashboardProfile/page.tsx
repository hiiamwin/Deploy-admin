import React from "react";

import { ProfileForm } from "./components";
import { cookies } from "next/headers";
import { decrypt } from "@/helper";

async function ChangeDashboardProfile() {
  const cookie = cookies().get("session")?.value;
  if (!cookie) return null;
  const session = await decrypt(cookie);

  return (
    <ProfileForm
      fullName={session.fullName as string}
      phoneNumber={session.phoneNumber as string}
    />
  );
}

export default ChangeDashboardProfile;
