import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    background: #fff;
    margin: 0 0 120px 0;
    font-family: system-ui;
  }
`;
