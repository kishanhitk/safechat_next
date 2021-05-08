import { GetServerSideProps } from "next";
import Sidebar from "../components/Sidebar";
import nookies from "nookies";
import { verifyIdToken } from "../firebase/firebaseAdmin";

function rooms() {
  return (
    <div>
      <Sidebar></Sidebar>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const { uid, email } = token;
    return {
      props: { session: `Your email is ${email} and your UID is ${uid}.` },
    };
  } catch (err) {
    context.res.writeHead(302, { Location: "/login" });
    context.res.end();
    return { props: {} };
  }
};
export default rooms;
