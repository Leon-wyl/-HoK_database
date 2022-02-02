import { Effect, Reducer, Subscription, request } from 'umi';

export interface SummonerModelState {
  name: string;
}

export interface SummonerModelType {
  namespace: 'summoner';
  state: SummonerModelState;
  effects: {
    query: Effect;
    fetch: Effect;
  };
  reducers: {
    save: Reducer<SummonerModelState>;
  };

  subscriptions: { setup: Subscription };
}

const SummonerModel: SummonerModelType = {
  namespace: 'summoner',

  state: {
    name: 'summoner',
  },

  effects: {
    *query({ payoload }, { call, put }) {},
    *fetch({type, payload}, {put, call, select}) {
      const data = yield request('/web201605/js/summoner.json');
      const localData = [
        {
        "summoner_id": 80104,
        "summoner_name": "惩击",
        "summoner_rank": "LV.1解锁",
        "summoner_description": "30秒CD：对身边的野怪和小兵造成真实伤害并眩晕1秒"
        }, 
        {
        "summoner_id": 80108,
        "summoner_name": "终结",
        "summoner_rank": "LV.3解锁",
        "summoner_description": "90秒CD：立即对身边敌军英雄造成其已损失生命值14%的真实伤害"
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
    setup({dispatch, history}) {
      return history.listen(({pathname, search}) => {
        if (pathname == '/summoner') {
          dispatch({
            type: 'fetch',
          });
        }
      });
    },
  },
};

export default SummonerModel;
