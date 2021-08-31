import { Avatar, Button, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

interface IChatProps {
  id: string;
  name: string;
  icon: string;
}
function Chat({ id, name, icon }: IChatProps) {
  console.log(icon);
  return (
    <Link href={`/rooms/${id}`} passHref>
      <Button
        m={1}
        colorScheme="gray"
        border="none"
        justifyContent="flex-start"
      >
        <Flex alignItems="center">
          <Avatar size="xs" name={name}></Avatar>
          <Text m={3}>{name}</Text>
        </Flex>
      </Button>
    </Link>
  );
}

export default Chat;
