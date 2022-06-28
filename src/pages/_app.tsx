import React from "react";
import "../styles/globals.css";
import { AppProps } from "next/app";
import { AuthContextProvider } from "../context/AuthContext";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>
  );
}
