import { ChakraProvider, theme } from "@chakra-ui/react";
import { AuthProvider } from "../firebase/auth";

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
