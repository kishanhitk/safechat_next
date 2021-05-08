import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const IndexPage = () => (
  <Flex
    height="100vh"
    alignItems="center"
    direction="column"
    justifyContent="center"
  >
    <Heading>SafeChat</Heading>
    <Text>World's Safest Messenger</Text>
    <Button colorScheme="messenger">
      <Link href="/chat">Start Chatting</Link>
    </Button>
  </Flex>
);

export default IndexPage;
