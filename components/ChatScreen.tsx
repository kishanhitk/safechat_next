import { Center } from "@chakra-ui/react";
import { useEffect } from "react";
import { Message } from "../interfaces/message";
import { Room } from "../interfaces/Room";

interface ChatScreenProps {
  roomDetails: Room;
  messages: Message[];
}
const ChatScreen = ({ roomDetails, messages }: ChatScreenProps) => {
  return (
    <>
      <Center>Hello</Center>
      <Center>{roomDetails}</Center>
      <h1> {roomDetails.id}</h1>
    </>
  );
};

export default ChatScreen;
