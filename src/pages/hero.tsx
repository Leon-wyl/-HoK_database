import React, { FC } from 'react';
import styles from './hero.less';
import { connect, HeroModelState, ConnectProps } from 'umi';
import { Col, Row, Radio, Card } from 'antd';

const RadioGroup = Radio.Group;
const heroType = [
  { key: 0, value: '全部' },
  { key: 1, value: '战士' },
  { key: 2, value: '法师' },
  { key: 3, value: '坦克' },
  { key: 4, value: '刺客' },
  { key: 5, value: '射手' },
  { key: 6, value: '辅助' },
];

interface PageProps extends ConnectProps {
  hero: HeroModelState;
  dispatch: any;
}

const Hero: FC<PageProps> = (props) => {
  // console.log(props.hero);
  // return (
  //   <div>
  //     <h1 className={styles.title}>Page Hero</h1>
  //     <h2>{JSON.stringify(props.hero)}</h2>
  //   </div>
  // );
  const { heros = [], filterKey = 0 } = props.hero;

  const onChange = (e: any) => {
    console.log(e.target.value);
    props.dispatch({
      type: 'hero/save',
      payload: {
        filterKey: e.target.value,
      },
    });
  };

  return (
    <div className={styles.normal}>
      <Card className={styles.radioPanel}>
        <RadioGroup onChange={onChange} value={filterKey}>
          {heroType.map((data) => (
            <Radio value={data.key} key={`hero-radio-${data.key}`}>
              {data.value}
            </Radio>
          ))}
        </RadioGroup>
      </Card>
      <Row className={styles.heros}>
        {heros
          .filter(item => filterKey === 0 || item.hero_type == filterKey)
          .map((item) => (
          <Col key={item.ename} span={3} className={styles.heroitem}>
            <img
              src={`https://game.gtimg.cn/images/yxzj/img201606/heroimg/${item.ename}/${item.ename}.jpg`}
            />
            <p>{item.cname}</p>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default connect(({ hero }: { hero: HeroModelState }) => ({ hero }))(
  Hero,
);
