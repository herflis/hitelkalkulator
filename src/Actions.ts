import { Period } from './Period';

export module Actions {

    export const InitCalculator = () => ({
        type: 'INIT_CALCULATOR'
    });

    export const SetLtpMonthlySaving = (saving: number) => ({
        type: 'SET_LTP_MONTHLY_SAVING',
        saving
    });

    export const SetLtpNumberOfMonth = (months: number) => ({
        type: 'SET_LTP_MONTHS',
        months
    });

    export const AddPeriod = (id, period: Period) => ({
        type: 'ADD_PERIOD',
        id,
        period
    });

    export const RemovePeriod = (id) => ({
        type: 'REMOVE_PERIOD',
        id
    });

    export const SetLtpCalculatedValues = (allOwn: number, gov: number, allRate: number, allSavings: number) => ({
        type: 'SET_LTP_CALCULATED',
        allOwn,
        gov,
        allRate,
        allSavings
    });

    export const ChangeLength = (length: number) => ({
        type: 'CHANGE_LENGTH',
        length
    });

    export const SetLtpValue = (id: number, ltp: number, totalLtp: number) => ({
        type: 'SET_LTP_VALUE',
        id,
        ltp,
        totalLtp
    });

    export const SetRepaymentForPeriod = (repayment: number, id: number) => ({
        type: 'SET_REPAYMENT_FOR_PERIOD',
        repayment,
        id
    });

    export const SetAssetsForYear = (assets: number, id: number, year: number) => ({
        type: 'SET_ASSETS_FOR_YEAR',
        assets,
        id,
        year
    });
    
    export const SetAssetsWithLtp = (id: Period, assets: number ) => ({
        type: 'SET_ASSETS_WITH_LTP',
        id,
        assets
    });

    export const SetStartingBalance = (balance: number) => ({
        type: 'SET_STARTING_BALANCE',
        balance
    });

    export const SetAllWithoutLtp = (value: number) => ({
        type: 'SET_ALL_WITHOUT_LTP',
        value
    });
}