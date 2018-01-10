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

    export const ChangePeriodRepayment = (id: number, repayment) => ({
        type: 'CHANGE_PERIOD_REPAYMENT',
        id,
        repayment
    });
}