import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./helper/sessionManagement";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/login", "/forgotPassword"];
const adminRoutes = [
  "/restaurant",
  "/manager",
  "/adminDish",
  "/dishCategory",
  "/ingredientGeneral",
  "/ingredientType",
];
const managerRoutes = [
  "/table",
  "/customer",
  "/managerDish",
  "/refundDish",
  "/combo",
  "/ingredient",
  "/staff",
  "/staffSchedule",
  "/order",
];
export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isprotectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);
  const cookie = cookies().get("session")?.value;

  if (isprotectedRoute && !cookie) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && cookie) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  const session = cookie ? await decrypt(cookie) : null;
  const role = session?.role;
  const isAdminRoute = adminRoutes.includes(path);
  const isManagerRoute = managerRoutes.includes(path);
  if (role) {
    if (role === "Administrator" && isManagerRoute) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
    if (role === "Manager" && isAdminRoute) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
  }
  return NextResponse.next();
}
