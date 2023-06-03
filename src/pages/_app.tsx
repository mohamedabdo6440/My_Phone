import { NextPage } from "next";
import type { AppProps } from "next/app";
import "nprogress/nprogress.css";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// local modules
import { persistor, store } from "@/rtk/store";
import "@/styles/main.scss";
import "@/styles/main.css";
import { Toaster } from 'react-hot-toast'
import { Router } from "next/router";
import nProgress from "nprogress";



export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  useEffect(() => {
    Router.events.on('routeChangeStart' , (url)=>{
      nProgress.start()
    })
    Router.events.on("routeChangeComplete", (url)=>{
      nProgress.done(false)
    });

  }, [Router])
  
 
  const getLayout = Component.getLayout
    ? (page: ReactElement) => (
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            {Component.getLayout && Component.getLayout(page)}
            <Toaster position="top-right" />
          </PersistGate>
        </Provider>
      )
    : (page: ReactElement) => (
        <Provider store={store}>
          <PersistGate persistor={persistor}>{page}</PersistGate>
          <Toaster position="top-right" />
        </Provider>
      );

  return getLayout(<Component {...pageProps} />);
};

export default MyApp;
