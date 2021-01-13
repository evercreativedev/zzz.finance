import { useWeb3React } from "@web3-react/core";
import React, { useEffect } from "react";
import metamaskicon from "assets/metamask_icon.svg";
import phone from "assets/phone.png";
import { injected, walletconnect } from "eth/connectors";
import { WalletUnlockButton, WalletUnlockContainer } from "./WalletUnlock.styles";

enum ConnectorNames {
  Injected = "Injected",
  WalletConnect = "WalletConnect",
}

const connectorsByName: any = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
};

const connectorUi: any = {
  Injected: {
    title: "Browser wallet",
    icon: metamaskicon,
  },
  WalletConnect: {
    title: "Mobile wallet",
    icon: phone,
  },
};

function WalletUnlock() {
  const { connector, activate, active } = useWeb3React();

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState<any>();

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  if (!active) {
    return (
      <WalletUnlockContainer>
        {Object.keys(connectorsByName).map((name: any) => {
          const currentConnector = connectorsByName[name];

          return (
            <WalletUnlockButton
              onClick={() => {
                setActivatingConnector(currentConnector);
                activate(connectorsByName[name]);
              }}
              key={name}
            >
              <div className="connector">
                <div className="connector-title">{connectorUi[name].title}</div>
                <img className="connector-icon" src={connectorUi[name].icon} width="30" aria-label="wallet-unlock" alt="wallet-unlock" />
              </div>
            </WalletUnlockButton>
          );
        })}
      </WalletUnlockContainer>
    );
  } else {
    return null;
  }
}

export default WalletUnlock;
