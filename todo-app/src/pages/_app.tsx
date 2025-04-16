import { AppProps } from "next/app";
import { trpc } from "../utils/trpc";
import { AuthProvider } from "../context/AuthContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default trpc.withTRPC(MyApp);