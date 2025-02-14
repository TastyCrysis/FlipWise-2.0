import styled from "styled-components";

const Select = styled.select`
  position: absolute;
  top: 170px;
  right: 50%;
  transform: translateX(50%);
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 10px;
  border-radius: 5px;
`;

export default function ThemeSwitch({ themeMode, onHandleToggleThemeMode }) {
  return (
    <div>
      <Select
        value={themeMode}
        onChange={(event) => onHandleToggleThemeMode(event.target.value)}
      >
        <option value="dark">&#x263E; Dark</option>
        <option value="flower">&#x2698; Flower</option>
        <option value="light">&#x2600; Light</option>
      </Select>
    </div>
  );
}
