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
                state[action.id] = action.period;
                return state;
            case 'REMOVE_PERIOD':
                let res = Object.assign({}, state);
                delete res[action.id];
                return res;
            case 'CHANGE_PERIOD_REPAYMENT':
                let r = Object.assign({}, state);
                r[action.id].years.map(year => year.repayment = action.repayment);
                return r;
            default:
                return state;
        }
    };

    export const periods = combineReducers({
        entities,
        ids
    });

    export const defaultLength = (state = {}, action) => {
        switch (action.type) {
            case 'CHANGE_LENGTH':
                return action.length;
            default:
                return state;
        }
    };

    export const homeLoan = combineReducers({
        periods,
        defaultLength
    });

    export const getDefaultLength = (state) => state.defaultLength;
    export const getPeriods = (state) => state.periods;
    export const getLastYear = (state) => {
        const p = getPeriods(state);
        return p.ids.length > 0 ?
            p.entities[p.ids[p.ids.length - 1]].years[p.entities[p.ids[p.ids.length - 1]].length - 1].number :
            0;
    };
}