import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";

const IconLogIn = styled.span`
  color: ${({ theme }) => theme.cardPrimary};
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 50%;
  width: 40px;
  height: 40px;
`;

const IconLogOut = styled.span`
  color: ${({ theme }) => theme.cardPrimary};
  border: 1px solid ${({ theme }) => theme.text};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  & img {
    filter: ${({ theme }) =>
      theme.navbarText === "#a3a8c8"
        ? "invert(0.6) brightness(1) sepia(0.5) hue-rotate(210deg) saturate(1) contrast(1)"
        : "brightness(0)"};
  }
`;

const StyledButton = styled.button`
  height: 20px;
  background-color: ${({ theme }) => theme.cardPrimary};
  color: ${({ theme }) => theme.cardPrimaryText};
  cursor: pointer;
`;

async function handleCreateUser(data) {
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      console.error("Failed to create user");
      return;
    }
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

async function handlePickupUserThemeMode(data) {
  try {
    const response = await fetch("/api/users");
    if (!response.ok) {
      console.error("User not available");
      return;
    }
    const users = await response.json();
    const userData = users.find((user) => user.userId === data.userId);
    const userThemeMode = userData.themeMode;
    return userThemeMode;
  } catch (error) {
    console.error(error);
  }
}

export default function Login({
  handleCheckUserExistence,
  handleToggleThemeMode,
}) {
  const { data: session } = useSession();

  useEffect(() => {
    async function checkUserExistence() {
      if (!session) {
        return;
      }
      const userId = session.user.id;
      const userIsAvailable = await handleCheckUserExistence({ userId });
      if (!userIsAvailable) {
        handleCreateUser({ userId });
      }
      const currentUserThemeMode = await handlePickupUserThemeMode({ userId });
      handleToggleThemeMode(currentUserThemeMode);
    }
    checkUserExistence();
  }, [session]);

  if (session) {
    return (
      <>
        <Link href={`/profile`}>
          <IconLogIn>
            {session.user.image && (
              <img
                src={session.user.image}
                alt="Profilbild"
                width={40}
                height={40}
                style={{ borderRadius: "50%" }}
              />
            )}
          </IconLogIn>
        </Link>
        <StyledButton onClick={() => signOut()}>Sign out</StyledButton>
      </>
    );
  }

  return (
    <>
      <Link href={`/profile`}>
        <IconLogOut>
          <img src="/asset/user.png" alt="login/image" width={40} height={40} />
        </IconLogOut>
        <StyledButton onClick={() => signIn()}>Sign in</StyledButton>
      </Link>
    </>
  );
}
