import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();
  //const providers = await getProviders()

  function handleSignIn() {
    signIn();
    console.log("session_", session);
  }

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
      <button onClick={() => handleSignIn()}>Sign in</button>
    </>
  );
}
