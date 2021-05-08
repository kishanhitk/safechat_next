import { Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { FaInfoCircle } from "react-icons/fa";

interface IChatProps {
  id: string;
  name: string;
}
function Chat({ id, name }: IChatProps) {
  const router = useRouter();
  const enterChat = () => {
    router.push(`/rooms/${id}`);
  };
  return (
    <Button
      onClick={enterChat}
      backgroundColor="gray.100"
      border="none"
      justifyContent="flex-start"
    >
      <Flex>
        <FaInfoCircle></FaInfoCircle>
        <Text>{name}</Text>
      </Flex>
    </Button>
  );
}

export default Chat;
