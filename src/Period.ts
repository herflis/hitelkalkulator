import { Year } from './Year';
import { PeriodEnd } from './PeriodEnd';

export class Period {
    length: number;
    years: Year[];
    periodEnd: PeriodEnd;
    id: number;
    constructor(length: number, id, lastYear: number) {
        this.length = length;
        this.years = [];
        for (let i = lastYear; i < lastYear + length; i++) {
            this.years.push(new Year(i + 1, 0, 0, 0));
        }
        this.periodEnd = new PeriodEnd(lastYear + length, 0, 0);
        this.id = id;
    }
}