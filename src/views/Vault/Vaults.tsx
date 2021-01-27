import React, { useEffect } from "react";
import Layout from "components/Layout/Layout";
import { useWeb3React } from "@web3-react/core";
import Connectors from "components/WalletUnlock/WalletUnlock";
import VaultStore from "stores/vault";
import EthStore from "stores/eth";
import Loader from "react-loader-spinner";
import Vault from "components/Vault/Vault";
import { observer } from "mobx-react";
import VaultGlobal from "components/VaultGlobal/VaultGlobal";
import "./Vaults.scss";

function Vaults() {
  const { library, account } = useWeb3React();

  useEffect(() => {
    if (account) {
      (async () => {
        await EthStore.initialize(account, library);
        VaultStore.initialize();
      })();
    }
  }, [account, library]);

  if (!account)
    return (
      <Layout view="Vaults" type="vertical">
        <Layout.MainContent view="Vaults" backgroundColor=" rgb(0, 0, 0)">
          <div className="vaults">
            <VaultGlobal />
            Please unlock account before accessing{" "}
            <div className="vault-connector-wrapper">
              <Connectors />
            </div>
          </div>
        </Layout.MainContent>
      </Layout>
    );

  const { vaultAmount } = VaultStore;

  if (vaultAmount === 0)
    return (
      <Layout view="Compensation" type="vertical">
        <Layout.MainContent view="compensation" backgroundColor=" rgb(0, 0, 0)">
          <div
            className="vaults"
            style={{ display: "flex", justifyContent: "center", flex: 1 }}
          >
            <Loader type="Circles" width={150} height={150} color="white" />;
          </div>
        </Layout.MainContent>
      </Layout>
    );

  return (
    <Layout view="Compensation" type="vertical">
      <Layout.MainContent view="compensation" backgroundColor=" rgb(0, 0, 0)">
        <div className="vaults">
          <VaultGlobal />
          {[...Array(vaultAmount).keys()].map((vaultId) => (
            <Vault vaultId={vaultId} key={`vault-${vaultId}`} />
          ))}
        </div>
      </Layout.MainContent>
    </Layout>
  );
}

export default observer(Vaults);
