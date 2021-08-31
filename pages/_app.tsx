import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "../firebase/auth";
import firebaseClient from "../firebase/firebaseClient";
import initAuth from "../utils/initAuth";
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import theme from "../styles/theme";
import dynamic from "next/dynamic";
import "nprogress/nprogress.css";
initAuth();
const TopProgressBar = dynamic(
  () => {
    return import("./../components/TopProgressBar");
  },
  { ssr: false }
);
function MyApp({ Component, pageProps }: any) {
  firebaseClient();
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <TopProgressBar />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
