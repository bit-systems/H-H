"use client";

import "@/styles/variables.scss";
import { Layout } from "@/components/layouts";
import Provider from "@/context/Provider";
import "@/styles/global.scss";
import "@/styles/globals.css";
import "swiper/css";
import { useEffect } from "react";

export default function RootLayout({ children }) {
  useEffect(() => {
    window.addEventListener("error", (e) => {
      if (e.message.includes("hydration")) {
        console.warn("Hydration Error:", e);
      }
    });
  }, []);
  //   return (
  //     <>
  //       <Head>
  //         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  //       </Head>
  //       <Provider>
  //         <Layout>
  //           <Component {...pageProps} />
  //         </Layout>
  //       </Provider>
  //     </>
  //   );
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Your App</title>
      </head>
      <body>
        <Provider>
          <Layout>{children}</Layout>
        </Provider>
      </body>
    </html>
  );
}
