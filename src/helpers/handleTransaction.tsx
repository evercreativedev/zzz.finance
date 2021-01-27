import React from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import AppToast from "components/AppToast/AppToast";

async function handleTransaction(
  transaction: any,
  action: string,
  extra?: any
) {
  toast(
    <AppToast
      spinnerCondition={true}
      txId={""}
      message={`Pending ${action} confirmation`}
    />,
    {
      position: "top-left",
      autoClose: 3500,
      hideProgressBar: false,
      progress: undefined,
      closeOnClick: false,
      type: "dark",
    }
  );

  const tx: ethers.providers.TransactionResponse = await transaction();

  const toastId = action;
  toast(
    <AppToast
      spinnerCondition={true}
      txId={tx.hash}
      message={`Waiting block confirmation for ${action}`}
    />,
    {
      position: "top-left",
      autoClose: false,
      hideProgressBar: false,
      progress: undefined,
      closeOnClick: false,
      type: "dark",
      toastId,
    }
  );

  await tx.wait();
  toast.dismiss(toastId);

  toast(
    <AppToast
      spinnerCondition={true}
      txId={tx.hash}
      message={`${action} confirmed.`}
    />,
    {
      position: "top-left",
      autoClose: 3500,
      hideProgressBar: false,
      progress: undefined,
      closeOnClick: false,
      type: "dark",
      toastId,
    }
  );
  return;
}

export default handleTransaction;
