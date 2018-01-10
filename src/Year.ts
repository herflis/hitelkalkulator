export class Year {
    number: number;
    assets: number;
    repayment: number;
    ltp: number;

    constructor(num: number, assets: number, repayment: number, ltp: number) { 
        this.number = num;
        this.assets = assets;
        this.repayment = repayment;
        this.ltp = ltp;
    }
}