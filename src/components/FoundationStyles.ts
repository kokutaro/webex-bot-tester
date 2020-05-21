import 'reset-css/reset.css';

// eslint-disable-next-line import/named
import baseStyled, { createGlobalStyle, ThemedStyledInterface } from 'styled-components';

export const theme = {
  '$color-primary-0': '#314AAE', // Main Primary color */
  '$color-primary-1': '#8492CC',
  '$color-primary-2': '#5165B7',
  '$color-primary-3': '#122EA1',
  '$color-primary-4': '#0B2382',

  '$color-secondary-1-0': '#572FAF', // Main Secondary color (1) */
  '$color-secondary-1-1': '#9A83CD',
  '$color-secondary-1-2': '#7050B7',
  '$color-secondary-1-3': '#3E0FA2',
  '$color-secondary-1-4': '#300A83',

  '$color-secondary-2-0': '#22849F', // Main Secondary color (2) */
  '$color-secondary-2-1': '#77B2C3',
  '$color-secondary-2-2': '#4293A9',
  '$color-secondary-2-3': '#057494',
  '$color-secondary-2-4': '#035E77',
  FOREGROUND: '#333',
  FOREGROUND_REVERSE: '#e9e9e9',
};

export const GlobalStyle = createGlobalStyle`
  html, body {
    font-family: "Segoe UI";
    font-size: 12pt;
    height: 100vh;
    width: 100vw;
    color:${theme.FOREGROUND};
    line-height: unset;
  }
  button {
    border-style: none;
    border-radius: 2px;
    background-color: #ccc;
    cursor: pointer;
    padding: .5em;
    margin: 2px;
    transition-property: all;
    transition-duration: .2s;
    &:hover{
      box-shadow: 1px 3px 3px rgba(200,200,200,4);
    }
    &:active {
      background-color: #eee;
    }
  }
  input[type=text] {
    border-radius: 5px;
    border: 1px solid #ddd;
    padding: .5em;
  }
`;

export type Theme = typeof theme;

export const styled = baseStyled as ThemedStyledInterface<Theme>;
