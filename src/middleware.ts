import { checkIsAuth } from "@/domain/utils/auth.utils";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { decrypt } from "./data/constantStore";

export async function middleware(request: NextRequest, ev: NextFetchEvent) {
  const url = request.nextUrl.pathname;
  if (url.startsWith("/blog") || url === "/") {
    return null;
  }
  const isLogin = checkIsAuth(
    decrypt(request.cookies.get("token")?.value || "")
  );
  if (url.startsWith("/user") && isLogin) {
    return NextResponse.redirect(new URL("/org/home", request.url));
  } else if (url.startsWith("/org") && !isLogin) {
    return NextResponse.redirect(new URL("/user/login", request.url));
  }

  return null;
}
