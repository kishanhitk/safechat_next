import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import {
  Text,
  Heading,
  HStack,
  VStack,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Head from "next/head";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { FormEvent } from "react";

function RoomPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const roomRef = firebase.firestore().collection("SafeChatRooms");
  const [user] = useAuthState(firebase.auth());
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
    <div>
      {" "}
      <Head>
        <title>Rooms - SafeChat</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <HStack width="100vw">
        <Sidebar></Sidebar>
        <VStack flex="1">
          <Heading alignSelf="center" justifySelf="center">
            Start Chatting
          </Heading>
          <Text>Join an existing room or create one.</Text>
          <Button onClick={onOpen} variant="solid" colorScheme="messenger">
            Create New Room
          </Button>
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
        </VStack>
      </HStack>
    </div>
  );
}

export const getServerSideProps = withAuthUserTokenSSR()();
export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  authPageURL: "/",
})(RoomPage);
