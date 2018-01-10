export class PeriodEnd {
    numberOfYears: number;
    assets: number;
    ltpRepayment: number;
    constructor(numberOfYears: number, assets: number, ltpRepayment: number) {
        this.numberOfYears = numberOfYears;
        this.assets = assets;
        this.ltpRepayment = ltpRepayment;
    }
}