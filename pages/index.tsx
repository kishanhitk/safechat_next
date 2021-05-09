import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import Head from "next/dist/next-server/lib/head";
import Link from "next/link";
import React from "react";

const IndexPage = () => (
  <>
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Head>
        <title>SafeChat</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Flex
        background="gray.200"
        rounded="20"
        alignItems="center"
        direction="column"
        justifyContent="center"
      >
        <Heading m={10} fontFamily="Lato">
          SafeChat
        </Heading>
        <Text m={3}>World's Safest Messenger</Text>
        <Button m={10} colorScheme="messenger">
          <Link href="/rooms">Start Chatting</Link>
        </Button>
      </Flex>
    </Flex>
  </>
);

export default IndexPage;
