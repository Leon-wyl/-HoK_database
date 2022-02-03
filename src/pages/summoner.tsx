import React, { FC } from 'react';
import styles from './summoner.less';
import {connect, SummonerModelState, ConnectProps} from 'umi';
import {Col, Row} from 'antd';

interface PageProps extends ConnectProps {
  summoner: SummonerModelState;
}

const Summoner: FC<PageProps> = (props) => {
  const {summoners = []} = props.summoner;

  return (
    <Row>
      {props.summoner.summoners.map(summoner => (
        <Col key={summoner.summoner_id} span={3} className={styles.summoner}>
          <img src={`https://game.gtimg.cn/images/yxzj/img201606/summoner/${summoner.summoner_id}.jpg`} />
          <p>{summoner.summoner_name}</p>
        </Col>
      ))}
    </Row>
  );

  // console.log(props.summoner);
  // return (
  //   <div>
  //     <h1 className={styles.title}>Page summoner</h1>
  //     <h2>{JSON.stringify(props.summoner)}</h2>
  //   </div>
  // );
};

export default connect(({ summoner }: { summoner: SummonerModelState }) => ({ summoner }))(
  Summoner,
);

// export default function Page() {
//   return (
//     <div>
//       <h1 className={styles.title}>Page summoner</h1>
//     </div>
//   );
// }
