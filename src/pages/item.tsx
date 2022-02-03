import React, { FC } from 'react';
import styles from './item.less';
import { connect, ItemModelState, ConnectProps } from 'umi';
import {Col, Row} from 'antd';

interface PageProps extends ConnectProps {
  item: ItemModelState,
}

const Item: FC<PageProps> = (props) => {
  const {items = []} = props.item;

  return (
    <Row>
      {items.map(item => (
        <Col key={item.item_id} span={3} className={styles.item}>
          <img src={`https://game.gtimg.cn/images/yxzj/img201606/itemimg/${item.item_id}.jpg`} />
          <p>{item.item_name}</p>
        </Col>
      ))}
    </Row>
  );

  // console.log(props.item);
  // return (
  //   <div>
  //     <h1 className={styles.title}>Page item</h1>
  //     <h2>{JSON.stringify(props.item)}</h2>
  //   </div>
  // );
}
export default connect(({ item }: { item: ItemModelState }) => ({ item }))(Item);

// export default function Page() {
//   return (
//     <div>
//       <h1 className={styles.title}>Page item</h1>
//     </div>
//   );
// }
