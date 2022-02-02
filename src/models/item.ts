import { Effect, Reducer, Subscription, request } from 'umi';

export interface ItemModelState {
  name: string;
  items: [];
}

export interface ItemModelType {
  namespace: 'item';
  state: ItemModelState;
  effects: {
    query: Effect;
    fetch: Effect;
  };
  reducers: {
    save: Reducer<ItemModelState>;
  };

  subscriptions: { setup: Subscription };
}

const ItemModel: ItemModelType = {
  namespace: 'item',

  state: {
    name: 'item',
    items: [],
  },

  effects: {
    *query({ payoload }, { call, put }) {},
    *fetch({ type, payload }, { put, call, select }) {
      const data = yield request('/web201605/js/item.json');
      const localData = [
        {
          item_id: 1111,
          item_name: '铁剑',
          item_type: 1,
          price: 150,
          total_price: 250,
          des1: '<p>+20物理攻击</p>',
        },
        {
          item_id: 1112,
          item_name: '匕首',
          item_type: 1,
          price: 174,
          total_price: 290,
          des1: '<p>+10%攻击速度 </p>',
        },
      ];
      yield put({
        type: 'save',
        payload: {
          items: data || localData,
        },
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        if (pathname == '/item') {
          dispatch({
            type: 'fetch',
          });
        }
      });
    },
  },
};

export default ItemModel;
