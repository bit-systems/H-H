import "@/styles/globals.css";
import "@/styles/variables.scss";
import type { AppProps } from "next/app";
import { Layout } from "@/components/layouts";
import Provider from "@/context/Provider";
import { BrowserRouter } from "react-router-dom";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider>
        <BrowserRouter>
          <Layout />
          <Component {...pageProps} />
        </BrowserRouter>
      </Provider>
    </>
  );
}
