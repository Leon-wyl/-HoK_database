import React, { FC } from 'react';
import styles from './item.less';
import { connect, ItemModelState, ConnectProps } from 'umi';
import { Col, Row, Card, Radio } from 'antd';

const RadioGroup = Radio.Group;
const itemType = [
  { key: 0, value: '全部' },
  { key: 1, value: '攻击' },
  { key: 2, value: '法术' },
  { key: 3, value: '防御' },
  { key: 4, value: '移动' },
  { key: 5, value: '打野' },
  { key: 7, value: '游走' },
];

interface PageProps extends ConnectProps {
  item: ItemModelState;
  dispatch: any;
}

const Item: FC<PageProps> = (props) => {
  const { items = [], filterKey = 0 } = props.item;
  const onChange = (e: any) => {
    props.dispatch({
      type: 'item/save',
      payload: {
        filterKey: e.target.value,
      },
    });
  };

  return (
    <div className={styles.normal}>
      <Card className={styles.radioPanel}>
        <RadioGroup onChange={onChange} value={filterKey}>
          {itemType.map((data) => (
            <Radio value={data.key} key={`hero-radio-${data.key}`}>
              {data.value}
            </Radio>
          ))}
        </RadioGroup>
      </Card>
      <Row>
        {items
          .filter((item) => (filterKey === 0 || filterKey === item.item_type))
          .map((item) => (
          <Col key={item.item_id} span={3} className={styles.item}>
            <img
              src={`https://game.gtimg.cn/images/yxzj/img201606/itemimg/${item.item_id}.jpg`}
            />
            <p>{item.item_name}</p>
          </Col>
        ))}
      </Row>
    </div>
  );

  // console.log(props.item);
  // return (
  //   <div>
  //     <h1 className={styles.title}>Page item</h1>
  //     <h2>{JSON.stringify(props.item)}</h2>
  //   </div>
  // );
};
export default connect(({ item }: { item: ItemModelState }) => ({ item }))(
  Item,
);

// export default function Page() {
//   return (
//     <div>
//       <h1 className={styles.title}>Page item</h1>
//     </div>
//   );
// }
