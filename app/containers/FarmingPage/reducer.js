/*
 *
 * FarmingPage reducer
 *
 */

import produce from 'immer';
import {
  DEFAULT_ACTION,
  CHANGE_FARMING_CONTENT,
  CHANGE_FARMING_CONTENT_TOKEN,
  CHANGE_RGP_FARMING_FEE,
  UPDATE_TOTAL_LIQUIDITY,
  UPDATE_TOKEN_STAKED,
  UPDATE_FARM_BALANCES,
  REFRESH_FARM
} from './constants';


const totalLiquidity = '';
// const RGPBUSDLiquidity = action.payload.reserves1;

export const initialState = {
  contents: [
    {
      id: '1',
      img: 'rgp.svg',
      // deposit: 'RGP',
      deposit: "RGP",
      earn: 'RGP',
      type: "RGP",
      ARYValue: '1235',
      totalLiquidity: '',
      tokensStaked: ['RGP', '0'],
      RGPEarned: '0',
      availableToken: '3.747948393',
      inflationPerDay: 0,
      tokenPrice: 0,
      totalVolumePerPool: 0,
      farmingFee: 0,
      pId: 0
    },
    {
      id: '2',
      img: 'rgp.svg',
      deposit: 'RGP-BNB',
      earn: 'RGP',
      type: "LP",
      ARYValue: '1625',
      totalLiquidity: '',
      tokensStaked: ['RGP-BNB', '0'],
      RGPEarned: '0',
      availableToken: '3.747948393',
      inflationPerDay: 0,
      tokenPrice: 0,
      totalVolumePerPool: 0,
      farmingFee: 0,
      pId: 2
    },
    {
      id: '3',
      img: 'busd.svg',
      //changed from
      // deposit: 'RGP-BUSD', to
      deposit: "RGP-BUSD",
      earn: 'RGP',
      type: "LP",
      ARYValue: "725",
      totalLiquidity: '',
      tokensStaked: ['RGP-BUSD', '0'],
      RGPEarned: '0',
      availableToken: '3.747948393',
      inflationPerDay: 0,
      tokenPrice: 0,
      totalVolumePerPool: 0,
      farmingFee: 0,
      pId: 1
    },
    {
      id: '4',
      img: 'busd.svg',
      //changed from
      // deposit: 'BNB-BUSD', to
      deposit: "BNB-BUSD",
      earn: 'RGP',
      ARYValue: '325',
      type: "LP",
      totalLiquidity: '',
      tokensStaked: ['BNB-BUSD', '0'],
      RGPEarned: '0',
      availableToken: '3.747948393',
      inflationPerDay: 0,
      tokenPrice: 0,
      totalVolumePerPool: 0,
      farmingFee: 0,
      pId: 3
    },
  ],
  refresh: false,
};
// const user_Individual_Reward = (individualLiquidity / totalLiquidity) * reward
// Reward = (Multiplier x block diff x reward per block x allocation point ) / Total Allocation Point
// ARY of pool = (Current Price x Inflation Per Day x 365 x 100%) / Total Volume per Pool
// const blockPerDay = 4 * 60 * 24;
// const daysPerYear = 365;
/* eslint-disable default-case, no-param-reassign */

// let data = {
//   getTotalAlloc: getTotalAlloc.toString(),
//   multipler: getMultiplier.toString(),
//   getrigelPerBlock: getrigelPerBlock.toString(),
//   getStartBlock: getStartBlock.toString()
// }

const farmingPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case CHANGE_FARMING_CONTENT:
        let id = `${action.payload.symbol0}-${action.payload.symbol1}`
        let current = draft.contents.findIndex(obj => obj.deposit === id)
        if (current >= 0) {
          draft.contents[current].totalLiquidity =
            parseInt(action.payload.reserves1) +
            parseInt(action.payload.reserves0);
        }
        break;
      case CHANGE_FARMING_CONTENT_TOKEN:
        let token = action.payload.deposit
        current = draft.contents.findIndex(obj => obj.deposit === token)
        if (current >= 0) {
          draft.contents[current].RGPEarned = parseInt(action.payload.tokenEarned).toFixed(4)
          draft.contents[current].inflationPerDay = action.payload.inflationPerDay
          draft.contents[current].tokenPrice = action.payload.tokenPrice
          draft.contents[current].totalVolumePerPool = action.payload.totalVolumePerPool
          draft.contents[current].ARYValue = action.payload.ARYValue
          draft.contents[current].availableToken = action.payload.availableToken
          draft.contents[current].tokensStaked[0] = action.payload.tokenStakedVal
          draft.contents[current].tokensStaked[1] = action.payload.tokenEarnedVal
        }
        break
      case CHANGE_RGP_FARMING_FEE:
        let farmingFee = action.payload.fee
        draft.contents.forEach(obj => obj.farmingFee = farmingFee
        )
        break
      case UPDATE_TOTAL_LIQUIDITY:
        let totalLiquidity = action.payload
        totalLiquidity.forEach((item, index) => {
          draft.contents[index].totalLiquidity = item.liquidity
          draft.contents[index].ARYValue = item.apy
        })
        break;
      case UPDATE_TOKEN_STAKED:
        let stakedToken = action.payload
        stakedToken.forEach((item, index) => {
          draft.contents[index].tokensStaked = [draft.contents[index].tokensStaked[0], item.staked]
          draft.contents[index].RGPEarned = item.earned
        })
        break
      case UPDATE_FARM_BALANCES:
        let balances = action.payload
        balances.forEach((item, index) => {
          draft.contents[index].availableToken = item;
        })
        break
      case REFRESH_FARM:
        draft.refresh = true
        break
    }
  });

export default farmingPageReducer;
