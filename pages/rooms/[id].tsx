import { Flex } from "@chakra-ui/react";
import { firestore } from "firebase-admin";
import { GetServerSideProps } from "next";
import { AuthAction, getFirebaseAdmin, withAuthUser } from "next-firebase-auth";
import React from "react";
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";
import firebaseClient from "../../firebase/firebaseClient";
import { Message } from "../../interfaces/message";
import { Room } from "../../interfaces/Room";

function RoomPage({ messages, roomDetails }: any) {
  firebaseClient();
  return (
    <>
      <Flex>
        <Sidebar></Sidebar>
        <ChatScreen
          messages={messages!}
          roomDetails={roomDetails!}
        ></ChatScreen>
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  firebaseClient();
  var roomData: Room | null = null;
  var messageList: Message[] | null = null;
  if (context.query.id && typeof context.query.id === "string") {
    const db = getFirebaseAdmin().firestore();
    const messageRef = db
      .collection("SafeChatRooms")
      .doc(context.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc");
    const roomRef = db.collection("SafeChatRooms").doc(context.query.id);
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
    messageList = messages.docs.map((msg: any) => {
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
      props: {},
      redirect: "/",
    };
  }
};

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(RoomPage);
