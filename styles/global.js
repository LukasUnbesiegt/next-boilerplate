import { css } from "styled-components";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
export const setColor = {
  primaryColor: "#af9a7d",
  mainWhite: "#fff",
  mainBlack: "#222",
  mainGrey: "#ececec",
  lightGrey: "#f7f7f7",
};
export const theme = createMuiTheme({
  typography: {
    fontFamily: "Sen",
  },
  palette: {
    primary: {
      main: "#ffbd69",
    },
  },
});
