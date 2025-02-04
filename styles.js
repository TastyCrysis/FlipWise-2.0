import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    background: #f9f9f9;
    margin: 0;
    font-family: system-ui;
  }
`;
