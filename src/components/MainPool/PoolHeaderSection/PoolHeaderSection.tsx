import BoostingInfo from "components/BoostingInfo/BoostingInfo";
import MigrationInfo from "components/MigrationInfo/MigrationInfo";
import PoolInfo from "components/PoolInfo/PoolInfo";
import React, { useState } from "react";
import Modal from "react-modal";
import { Pool, PoolCategory } from "types";
import { Header, PartnerModalStyles } from "./PoolHeaderSection.styles";

type Props = {
  pool: Pool;
  userStaked: number;
  totalStaked: number;
  tooltipBoost?: string | null;
  userPercentageOfTotal: number;
  multiplier: number;
};

Modal.setAppElement("#root");

function PoolHeaderSection({
  pool,
  userStaked,
  totalStaked,
  userPercentageOfTotal,
  tooltipBoost,
  multiplier,
}: Props) {
  const [poolInfoModalOpen, setIsPoolInfoModalOpen] = useState(false);
  const [migrationModalOpen, setMigrationModalOpen] = useState(false);
  const [effectiveStakeModalOpen, setIsEffectiveStakeModalOpen] = useState(
    false
  );
  const { token, partnerName, poolIcon, category, purchaseFrom } = pool;
  const effectiveStake = userStaked * multiplier - userStaked;
  return (
    <Header>
      <a
        className="header-text buy-button"
        href={purchaseFrom}
        target="_blank"
        rel="noopener noreferrer"
      >
        Get {token.name}
      </a>
      {category === PoolCategory.Partners && (
        <div
          className="header-text buy-button"
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={() => setIsPoolInfoModalOpen(true)}
        >
          What is {partnerName}
        </div>
      )}
      {pool.hasEffectiveStake && !pool.isMigrationPool && (
        <div
          className="header-text buy-button"
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={() => setIsEffectiveStakeModalOpen(true)}
        >
          Effective stake?
        </div>
      )}
      {pool.isMigrationPool && (
        <div
          className="header-text buy-button"
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={() => setMigrationModalOpen(true)}
        >
          Migration?
        </div>
      )}
      <div className="header-text">
        staked {userStaked ? userStaked.toFixed(5) : 0} /{" "}
        {totalStaked.toFixed(2)} {token.name}
        {pool.isMigrationPool && "V2"}{" "}
        {userPercentageOfTotal
          ? `(${userPercentageOfTotal.toFixed(2)}%)`
          : "(0%)"}
      </div>
      {!pool.hasEffectiveStake && !pool.isMigrationPool ? (
        <div className="header-text" data-tip={tooltipBoost}>
          boost {((multiplier! - 1) * 100).toFixed(0)}%
        </div>
      ) : (
        !pool.isMigrationPool && (
          <div className="header-text">
            stake bonus: {effectiveStake.toFixed(2)} {pool.token.name}
          </div>
        )
      )}
      <Modal
        isOpen={poolInfoModalOpen}
        onRequestClose={() => setIsPoolInfoModalOpen(false)}
        contentLabel="Pool Info"
        style={PartnerModalStyles}
      >
        {partnerName && (
          <PoolInfo partnerName={partnerName} poolIcon={poolIcon} />
        )}
      </Modal>
      <Modal
        isOpen={effectiveStakeModalOpen}
        onRequestClose={() => setIsEffectiveStakeModalOpen(false)}
        contentLabel="Pool Info"
        style={PartnerModalStyles}
      >
        <BoostingInfo effectiveStake={pool.hasEffectiveStake} />
      </Modal>
      <Modal
        isOpen={migrationModalOpen}
        onRequestClose={() => setMigrationModalOpen(false)}
        contentLabel="Migrations"
        style={PartnerModalStyles}
      >
        <MigrationInfo />
      </Modal>
    </Header>
  );
}
export default PoolHeaderSection;
