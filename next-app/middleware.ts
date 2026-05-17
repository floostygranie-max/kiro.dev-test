/**
 * Middleware — protects /admin routes (except /admin/login)
 * Uses NextAuth withAuth helper.
 */
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/admin/((?!login).*)"],
};
