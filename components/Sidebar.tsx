import {
  Button,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
} from "@chakra-ui/react";
import firebase from "firebase";
import React from "react";
import { FaSearch, FaUser } from "react-icons/fa";
import { AiOutlineLogout, AiOutlineMore } from "react-icons/ai";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import Chat from "./Chat";
import router from "next/router";
export default function Sidebar() {
  const roomRef = firebase.firestore().collection("SafeChatRooms");
  const [user] = useAuthState(firebase.auth());
  const [roomSnapshot] = useCollection(roomRef);
  const createNewRoom = () => {
    const name = prompt("Name of Room");
    if (name != null)
      roomRef.add({
        title: name,
        description: "Test Room",
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        createdBy: user?.uid ?? "wgopUpNkOMTu6awwnWgPepNDILx2",
        roomIcon: `https://res.cloudinary.com/dtbudl0yx/image/fetch/w_2000,f_auto,q_auto,c_fit/https://adamtheautomator.com/wp-content/uploads/2019/12/group-1824145_1280-768x768.png`,
      });
  };
  return (
    <Flex direction="column">
      <Flex justifyContent="space-between" position="sticky" margin="5px">
        <FaUser cursor="pointer"></FaUser>
        <Spacer></Spacer>
        <IconButton
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
          margin="5px"
          aria-label="more"
          icon={<AiOutlineMore></AiOutlineMore>}
        ></IconButton>
      </Flex>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<FaSearch color="gray.300" />}
        />
        <Input type="text" placeholder="Search" />
      </InputGroup>
      <Button m={5} colorScheme="messenger" onClick={() => createNewRoom()}>
        New Room
      </Button>
      {roomSnapshot &&
        roomSnapshot?.docs.map((room) => (
          <Chat key={room.id} id={room.id} name={room.data()["title"]}></Chat>
        ))}
    </Flex>
  );
}
