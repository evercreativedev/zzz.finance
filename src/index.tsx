import React from "react";
import ReactDOM from "react-dom";
import ethers from "ethers";
import { Web3ReactProvider } from "@web3-react/core";
import * as serviceWorker from "./serviceWorker";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { persistWithLocalStorage } from "react-query/persist-localstorage-experimental";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: process.env.NODE_ENV === "development" ? 1000 * 30 : 1000 * 60 * 30, // 30 seconds on dev - 30 minutes on prod.
    },
  },
});

// Keep all the data on localstorage
persistWithLocalStorage(queryClient);
function getWeb3Library(provider: any, connector: any) {
  const lib = new ethers.providers.Web3Provider(provider);
  lib.pollingInterval = 12000;
  return lib;
}

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getWeb3Library}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
