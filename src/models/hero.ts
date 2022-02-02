import { Effect, Reducer, Subscription, request } from 'umi';

interface HeroProps {
  ename: number;
  cname: string;
  title: string;
  new_type: number;
  hero_type: number;
  skin_name: string;
}

export interface HeroModelState {
  name: string;
  heros: HeroProps[] ;
}

export interface HeromodelType {
  namespace: 'hero';
  state: HeroModelState;
  effects: {
    query: Effect;
    fetch: Effect;
  };
  reducers: {
    save: Reducer<HeroModelState>;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const HeroModel: HeromodelType = {
  namespace: 'hero',

  state: {
    name: '',
    heros: [],
  },

  effects: {
    *query({ payload }, { call, put }) {

    },

    *fetch({ type, payload }, { put, call, select }) {
      const data = yield request('/web201605/js/herolist.json');
      const localData = [
        {
          ename: 105,
          cname: '廉颇',
          title: '正义爆轰',
          new_type: 0,
          hero_type: 3,
          skin_name: '正义爆轰|地狱岩魂',
        },
        {
          ename: 106,
          cname: '小乔',
          title: '恋之微风',
          new_type: 0,
          hero_type: 2,
          skin_name: '恋之微风|万圣前夜|天鹅之梦|纯白花嫁|缤纷独角兽',
        },
      ];
      yield put({
        type: 'save',
        payload: {
          heros: data || localData,
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
        if (pathname === '/hero') {
          dispatch({
            type: 'fetch',
          });
        }
      });
    }
  },
};

export default HeroModel;
