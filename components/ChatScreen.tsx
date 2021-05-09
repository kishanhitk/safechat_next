import {
  Heading,
  Button,
  Flex,
  Box,
  Spacer,
  IconButton,
  Input,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { Room } from "../interfaces/Room";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Head from "next/head";
import { FaPhone, FaPiedPiper, FaVideo } from "react-icons/fa";
import Message from "./Message";
import { useState } from "react";
import { FormEvent } from "react";

const ChatScreen = ({ roomDetails, messages }: any) => {
  const [user] = useAuthState(firebase.auth());
  const parsed = JSON.parse(roomDetails).room;
  const [textMessage, settextMessage] = useState("");
  const room: Room = {
    id: parsed.id,
    title: parsed.title,
    createdBy: parsed.createdBy,
    description: parsed.description,
    timeStamp: parsed.timeStamp,
    roomIcon: parsed.roomIcon,
  };
  const dummy = useRef<HTMLSpanElement>(null);
  const msgRef = firebase
    .firestore()
    .collection("SafeChatRooms")
    .doc(room.id)
    .collection("messages");
  const [msgsFromDb] = useCollection(msgRef.orderBy("timestamp", "asc"));
  const createTestMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (textMessage.length > 0) {
      await msgRef.add({
        text: textMessage,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        sentBy: user?.uid ?? "a",
      });
      dummy.current?.scrollIntoView({ behavior: "smooth" });
      settextMessage("");
    }
  };
  console.log(msgsFromDb?.docs.map((d) => d.data()));
  const showMessages = () => {
    if (msgsFromDb) {
      return msgsFromDb.docs.map((msgd) => {
        console.log(msgd.data);
        return <Message key={msgd.id} message={msgd.data()}></Message>;
      });
    } else {
      console.log("MESSAGE IS");
      console.log(messages);
      return <Message message={messages}></Message>;
    }
  };
  return (
    <>
      <Head>Chat</Head>
      <Flex direction="column" flex={1} height="100vh">
        <Flex>
          <Box
            width="100%"
            backgroundColor="gray.300"
            position="sticky"
            flex={1}
          >
            <Flex alignItems="center" justifyContent="space-between">
              <Box width="5"> </Box>
              <FaPiedPiper fontSize={30}></FaPiedPiper>
              <Heading marginLeft="5">{room.title}</Heading>
              <Spacer></Spacer>
              <IconButton
                margin={3}
                aria-label="call"
                icon={<FaPhone></FaPhone>}
              ></IconButton>
              <IconButton
                margin={3}
                aria-label="call"
                icon={<FaVideo></FaVideo>}
              ></IconButton>
            </Flex>
          </Box>
        </Flex>

        <Box flex="1" padding="20px" overflowY="scroll">
          <Flex direction="column">
            {showMessages()}
            <span ref={dummy}></span>
          </Flex>
        </Box>
        <form onSubmit={createTestMessage}>
          <Flex margin={5} alignItems="center">
            <Input
              required={true}
              value={textMessage}
              onChange={(e) => settextMessage(e.target.value)}
              placeholder="Type Your Message Here"
            />
            <Button
              m={2}
              type="submit"
              justifySelf="flex-end"
              colorScheme="messenger"
              // onClick={createTestMessage}
            >
              Send
            </Button>
          </Flex>
        </form>
      </Flex>
    </>
  );
};

export default ChatScreen;
