import useEth from "../../contexts/EthContext/useEth";
import Title from "./Title";
import Desc from "./Desc";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import BallotContract from "./BallotContract";

function Demo() {
  const { state } = useEth();

  const demo =
    <>
      <div className="contract-container">
        <BallotContract />
      </div>
      <Desc />
    </>;

  return (
    <div className="demo">
      <Title />
      {
        !state.artifact ? <NoticeNoArtifact /> :
          !state.contract ? <NoticeWrongNetwork /> :
            demo
      }
    </div>
  );
}

export default Demo;
