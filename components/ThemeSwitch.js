import styled from "styled-components";
import { useSession } from "next-auth/react";
import handleCheckUserExistence from "@/utils/CheckUserExistence";
import useSWR from "swr";

const Select = styled.select`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 10px;
  border-radius: 5px;
`;

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function ThemeSwitch({ themeMode, onHandleToggleThemeMode }) {
  const {
    data: users,
    isLoading: usersLoading,
    error: usersError,
    mutate: usersMutate,
  } = useSWR("/api/users", fetcher);

  const { data: session } = useSession();
  async function handleThemeSwitch(value) {
    onHandleToggleThemeMode(value);
    if (session) {
      const userId = session.user.id;
      console.log("userId_", userId);
      let userData = await handleCheckUserExistence({ userId });
      const user_Id = userData._id;
      console.log("user_Id_", user_Id);
      console.log("value_", value);
      try {
        const response = await fetch(`/api/users/${user_Id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ themeMode: value }),
        });
        if (!response.ok) {
          console.error("Failed to save user data");
          return null;
        }
        usersMutate();
        return response.json();
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  }

  return (
    <>
      <label htmlFor="theme-select"></label>
      <Select
        id="theme-select"
        value={themeMode}
        onChange={(event) => handleThemeSwitch(event.target.value)}
      >
        <option value="dark">&#x263E; Dark</option>
        <option value="flower">&#x2698; Flower</option>
        <option value="light">&#x2600; Light</option>
      </Select>
    </>
  );
}
