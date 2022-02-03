import React, { FC } from 'react';
import styles from './hero.less';
import { connect, HeroModelState, ConnectProps } from 'umi';
import { Col, Row } from 'antd';

interface PageProps extends ConnectProps {
  hero: HeroModelState;
}

const Hero: FC<PageProps> = (props) => {
  // console.log(props.hero);
  // return (
  //   <div>
  //     <h1 className={styles.title}>Page Hero</h1>
  //     <h2>{JSON.stringify(props.hero)}</h2>
  //   </div>
  // );
  let { heros = [] } = props.hero;
  
  return (
    <Row>
      {heros.map(item => (
        <Col key={item.ename} span={3} className={styles.heroitem}>
          <img src={`https://game.gtimg.cn/images/yxzj/img201606/heroimg/${item.ename}/${item.ename}.jpg`} />
          <p>{item.cname}</p>
        </Col>
      ))}
    </Row>
  );
};

export default connect(({ hero }: { hero: HeroModelState }) => ({ hero }))(
  Hero,
);
