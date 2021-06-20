import {
  Button,
  Flex,
  Heading,
  Input,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import firebase from "firebase";
import { withAuthUser, AuthAction } from "next-firebase-auth";
import Head from "next/dist/next-server/lib/head";
import React, { useState } from "react";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";

const IndexPage = () => {
  const toast = useToast();
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [isLoading, setLoading] = useState(false);
  const formBackground = useColorModeValue("gray.100", "gray.700");
  return (
    <>
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Head>
          <title>SafeChat</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>

        <Flex direction="column" background={formBackground} p={12} rounded={6}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <Heading mb={4} textAlign="center">
            SafeChat
          </Heading>
          <Text textAlign="center" mb={3}>
            World's Safest Messenger
          </Text>{" "}
          <Input
            value={email}
            onChange={(e) => setemail(e.target.value)}
            variant="filled"
            type="email"
            placeholder="user@example.com"
            mb={3}
          ></Input>
          <Input
            value={pass}
            onChange={(e) => setpass(e.target.value)}
            mb={3}
            variant="filled"
            type="password"
            placeholder="******"
          ></Input>
          <Button
            mb={3}
            isLoading={isLoading}
            minWidth="40%"
            variant="solid"
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
                  // router.push("/rooms");

                  // window.location.href = "/";
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
            variant="solid"
            colorScheme="messenger"
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
        </Flex>
      </Flex>
    </>
  );
};
const MyLoader = () => <div>Loading...</div>;
export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  LoaderComponent: MyLoader,
})(IndexPage);
