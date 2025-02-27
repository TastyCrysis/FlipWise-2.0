import { createGlobalStyle } from "styled-components";

export const theme = {
  dark: {
    //Color Palette #4544 from colorpalettes.net
    //#2f3148 #3f5576 #8689ac #587099 #a3a8c8
    background: "#101116",
    text: "#8689AC",
    primary: "#2f3148",
    secondary: "#3f5576",
    cardPrimary: "#2f3148",
    cardPrimaryText: "#587099",
    cardSecondary: "#3f5576",
    cardSecondaryText: "#8689ac",
    collectionCard: "#2f3148",
    collectionCardText: "#587099",
    indicator: "#587099",
    navbar: "#3f5576",
    navbarText: "#a3a8c8",
    navbarButton: "#2f3148",
    navbarButtonText: "#a3a8c8",
    boxShadowPrimary: "2px 4px 8px 2px #587099",
    boxShadowSecondary: "2px 4px 8px 2px #587099",
    boxShadowCollectionCard: "2px 4px 8px 2px #587099",
    boxShadowCollectionCardHover: "2px 4px 8px 2px #3f5576",
    boxShadowButton: "0 0 10px 0 #587099",
    buttonBackground: "#2f3148",
    buttonText: "#a3a8c8",
    buttonBorder: "#587099",
    modalBackground: "#3f5576",
    modalText: "#a3a8c8",
    modalBorder: "#8689ac",
    right: "#388E3C",
    wrong: "#D32F2F",
    warning: "#FFA000",
    cardBackground: "#3f5576",
    textSecondary: "#a3a8c8",
    tooltipBackground: "#2f3148",
    tooltipText: "#8689AC",
    tooltipBorder: "#8689ac",
  },
  light: {
    //Color Palette #4544 from colorpalettes.net
    //#033540 #015366 #63898C #A7D1D2 #E0F4F5
    background: "#E0F4F5",
    text: "#033540",
    primary: "#63898C",
    secondary: "#A7D1D2",
    cardPrimary: "#A7D1D2",
    cardPrimaryText: "#015366",
    cardSecondary: "#63898C",
    cardSecondaryText: "#A7D1D2",
    collectionCard: "#A7D1D2",
    collectionCardText: "#015366",
    indicator: "#A7D1D2",
    navbar: "#63898C",
    navbarText: "black",
    navbarButton: "#A7D1D2",
    navbarButtonText: "#033540",
    boxShadowPrimary: "2px 4px 8px 2px #015366",
    boxShadowSecondary: "2px 4px 8px 2px #033540",
    boxShadowCollectionCard: "2px 4px 8px 2px #015366",
    boxShadowCollectionCardHover: "2px 4px 8px 2px #033540",
    boxShadowButton: "0 0 10px 0 #E0F4F5",
    buttonBackground: "#033540",
    buttonText: "#E0F4F5",
    buttonBorder: "#E0F4F5",
    modalBackground: "#015366",
    modalText: "#E0F4F5",
    modalBorder: "#E0F4F5",
    right: "#388E3C",
    wrong: "#D32F2F",
    warning: "#FFA000",
    cardBackground: "#015366",
    textSecondary: "#E0F4F5",
    tooltipBackground: "#E0F4F5",
    tooltipText: "#015366",
    tooltipBorder: "#015366",
  },
  flower: {
    //Color Palette #4557 from colorpalettes.net
    //#223C20 #4C8D26 #D5FB00 #DE60CA #882380
    background: "#e0e0e0",
    text: "#223C20",
    primary: "#4C8D26",
    secondary: "#DE60CA",
    cardPrimary: "#4C8D26",
    cardPrimaryText: "#D5FB00",
    cardSecondary: "#882380",
    cardSecondaryText: "#D5FB00",
    collectionCard: "#4C8D26",
    collectionCardText: "#D5FB00",
    indicator: "#D5FB00",
    navbar: "#DE60CA",
    navbarText: "black",
    navbarButton: "#4C8D26",
    navbarButtonText: "#e0e0e0",
    boxShadowPrimary: "2px 4px 8px 2px #223C20",
    boxShadowSecondary: "2px 4px 8px 2px #DE60CA",
    boxShadowCollectionCard: "2px 4px 8px 2px #223C20",
    boxShadowCollectionCardHover: "2px 4px 8px 2px #4C8D26",
    boxShadowButton: "0 0 10px 0 #D5FB00",
    buttonBackground: "#223C20",
    buttonText: "white",
    buttonBorder: "#D5FB00",
    modalBackground: "#882380",
    modalText: "#e0e0e0",
    modalBorder: "#D5FB00",
    right: "#388E3C",
    wrong: "#D32F2F",
    warning: "#FFA000",
    cardBackground: "#882380",
    textSecondary: "#e0e0e0",
    tooltipBackground: "#223C20",
    tooltipText: "#e0e0e0",
    tooltipBorder: "#D5FB00",
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
