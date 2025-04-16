import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import type { AppRouter } from "../server/routers";

function getBaseUrl() {
  if (typeof window !== "undefined") {
    return "";
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          headers() {
            if (typeof window !== "undefined") {
              const token = localStorage.getItem("token");
              if (token) {
                return {
                  Authorization: `Bearer ${token}`,
                };
              }
            }
            return {};
          },
        }),
      ],
    };
  },
  ssr: false,
});