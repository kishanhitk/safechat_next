import firebase from "firebase";
export type Room = {
  id: string;
  title: string;
  description: string;
  timeStamp: firebase.firestore.Timestamp;
  createdBy: string;
  roomIcon: string;
};
