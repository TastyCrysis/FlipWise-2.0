import styled from "styled-components";
import { useSession } from "next-auth/react";
import handleCheckUserExistence from "@/utils/CheckUserExistence";

const Select = styled.select`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 10px;
  border-radius: 5px;
`;

export default function ThemeSwitch({ themeMode, onHandleToggleThemeMode }) {
  const { data: session } = useSession();
  async function handleThemeSwitch(value) {
    onHandleToggleThemeMode(value);
    if (!session) {
      return;
    }

    const userId = session.user.id;
    let userData = await handleCheckUserExistence({ userId });
    //Id from database objects
    const user_Id = userData._id;
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

      return response.json();
    } catch (error) {
      console.error(error);
      return null;
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
