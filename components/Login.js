import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import styled from "styled-components";

const Icon = styled.span`
  position: relative;
  display: block;
  line-height: 75px;
  font-size: 1.5em;
  text-align: center;
  transition: 0.5s;
  color: ${({ theme }) => theme.navbarText};

  & img {
    filter: ${({ theme }) =>
      theme.navbarText === "#a3a8c8"
        ? "invert(0.6) brightness(1) sepia(0.5) hue-rotate(210deg) saturate(1) contrast(1)"
        : "brightness(0)"};
  }
`;

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
        <Icon>
          {session.user.image && (
            <img
              src={session.user.image}
              alt="Profilbild"
              width={40}
              height={40}
              style={{ borderRadius: "50%" }}
            />
          )}
        </Icon>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <>
      <Icon>
        <img
          src="/asset/user.png"
          alt="login/image"
          width={40}
          height={40}
          style={{ borderRadius: "50%" }}
        />
      </Icon>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
