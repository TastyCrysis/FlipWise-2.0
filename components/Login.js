import { useSession, signIn, signOut } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();
  //const providers = await getProviders()

  function handleSignIn() {
    console.log("session_");
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
      <button
        onClick={async () => {
          await signIn();
          handleSignIn();
        }}
      >
        Sign in
      </button>
    </>
  );
}
