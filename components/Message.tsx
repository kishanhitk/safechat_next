import { Box, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase";
interface MessageProps {
  message: any;
}
function Message({ message }: MessageProps) {
  const [user] = useAuthState(firebase.auth());
  const isByMe = user?.uid === message.sentBy;
  const myColor = useColorModeValue("green.100", "green.900");
  const herColor = useColorModeValue("blue.100", "blue.900");
  return (
    <>
      <Box
        m={5}
        borderBottomRightRadius={isByMe ? 0 : 10}
        borderBottomLeftRadius={!isByMe ? 0 : 10}
        borderTopRadius={10}
        backgroundColor={!isByMe ? myColor : herColor}
        alignSelf={!isByMe ? "flex-start" : "flex-end"}
      >
        <Text py={3} px={5}>
          {message["text"]}
        </Text>
      </Box>
    </>
  );
}

export default Message;
