import "@/styles/variables.scss";
import type { AppProps } from "next/app";
import { Layout } from "@/components/layouts";
import Provider from "@/context/Provider";
import "@/styles/global.scss";
import "swiper/css";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Provider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}
