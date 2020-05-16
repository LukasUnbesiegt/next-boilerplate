import React, { Component } from "react";

export default function (ComposedClass) {
  class AuthenticationCheck extends Component {
    static async getInitialProps(args) {
      const pageProps =
        (await ComposedClass.getInitialProps) &&
        (await ComposedClass.getInitialProps(args));

      return { ...pageProps };
    }
    render() {
      const { isAuthenticated, user } = this.props.auth;

      if (isAuthenticated) {
        return <ComposedClass {...this.props} />;
      } else {
        return <div>You are not authenticated</div>;
      }
    }
  }

  return AuthenticationCheck;
}
