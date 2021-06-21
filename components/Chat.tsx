import { Avatar, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";

interface IChatProps {
  id: string;
  name: string;
  icon: string;
}
function Chat({ id, name, icon }: IChatProps) {
  return (
    <Button
      m={1}
      as="a"
      href={`/rooms/${id}`}
      colorScheme="gray"
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
