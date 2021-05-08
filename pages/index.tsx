import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import Head from "next/dist/next-server/lib/head";
import Link from "next/link";
import React from "react";

const IndexPage = () => (
  <>
    <Head>
      <title>SafeChat</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Flex
      height="100vh"
      alignItems="center"
      direction="column"
      justifyContent="center"
    >
      <Heading>SafeChat</Heading>
      <Text>World's Safest Messenger</Text>
      <Button colorScheme="messenger">
        <Link href="/rooms">Start Chatting</Link>
      </Button>
    </Flex>
  </>
);

export default IndexPage;
