import firebase from "firebase";
export type Message = {
  id: string;
  text: string;
  timeStamp: firebase.firestore.Timestamp;
  sentBy: string;
};
