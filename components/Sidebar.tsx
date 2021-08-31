import {
  Avatar,
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import firebase from "firebase";
import React, { FormEvent, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { AiOutlineLogout } from "react-icons/ai";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Chat from "./Chat";
import router from "next/router";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
export default function Sidebar() {
  const roomRef = firebase.firestore().collection("SafeChatRooms");
  const [user] = useAuthState(firebase.auth());
  const [roomSnapshot] = useCollection(roomRef);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [roomName, setroomName] = useState<string | undefined>();
  const [roomDesc, setroomDesc] = useState<string | undefined>();
  const createNewRoom = async (e: FormEvent) => {
    e.preventDefault();
    await roomRef.add({
      title: roomName,
      description: roomDesc,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      createdBy: user?.uid,
      roomIcon: `https://res.cloudinary.com/dtbudl0yx/image/fetch/w_2000,f_auto,q_auto,c_fit/https://adamtheautomator.com/wp-content/uploads/2019/12/group-1824145_1280-768x768.png`,
    });
    onClose();
  };
  return (
    <Flex direction="column" flex="1" height="100vh">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        position="sticky"
        margin="5px"
      >
        <Avatar m={3} size="sm"></Avatar>
        <Spacer></Spacer>
        <IconButton
          rounded="10px"
          aria-label="new"
          margin="5px"
          onClick={async () => {
            await firebase.auth().signOut();
            document.cookie =
              "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
            router.replace("/");
          }}
          icon={<AiOutlineLogout></AiOutlineLogout>}
        ></IconButton>

        <IconButton
          rounded="10px"
          margin="5px"
          aria-label="more"
          icon={<ColorModeSwitcher />}
        ></IconButton>
      </Flex>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <FaSearch color="gray.300" />
        </InputLeftElement>
        <Input type="text" placeholder="Search" />
      </InputGroup>
      <Button m={5} colorScheme="messenger" onClick={onOpen}>
        New Room
      </Button>
      <Flex direction="column" overflowY="scroll">
        {roomSnapshot &&
          roomSnapshot?.docs.map((room) => (
            <Chat
              key={room.id}
              id={room.id}
              icon={room.data()["roomIcon"]}
              name={room.data()["title"]}
            ></Chat>
          ))}{" "}
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={createNewRoom}>
          <ModalContent>
            <ModalHeader>Create New Room</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Room Name</FormLabel>
                <Input
                  required={true}
                  placeholder="React Geeks"
                  value={roomName}
                  onChange={(e) => setroomName(e.target.value)}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Input
                  required={true}
                  placeholder="React Group for Geeks"
                  value={roomDesc}
                  onChange={(e) => setroomDesc(e.target.value)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Create
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Flex>
  );
}
