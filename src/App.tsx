import { useWeb3React } from "@web3-react/core";
import Footer from "components/Footer/Footer";
import Menu from "components/Menu/Menu";
import { useEagerConnect, useInactiveListener } from "hooks/web3";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Modal from "react-modal";
import { HashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import EthStore from "stores/eth";
import PoolStore from "stores/pools";
import Routes from "./routes";
import "./App.css";
import ScrollToTop from "components/ScrollToTop/ScrollToTop";

Modal.setAppElement("#root");

function App() {
  const { account, library } = useWeb3React();
  // const [isDarkTheme, themePalette, toggleTheme] = useTheme();
  useEffect(() => {
    // Just get all base pool data on page load, this does not require wallet connecting.
    PoolStore.getOngoingPoolData(library);
    // Fetch balances when user changes account or network
    if (account && library) {
      console.log("Initializing all");
      EthStore.changeProvider(account, library);
    }
  }, [account, library]);

  // Try to eagerly get connection to site.
  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager);

  return (
    // <ThemeProvider theme={themePalette as Theme}>
    <HashRouter>
      <ScrollToTop />
      <Menu
      // isDarkTheme={isDarkTheme as boolean}
      // toggleTheme={toggleTheme as () => void}
      />
      <Routes />
      <Footer />
      <ToastContainer />
    </HashRouter>
    // </ThemeProvider>
  );
}

export default observer(App);
