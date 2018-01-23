import * as React from 'react';
import { connect } from 'react-redux';
import { Actions } from './Actions';
import { Reducers } from './Reducers';
import Input, { InputLabel } from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

import { Calculator } from './calculator';

const styles = {
    container: {
        textAlign: 'left',
        padding: 20
    },
    row: {
        marginBottom: 50,
        width: '100%'
    },
    button: {
        marginBottom: 20,
        color: '#fff'
    }
};

class Periods {
    ids: number[];
}

interface LTPFormProps {
    SetMonths: Function;
    SetMonthlySavings: Function;
    SetCalculated: Function;
    SetLtp: Function;
    SetAssetsWithLtp: Function;
    periods: Periods;
    TotalLtp: number;
}

interface LTPFormState {
    months: number;
    monthly: number;
    all: number;
    gov: number;
    allRate: number;
    allSaving: number;
}

class LTPForm extends React.Component<LTPFormProps, LTPFormState> {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            months: 48,
            monthly: 0,
            all: 0,
            gov: 0,
            allRate: 0,
            allSaving: 0
        };
    }
    handleChange = (name, event) => {
        this.setState({
            [name]: event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { monthly, months } = this.state;
        const { SetMonths, SetMonthlySavings, SetCalculated, periods, SetLtp, SetAssetsWithLtp } = this.props;

        const allOwn = Calculator.allOwnSavings(monthly, months);
        const gov = Calculator.govSupport(monthly, months);
        const allAssets = Calculator.assetsPerYear(monthly, months);
        const allAssetsRate = Calculator.allWithoutRate(allAssets, allOwn, gov);

        SetMonths(months);
        SetMonthlySavings(Number(monthly));
        SetCalculated(allOwn, gov, allAssetsRate, allAssets);
        SetLtp(periods.ids[periods.ids.length - 1], Number(monthly), allAssets);
        SetAssetsWithLtp(periods.ids[periods.ids.length - 1], allAssets);
    }
    render() {
        return (
            <div style={styles.container}>
                <Typography type="display1" gutterBottom={true}>
                    LTP
                </Typography>
                <form autoComplete="off" onSubmit={e => this.handleSubmit(e)}>
                    <FormControl style={styles.row}>
                        <TextField
                            type="number"
                            id="monthly"
                            label="Havi megtakarítás"
                            onChange={e => this.handleChange('monthly', e)}
                        />
                    </FormControl><br />
                    <FormControl style={styles.row}>
                        <InputLabel htmlFor="number-of-months">Hónapok száma</InputLabel>
                        <Select
                            native={true}
                            value={this.state.months}
                            name="months"
                            onChange={e => this.handleChange('months', e)}
                            input={<Input id="number-of-months" />}
                        >
                            <option value={48}>48</option>
                            <option value={60}>60</option>
                            <option value={72}>72</option>
                            <option value={96}>96</option>
                            <option value={120}>120</option>
                        </Select>
                    </FormControl>
                    <Button type="submit" raised={true} color="primary" style={styles.button}>
                        Számol
            </Button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state, match) => {
    return {
        periods: Reducers.getPeriods(state.homeLoan),
        TotalLtp: Reducers.getTotalLtp(state.ltp)
    };
};

export default connect(mapStateToProps, {
    SetMonths: Actions.SetLtpNumberOfMonth,
    SetMonthlySavings: Actions.SetLtpMonthlySaving,
    SetCalculated: Actions.SetLtpCalculatedValues,
    SetLtp: Actions.SetLtpValue,
    SetAssetsWithLtp: Actions.SetAssetsWithLtp
})(LTPForm);