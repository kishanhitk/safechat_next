import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase";
interface MessageProps {
  message: any;
}
function Message({ message }: MessageProps) {
  const [user] = useAuthState(firebase.auth());
  const IsByMe = user?.uid === message.sentBy;
  return (
    <>
      <Box
        m={5}
        rounded={5}
        backgroundColor="green.100"
        alignSelf={!IsByMe ? "flex-start" : "flex-end"}
      >
        <Text p={5}> {message["text"]}</Text>
      </Box>
    </>
  );
}

export default Message;
