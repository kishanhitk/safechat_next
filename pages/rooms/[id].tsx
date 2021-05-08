import { Flex } from "@chakra-ui/react";
import firebase from "firebase";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import React from "react";
import { useEffect } from "react";
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";
import { Message } from "../../interfaces/message";
import { Room } from "../../interfaces/Room";
interface RoomPageProps {
  roomDetails: Room;
  messages: Message[];
}
function RoomPage({ messages, roomDetails }: any) {
  var roomData;
  useEffect(() => {
    const msg = JSON.parse(messages!);
    JSON.parse(roomDetails!);
    roomData = {
      id: msg?.["id"],
      title: msg?.["title"],
      description: msg?.["description"],
      timeStamp: msg?.["timeStamp"],
      createdBy: msg?.["createdBy"],
      roomIcon: msg?.["roomIcon"],
    };
  }, []);
  return (
    <>
      <Flex>
        <Sidebar></Sidebar>
        <ChatScreen
          messages={messages!}
          roomDetails={roomDetails!}
        ></ChatScreen>
        {/* <Chat></Chat> */}
      </Flex>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  var roomData: Room | null = null;
  var messageList: Message[] | null = null;
  if (context.query.id && typeof context.query.id === "string") {
    const messageRef = firebase
      .firestore()
      .collection("SafeChatRooms")
      .doc(context.query.id)
      .collection("messages");
    const roomRef = firebase
      .firestore()
      .collection("SafeChatRooms")
      .doc(context.query.id);
    const messages = await messageRef.get();
    const roomDetails = await roomRef.get();
    console.log(roomDetails.data());
    roomData = {
      id: roomDetails.id,
      title: roomDetails.data()?.["title"],
      description: roomDetails.data()?.["description"],
      timeStamp: roomDetails.data()?.["timeStamp"],
      createdBy: roomDetails.data()?.["createdBy"],
      roomIcon: roomDetails.data()?.["roomIcon"],
    };
    // const msgDatas = messages.docs.map();
    messageList = messages.docs.map((msg) => {
      const data = msg.data();
      var temp: Message = {
        id: msg.id,
        text: data["text"],
        timeStamp: data["timestamp"].toDate().getTime(),
        sentBy: data["sentBy"],
      };
      return temp;
    });

    return {
      props: {
        messages: JSON.stringify({ messages: messageList }),
        roomDetails: JSON.stringify({ room: roomData }),
      },
    };
  } else {
    return {
      props: { messages: messageList!, roomDetails: roomData! },
      redirect: "/",
    };
  }
};

export default RoomPage;
