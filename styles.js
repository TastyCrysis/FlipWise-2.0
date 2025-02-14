import { createGlobalStyle } from "styled-components";

export const theme = {
  dark: {
    //Color Palette #4544 from colorpalettes.net
    //#033540 #015366 #63898C #A7D1D2 #E0F4F5
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
    modalBorder: "#8689ac",
  },
  light: {
    //Color Palette #4544 from colorpalettes.net
    //#033540 #015366 #63898C #A7D1D2 #E0F4F5
    background: "#E0F4F5",
    text: "#033540",
    cardPrimary: "#A7D1D2",
    cardPrimaryText: "#015366",
    cardSecondary: "#63898C",
    cardSecondaryText: "#A7D1D2",
    collectionCard: "#A7D1D2",
    collectionCardText: "#015366",
    indicator: "#A7D1D2",
    navbar: "#015366",
    navbarText: "#E0F4F5",
    navbarButton: "#A7D1D2",
    navbarButtonText: "#033540",
    boxShadowPrimary: "2px 4px 8px 2px #015366",
    boxShadowSecondary: "2px 4px 8px 2px #033540",
    boxShadowCollectionCard: "2px 4px 8px 2px #015366",
    buttonBackground: "#033540",
    buttonText: "#E0F4F5",
    modalBackground: "#015366",
    modalText: "#E0F4F5",
    modalBorder: "#E0F4F5",
  },
  flower: {
    //Color Palette #4557 from colorpalettes.net
    //#223C20 #4C8D26 #D5FB00 #DE60CA #882380
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
    modalBorder: "#D5FB00",
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
