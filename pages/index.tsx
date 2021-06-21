import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import firebase from "firebase";
import { withAuthUser, AuthAction } from "next-firebase-auth";
import Head from "next/dist/next-server/lib/head";
import React, { useState } from "react";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";

const IndexPage = () => {
  const toast = useToast();
  const [email, setemail] = useState("user@test.com");
  const [pass, setpass] = useState("123456");
  const [isLoading, setLoading] = useState(false);
  const formBackground = useColorModeValue("gray.100", "gray.700");
  return (
    <Box backgroundColor="#4337c621">
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Head>
          <title>SafeChat</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>

        <VStack
          direction="column"
          background={formBackground}
          p={12}
          rounded={10}
          width="400px"
          maxWidth="90%"
          spacing={5}
        >
          <ColorModeSwitcher justifySelf="flex-start" />
          <Heading mb={4} textAlign="center">
            SafeChat
          </Heading>
          <Text textAlign="center" mb={3}>
            World&apos;s Safest Messenger
          </Text>{" "}
          <Input
            value={email}
            onChange={(e) => setemail(e.target.value)}
            variant="outline"
            type="email"
            placeholder="user@example.com"
            mb={3}
          ></Input>
          <Input
            value={pass}
            onChange={(e) => setpass(e.target.value)}
            mb={3}
            variant="outline"
            type="password"
            placeholder="******"
          ></Input>
          <Button
            isLoading={isLoading}
            width="100%"
            variant="solid"
            colorScheme="messenger"
            loadingText="Loading"
            spinnerPlacement="start"
            isDisabled={email === "" || pass === ""}
            onClick={async () => {
              setLoading(true);
              await firebase
                .auth()
                .signInWithEmailAndPassword(email, pass)
                .then(function (firebaseUser) {
                  console.log(firebaseUser.user);
                })
                .catch(function (error) {
                  const message = error.message;
                  toast({
                    title: "An error occurred.",
                    description: message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                  });
                });
              setLoading(false);
            }}
          >
            Log in
          </Button>
          <Button
            mt="10px"
            width="100%"
            variant="solid"
            colorScheme="gray"
            onClick={() => {
              var provider = new firebase.auth.GithubAuthProvider();
              firebase
                .auth()
                .signInWithPopup(provider)
                .then(function (firebaseUser) {
                  console.log(firebaseUser.user);
                })
                .catch(function (error) {
                  const message = error.message;
                  toast({
                    title: "An error occurred.",
                    description: message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                  });
                });
            }}
          >
            Login with GitHub
          </Button>
        </VStack>
      </Flex>
    </Box>
  );
};
const MyLoader = () => <div>Loading...</div>;
export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  LoaderComponent: MyLoader,
})(IndexPage);
