import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";

export default function Login({ handleCreateUser, handleCheckUserExistence }) {
  const { data: session } = useSession();

  useEffect(() => {
    async function checkUserExistence() {
      if (session) {
        const userId = session.user.id;
        let userIsAvailable = (await handleCheckUserExistence({ userId }))
          ? true
          : false;
        if (!userIsAvailable) {
          const userId = session.user.id;
          handleCreateUser({ userId });
        }
      }
    }
    checkUserExistence();
  }, [session]);

  if (session) {
    return (
      <>
        Signed in <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <>
      Not signed in <br />
      <button
        onClick={() => {
          signIn();
        }}
      >
        Sign in
      </button>
    </>
  );
}
