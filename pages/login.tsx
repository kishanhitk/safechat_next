import {
  Button,
  Flex,
  Heading,
  Input,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import firebase from "firebase";
import React, { useState } from "react";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";

const LoginPage = () => {
  const toast = useToast();
  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");
  const [isLoading, setLoading] = useState(false);
  const formBackground = useColorModeValue("gray.100", "gray.700");
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background={formBackground} p={12} rounded={6}>
        <Flex direction="row" justifyContent="space-between">
          <Heading mb={6}>Login</Heading>
          <ColorModeSwitcher justifySelf="flex-end" />
        </Flex>
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
                window.location.href = "/";
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
                window.location.href = "/";
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
  );
};

export default LoginPage;
