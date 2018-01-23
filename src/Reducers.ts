import { combineReducers } from 'redux';

export module Reducers {
    export const months = (state = 0, action) => {
        switch (action.type) {
            case 'SET_LTP_MONTHS':
                return action.months;
            default:
                return state;
        }
    };

    export const monthlySaving = (state = 0, action) => {
        switch (action.type) {
            case 'SET_LTP_MONTHLY_SAVING':
                return action.saving;
            default:
                return state;
        }
    };

    export const allOwnSavings = (state = 0, action) => {
        switch (action.type) {
            case 'SET_LTP_CALCULATED':
                return action.allOwn;
            default:
                return state;
        }
    };

    export const gov = (state = 0, action) => {
        switch (action.type) {
            case 'SET_LTP_CALCULATED':
                return action.gov;
            default:
                return state;
        }
    };

    export const allRate = (state = 0, action) => {
        switch (action.type) {
            case 'SET_LTP_CALCULATED':
                return action.allRate;
            default:
                return state;
        }
    };

    export const allSavings = (state = 0, action) => {
        switch (action.type) {
            case 'SET_LTP_CALCULATED':
                return action.allSavings;
            default:
                return state;
        }
    };

    export const ltp = combineReducers({
        months,
        monthlySaving,
        allOwnSavings,
        gov,
        allRate,
        allSavings
    });

    export const ids = (state = [], action) => {
        switch (action.type) {
            case 'ADD_PERIOD':
                return [...state, action.id];
            case 'REMOVE_PERIOD':
                const index = state.indexOf(action.id);
                return [...state.slice(0, index), ...state.slice(index + 1)];
            default:
                return state;
        }
    };

    export const entities = (state = {}, action) => {
        switch (action.type) {
            case 'ADD_PERIOD':
                let b = Object.assign({}, state);
                b[action.id] = action.period;
                return b;
            case 'REMOVE_PERIOD':
                let res = Object.assign({}, state);
                delete res[action.id];
                return res;
            case 'SET_REPAYMENT_FOR_PERIOD':
                let r = Object.assign({}, state);
                r[action.id].years.map(year => year.repayment = action.repayment);
                return r;
            case 'SET_ASSETS_FOR_YEAR':
                let v = Object.assign({}, state);
                v[action.id].years.map(year => {
                    if (Number(year.number) === Number(action.year)) { year.assets = action.assets; }
                });
                return v;
            case 'SET_LTP_VALUE':
                let a = Object.assign({}, state);
                a[action.id].periodEnd.ltpRepayment = action.totalLtp;
                a[action.id].years.map(year => year.ltp = action.ltp);
                return a;
            case 'SET_ASSETS_WITH_LTP':
                let x = Object.assign({}, state);
                const lastAssets = x[action.id].years[x[action.id].years.length - 1].assets;
                x[action.id].periodEnd.assets = lastAssets - action.assets;
                return x;
            default:
                return state;
        }
    };

    export const change = (state = 0, action) => {
        switch (action.type) {
            case 'ADD_PERIOD':
            case 'REMOVE_PERIOD':
            case 'SET_REPAYMENT_FOR_PERIOD':
            case 'SET_LTP_VALUE':
                let a = state + 1;
                return a;
            default:
                return state;
        }
    };

    export const periods = combineReducers({
        entities,
        ids,
    });

    export const defaultLength = (state = {}, action) => {
        switch (action.type) {
            case 'CHANGE_LENGTH':
                return action.length;
            default:
                return state;
        }
    };

    export const startingBalance = (state = 0, action) => {
        switch (action.type) {
            case 'SET_STARTING_BALANCE':
                return action.balance;
            default:
                return state;
        }
    };

    export const allWithoutLtp = (state = 0, action) => {
        switch (action.type) {
            case 'SET_ALL_WITHOUT_LTP':
                return action.value;
            default:
                return state;
        }
    };

    export const homeLoan = combineReducers({
        periods,
        defaultLength,
        startingBalance,
        allWithoutLtp
    });

    export const getDefaultLength = (state) => state.defaultLength;
    export const getPeriods = (state) => state.periods;
    export const getLastYear = (state) => {
        const p = getPeriods(state);
        return p.ids.length > 0 ?
            p.entities[p.ids[p.ids.length - 1]].years[p.entities[p.ids[p.ids.length - 1]].length - 1].number :
            0;
    };
    export const getMonthlySaving = (state) => state.monthlySaving;
    export const getTotalLtp = (state) => state.allSavings;
    export const getStartingBalance = (state) => state.startingBalance;
    export const getallRepayment = (state) => {
        let all = 0;
        state.periods.ids.map(id => {
            state.periods.entities[id].years.map(year => {
                all += year.repayment * 12;
            });
        });
        return all;
    };
    export const getallLtp = (state) => {
        let all = 0;
        state.periods.ids.map(id => {
            state.periods.entities[id].years.map(year => {
                all += year.ltp * 12;
            });
        });
        return all;
    };
    export const getAllWithoutLtp = (state) => state.allWithoutLtp;
    export const getAllWithLtp = (state) => getallRepayment(state) + getallLtp(state);
    export const getSavingsSummary = (state) => state.allWithoutLtp - getAllWithLtp(state);
}