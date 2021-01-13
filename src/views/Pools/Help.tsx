import React, { memo, useState } from "react";
import { useHistory } from "react-router-dom";
import BoostingInfo from "components/BoostingInfo/BoostingInfo";
import Modal from "react-modal";
import { AcademyBox, BoostingBox, BoostModalStyles } from "./Pools.styles";
import img_join_convo from "assets/join_convo.png";
import boostIcon from "assets/rev_meter.png";

function Help() {
  const history = useHistory();
  const handleClick = () => history.push("/learn");
  const [boostInfoModalOpen, setBoostInfoModalOpen] = useState(false);
  return (
    <>
      <div className="box-container">
        <AcademyBox>
          <div className="title">First time in DeFi?</div>
          <div className="join">
            <div className="join-text">
              Learn how ZZZ works by checking out our step by step tutorials!
            </div>
            <img src={img_join_convo} alt="zzz-join_convo" />
          </div>
          <button className="join-button" onClick={handleClick}>
            ZZZ University
          </button>
        </AcademyBox>
      </div>
      <div className="box-container">
        <BoostingBox>
          <div className="boosting-title">
            What is boosting?{" "}
            <img src={boostIcon} alt="boost" className="boosting-icon" />{" "}
          </div>
          <button
            className="join-button"
            onClick={() => setBoostInfoModalOpen(true)}
          >
            Click here to learn more about boosting your yields
          </button>
        </BoostingBox>
      </div>
      <Modal
        isOpen={boostInfoModalOpen}
        onRequestClose={() => setBoostInfoModalOpen(false)}
        contentLabel="Boosting info"
        style={BoostModalStyles}
      >
        <BoostingInfo />
      </Modal>
    </>
  );
}

// Never rerender
export default memo(Help, (prevProps, nextProps) => true);
