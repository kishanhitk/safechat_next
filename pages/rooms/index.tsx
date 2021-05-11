import Sidebar from "../../components/Sidebar";
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";

function rooms() {
  return (
    <div>
      <Sidebar></Sidebar>
    </div>
  );
}
// export const getServerSideProps: GetServerSideProps = async (context: any) => {
//   try {
//     const cookies = nookies.get(context);
//     const token = await verifyIdToken(cookies.token);
//     const { uid, email } = token;
//     return {
//       props: { session: `Your email is ${email} and your UID is ${uid}.` },
//     };
//   } catch (err) {
//     context.res.writeHead(302, { Location: "/login" });
//     context.res.end();
//     return { props: {} };
//   }
// };
// export default rooms;
export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  authPageURL: "/login",
})(rooms);
