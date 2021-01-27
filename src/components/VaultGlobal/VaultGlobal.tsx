import React, { useState } from "react";
import { observer } from "mobx-react";
import EthStore from "stores/eth";
import VaultStore from "stores/vault";
import VaultReadme from "components/VaultReadme/VaultReadme";
import Modal from "react-modal";
import "./VaultGlobal.scss";
import { vaultContracts } from "eth/contracts";

Modal.setAppElement("#root");

const ReadmeStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(0,0,0,0.9)",
    width: "75%",
    height: "70%",
    padding: "12px 40px",
  },
};
function VaultGlobal() {
  const [showReadme, setShowReadme] = useState(false);
  const { currentBlock } = EthStore;
  const {
    epoch,
    epochStartBlock,
    NAPb,
    ZZZb,
    ZZZlastEpoch,
    NAPlastEpoch,
    NAPcurrentEpoch,
    ZZZcurrentEpoch,
  } = VaultStore;

  const canStartNewEpoch = epochStartBlock + 200000 - currentBlock <= 0;
  return (
    <div className="vault-global">
      <h1>
        <a
          href={`https://etherscan.io/address/${vaultContracts.homestead.vault.address}`}
          target="blank"
          rel="noopener noreferrer"
        >
          ZZZ VAULTS
        </a>
      </h1>
      <div className="help-button" onClick={() => setShowReadme(true)}>
        README{" "}
        <span role="img" aria-label="help">
          📝
        </span>
      </div>
      <div className="epoch">
        CURRENT EPOCH: {epoch} - next in{" "}
        {epochStartBlock + 200000 - currentBlock} blocks
      </div>
      <div
        className={`vault-button ${!canStartNewEpoch && "disabled"}`}
        onClick={() => canStartNewEpoch && VaultStore.newEpoch()}
      >
        Start a new epoch
      </div>
      <Modal
        isOpen={showReadme}
        onRequestClose={() => setShowReadme(false)}
        contentLabel="Vault Info"
        style={ReadmeStyles}
      >
        <VaultReadme />
      </Modal>
      <div className="sub-header" style={{ textAlign: "center" }}>
        <div className="zzz-rewards">
          ZZZ avg per block: <b>{ZZZb} ZZZ</b>
        </div>
        <div className="zzz-rewards">
          last epoch total: <b>{ZZZlastEpoch} ZZZ</b> - current:{" "}
          <b>{ZZZcurrentEpoch} ZZZ</b>
        </div>
        <br />
        <br />
        <div className="nap-rewards">
          NAP avg per block: <b>{NAPb} NAP</b>
        </div>
        <div className="zzz-rewards">
          last epoch total: <b>{NAPlastEpoch} NAP</b> - current:{" "}
          <b>{NAPcurrentEpoch} NAP</b>
        </div>
      </div>
    </div>
  );
}

export default observer(VaultGlobal);
