import React from "react";
import App, { Container } from "next/app";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { theme } from "../styles/global";
import { Provider } from "react-redux";

import { configureStore } from "../redux/store";
const store = configureStore();
/**
 * IMPORT STYLING
 */
import "../public/assets/css/argon.min.css";
import "react-quill/dist/quill.snow.css"; // ES6
import "./styles.css";

/********************** */

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    /**
     * SAMPLE AUTH
     */
    let auth = {
      isAuthenticated: true,
    };
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return {
      pageProps,
      auth,
    };
  }

  componentDidMount() {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
  }

  render() {
    const { Component, pageProps, auth } = this.props;

    return (
      <Provider store={store}>
        {" "}
        <Container>
          <MuiThemeProvider theme={theme}>
            <Component {...pageProps} auth={auth} />
          </MuiThemeProvider>
        </Container>
      </Provider>
    );
  }
}

//withRedux wrapper that passes the store to the App Component
export default MyApp;
