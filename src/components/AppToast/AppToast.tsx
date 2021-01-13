import React from "react";
import AppToastSpinner from "../AppToast/AppToastSpinner";
import "./AppToast.scss";

type Props = {
  spinnerCondition: any;
  txId?: string;
  message?: string;
};

function AppToast({ spinnerCondition, txId, message }: Props) {
  if (spinnerCondition && txId !== "") {
    const link = "https://etherscan.io/tx/" + txId;
    return (
      <a href={link} target="_blank" rel="noopener noreferrer">
        <div className="apptoast-container">
          <div className="apptoast-container-col">
            <span className="apptoast-message">{message}</span>
            <span className="apptoast-link">
              View on{" "}
              <a href={link} target="_blank" rel="noopener noreferrer">
                https://etherscan.io
              </a>
            </span>
            <span className="apptoast-link">TX ID: {txId}</span>
          </div>
          <div className="gap"></div>
          <div className="spinner">
            <AppToastSpinner
              type="Grid"
              width={30}
              height={30}
              condition={false}
            />
          </div>
        </div>
      </a>
    );
  }
  if (spinnerCondition && txId === "") {
    return (
      <div className="apptoast-container">
        <div className="apptoast-container-col">
          <span className="apptoast-message">{message}</span>
          <span className="apptoast-link">
            Setting up link to{" "}
            <a
              href="https://etherscan.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://etherscan.io
            </a>
          </span>
          <span className="apptoast-link">TX ID: Pending</span>
        </div>

        <div className="gap"></div>
        <div className="spinner">
          <AppToastSpinner
            children=""
            type="Grid"
            width={25}
            height={25}
            condition={false}
          />
        </div>
      </div>
    );
  }
  if (!spinnerCondition) {
    return spinnerCondition;
  }
}

export default AppToast;
