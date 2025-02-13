import styled from "styled-components";

const Select = styled.select`
  position: absolute;
  top: 10px;
  right: 20px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 10px;
  border-radius: 5px;
`;

export default function ThemeSwitch({ themeMode, setThemeMode }) {
  return (
    <div>
      <Select
        value={themeMode}
        onChange={(event) => setThemeMode(event.target.value)}
      >
        <option value="dark">Dark</option>
        <option value="flower">Flower</option>
        <option value="light">Light</option>
      </Select>
    </div>
  );
}
