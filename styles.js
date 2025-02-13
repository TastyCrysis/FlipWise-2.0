import { createGlobalStyle } from "styled-components";

export const theme = {
  dark: {
    background: "#101116",
    text: "#8689AC",
    cardPrimary: "#2f3148",
    cardPrimaryText: "#587099",
    cardSecondary: "#587099",
    cardSecondaryText: "#2f3148",
    collectionCard: "#2f3148",
    collectionCardText: "#587099",
    indicator: "#8689ac",
    navbar: "#3f5576",
    navbarText: "black",
    navbarButton: "#101116",
    navbarButtonText: "#8689ac",
    boxShadowPrimary: "2px 4px 8px 2px #587099",
    boxShadowSecondary: "2px 4px 8px 2px #3f5576",
    boxShadowCollectionCard: "2px 4px 8px 2px #587099",
    buttonBackground: "#101116",
    buttonText: "white",
    modalBackground: "#3f5576",
    modalText: "#101116",
  },
  light: {
    background: "#FFFFFF",
    text: "#4E4B66",
    cardPrimary: "#6E7191",
    cardPrimaryText: "#587099",
    cardSecondary: "#4E4B66",
    cardSecondaryText: "#587099",
    collectionCard: "#6E7191",
    collectionCardText: "#587099",
    indicator: "#3f5576",
    navbar: "#3f5576",
    navbarText: "#587099",
    navbarButton: "#101116",
    navbarButtonText: "#8689ac",
    boxShadowPrimary: "2px 4px 8px 2px #587099",
    boxShadowSecondary: "2px 4px 8px 2px #3f5576",
    boxShadowCollectionCard: "2px 4px 8px 2px #587099",
    buttonBackground: "#3f5576",
    buttonText: "white",
    modalBackground: "#3f5576",
    modalText: "#101116",
  },
  flower: {
    background: "#e0e0e0",
    text: "#223C20",
    cardPrimary: "#4C8D26",
    cardPrimaryText: "#D5FB00",
    cardSecondary: "#882380",
    cardSecondaryText: "#D5FB00",
    collectionCard: "#4C8D26",
    collectionCardText: "#D5FB00",
    indicator: "#D5FB00",
    navbar: "#882380",
    navbarText: "#e0e0e0",
    navbarButton: "#4C8D26",
    navbarButtonText: "#e0e0e0",
    boxShadowPrimary: "2px 4px 8px 2px #223C20",
    boxShadowSecondary: "2px 4px 8px 2px #DE60CA",
    boxShadowCollectionCard: "2px 4px 8px 2px #223C20",
    buttonBackground: "#223C20",
    buttonText: "white",
    modalBackground: "#882380",
    modalText: "#e0e0e0",
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
