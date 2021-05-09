import { Avatar, Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { FaInfoCircle } from "react-icons/fa";

interface IChatProps {
  id: string;
  name: string;
  icon: string;
}
function Chat({ id, name, icon }: IChatProps) {
  const router = useRouter();
  const enterChat = () => {
    router.push(`/rooms/${id}`);
  };
  return (
    <Button
      m={1}
      onClick={enterChat}
      backgroundColor="gray.100"
      border="none"
      justifyContent="flex-start"
    >
      <Flex alignItems="center">
        <Avatar size="xs" name={name} src={icon}></Avatar>
        <Text m={3}>{name}</Text>
      </Flex>
    </Button>
  );
}

export default Chat;
