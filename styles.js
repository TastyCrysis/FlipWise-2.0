import { createGlobalStyle } from "styled-components";

export const theme = {
  dark: {
    background: "#101116",
    text: "#8689AC",
    cardPrimary: "#2f3148",
    cardPrimaryText: "#587099",
    cardSecondary: "#587099",
    cardSecondaryText: "#2f3148",
    indicator: "#8689ac",
    navbar: "#3f5576",
    navbarText: "black",
    navbarButton: "#101116",
    navbarButtonText: "#8689ac",
    boxShadowPrimary: "2px 4px 8px 2px #587099",
    boxShadowSecondary: "2px 4px 8px 2px #3f5576",
  },
  light: {
    background: "#FFFFFF",
    text: "#4E4B66",
    cardPrimary: "#6E7191",
    cardPrimaryText: "#587099",
    cardSecondary: "#4E4B66",
    cardSecondaryText: "#587099",
    indicator: "#3f5576",
    navbar: "#3f5576",
    navbarText: "#587099",
    navbarButton: "#101116",
    navbarButtonText: "#8689ac",
    boxShadowPrimary: "2px 4px 8px 2px #587099",
    boxShadowSecondary: "2px 4px 8px 2px #3f5576",
  },
};

export default createGlobalStyle`
  :root {
    --background: ${({ theme }) => theme.background};
    --text: ${({ theme }) => theme.text};
    --primary: ${({ theme }) => theme.primary};
    --secondary: ${({ theme }) => theme.secondary};
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    background: var(--background);
    margin: 0 0 120px 0;
    font-family: system-ui;
    color: var(--text);
  }
`;
