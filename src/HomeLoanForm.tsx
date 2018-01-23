import * as React from 'react';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import Table, { TableHead, TableRow, TableCell } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import { Actions } from './Actions';
import { Reducers } from './Reducers';
import { Period } from './Period';
import { PeriodTables } from './PeriodTables';
import  SummaryRow from './SummaryRow';
import Summary from './Summary';

const styles = {
    container: {
        textAlign: 'left',
        padding: 20
    },
    row: {
        marginBottom: 50,
        width: '100%'
    },
    head: {
        width: 120,
        fontWeight: 600,
        textAlign: 'right',
        textTransform: 'uppercase'
    },
    headFirst: {
        fontWeight: 600,
        textTransform: 'uppercase'
    },
    button: {
        color: '#fff'
    },
    tools: {
        marginBottom: 20,
        textAlign: 'right'
    },
    length: {
        marginRight: 20,
        width: 100
    },
    noperiod: {
        padding: 20,
        fontSize: 14
    }
};

interface HomeLoanFormProps {
    defaultLength: number;
    periods: any;
    ChangeLength: Function;
    AddPeriod: Function;
    LastYearOfLastPeriod: number;
    SetLtp: Function;
    MonthlySaving: number;
    TotalLtp: number;
}

class HomeLoanForm extends React.Component<HomeLoanFormProps, { periods }> {
    constructor(props) {
        super(props);
        this.addPeriod = this.addPeriod.bind(this);
        this.handleLengthChange = this.handleLengthChange.bind(this);
    }
    addPeriod() {
        const { defaultLength, AddPeriod, LastYearOfLastPeriod } = this.props;
        if (defaultLength > 0) {
            const id = Math.floor(Math.random() * (200 - 0 + 1)) + 0;
            const period = new Period(defaultLength, id, LastYearOfLastPeriod);
            AddPeriod(id, period);
            // if (MonthlySaving > 0) {
            //     SetLtp(id, MonthlySaving, TotalLtp);
            // }
        }
    }
    handleLengthChange(event) {
        this.props.ChangeLength(Number(event.target.value));
    }
    render() {
        const { periods } = this.props;
        return (
            <div style={styles.container}>
                <Typography type="display1" gutterBottom={true}>
                    Hitel
                </Typography>
                <div style={styles.tools}>
                    <FormControl style={styles.length}>
                        <InputLabel htmlFor="length">Évek száma</InputLabel>
                        <Input
                            id="length"
                            onChange={e => this.handleLengthChange(e)}
                        />
                    </FormControl>
                    <Button
                        color="primary"
                        raised={true}
                        style={styles.button}
                        onClick={e => this.addPeriod()}
                    >
                        Új periódus
                    </Button>
                </div>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={styles.headFirst as any}>Év</TableCell>
                                <TableCell style={styles.head as any}>Tőkeegyenleg</TableCell>
                                <TableCell style={styles.head as any}>Törlesztés</TableCell>
                                <TableCell style={styles.head as any}>Betörlesztés</TableCell>
                                <TableCell style={styles.head as any}>LTP</TableCell>
                            </TableRow>
                        </TableHead>
                        {
                        periods.ids.length > 0 ?
                                <PeriodTables periods={periods} /> :
                                <div style={styles.noperiod}>Adjon hozzá periódust!</div>
                        }
                        <SummaryRow />
                    </Table>
                    <Summary />
                </Paper>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        defaultLength: Reducers.getDefaultLength(state.homeLoan),
        periods: Reducers.getPeriods(state.homeLoan),
        LastYearOfLastPeriod: Reducers.getLastYear(state.homeLoan),
        MonthlySaving: Reducers.getMonthlySaving(state.ltp),
        TotalLtp: Reducers.getTotalLtp(state.ltp)
    };
};

export default connect(mapStateToProps, {
    ChangeLength: Actions.ChangeLength,
    AddPeriod: Actions.AddPeriod,
    SetLtp: Actions.SetLtpValue
})(HomeLoanForm);