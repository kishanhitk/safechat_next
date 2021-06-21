import React from "react";
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

function RoomPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
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
            <ModalContent>
              <ModalHeader>Create New Room</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Room Name</FormLabel>
                  <Input placeholder="First name" />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Description</FormLabel>
                  <Input placeholder="Last name" />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3}>
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
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
