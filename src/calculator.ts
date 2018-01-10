export module Calculator {
    const gowRate = 0.3;
    const assetsRate = 0.001;
    // const deposit = 0.0026583;
    export const simpleInterest = (amount, rate, years) =>
        (amount * rate * years) / 100;

    export const compoundInterest = (amount, rate, years) =>
        amount * (((1 + (rate / 100)) ** years) - 1);

    export const allOwnSavings = (monthly, months) =>
        monthly * months;

    export const govSupport = (monthly, months) =>
        allOwnSavings(monthly, months) * gowRate;

    export const govSupportPerYear = (monthly) =>
        allOwnSavings(monthly, 12) * gowRate;

    export const assetsPerMonth = (base, monthly) =>
        base + monthly + ratePerMonth(base + monthly);

    export const ratePerMonth = (assets) =>
        (assets * assetsRate) / 12;

    export const allWithoutRate = (all, own, gov) =>
        all - (own + gov);

    export const assetsPerYear = (monthly, months) => {
        const years = months / 12;
        let all = 0;
        for (let year = 0; year < years; year++) {
            for (let month = 0; month < 12; month++) {
                all = assetsPerMonth(all, Number(monthly));
            }
            all += govSupportPerYear(Number(monthly));
        }
        return Math.round(all);
    };

}