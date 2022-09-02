import React from "react";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { AuthContextProvider } from "../context/AuthContext";
import ProtectedRoute from "../components/authPage/ProtectedRoute";
import "../styles/globals.css";
import "../styles/styles.css";

import initAuth from "../utils/initAuth";

initAuth();

export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean;
};
export default function App(props: AppProps) {
  const { Component, pageProps }: { Component: NextApplicationPage; pageProps: any } = props;

  return (
    <AuthContextProvider>
      {Component.requireAuth ? (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      ) : (
        <Component {...pageProps} />
      )}
    </AuthContextProvider>
  );
}
