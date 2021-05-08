import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { verifyIdToken } from "../firebase/firebaseAdmin";
import nookies from "nookies";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import firebase from "firebase";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import { GetServerSideProps } from "next";
const Chat = () => {
  const dummy = useRef<HTMLSpanElement>(null);
  const [chatText, setchatText] = useState("");
  const messagesRef = firebase.firestore().collection("safechatmessages");
  const query = messagesRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });
  const [user] = useAuthState(firebase.auth());
  useEffect(() => {}, []);
  return (
    <>
      <ColorModeSwitcher justifySelf="flex-end" textAlign="end" />
      <Flex direction="column" height="100vh">
        <Flex justifyContent="space-between" p={5}>
          <Heading>Safe Chat</Heading>
          <Button
            onClick={async () => {
              await firebase.auth().signOut();
            }}
          >
            Logout
          </Button>
        </Flex>
        <Box
          rounded={3}
          backgroundColor="black.300"
          height="100vh"
          width="100%"
          p={3}
          m={2}
          marginBottom={10}
          overflowY="scroll"
        >
          <Flex direction="column">
            {messages &&
              messages.map((msg) => (
                <Box
                  p={2}
                  m={3}
                  rounded={19}
                  maxWidth="30%"
                  key={msg.id}
                  backgroundColor="green"
                  alignSelf={
                    user?.uid === msg.createdBy ? "flex-end" : "flex-start"
                  }
                >
                  <Text
                    paddingX={2}
                    textAlign={user?.uid === msg.createdBy ? "right" : "left"}
                  >
                    {" "}
                    {msg.text}
                  </Text>
                </Box>
              ))}
          </Flex>
          <span ref={dummy}></span>
        </Box>
        <Flex
          width="80%"
          align="end"
          direction="row"
          justifyContent="space-evenly"
          bottom="0"
          position="fixed"
          alignContent="space-evenly"
        >
          <Input
            autoFocus={true}
            placeholder="Write your message"
            value={chatText}
            onChange={(e) => setchatText(e.target.value)}
          ></Input>
          <IconButton
            onClick={async () => {
              await firebase.firestore().collection("safechatmessages").add({
                text: chatText,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                createdBy: firebase.auth().currentUser?.uid,
              });
              setchatText("");

              dummy.current?.scrollIntoView({ behavior: "smooth" });
            }}
            aria-label="Send"
            icon={<FaArrowAltCircleRight />}
          ></IconButton>
        </Flex>
      </Flex>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const { uid, email } = token;
    return {
      props: { session: `Your email is ${email} and your UID is ${uid}.` },
    };
  } catch (err) {
    context.res.writeHead(302, { Location: "/login" });
    context.res.end();
    return { props: {} };
  }
};
export default Chat;
