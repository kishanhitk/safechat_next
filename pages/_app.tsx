import { ChakraProvider, theme } from "@chakra-ui/react";
import { AuthProvider } from "../firebase/auth";
import firebaseClient from "../firebase/firebaseClient";
import initAuth from "../utils/initAuth";
initAuth();
function MyApp({ Component, pageProps }: any) {
  firebaseClient();
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
