import * as React from 'react';
import { connect } from 'react-redux';
import { TableRow, TableCell } from 'material-ui/Table';
import { Reducers } from './Reducers';
import * as NumberFormat from 'react-number-format';

const styles = {
    cellFirst: {
        fontWeight: 600,
        background: '#ECEFF1',
        color: 'rgba(0, 0, 0, 0.54)'
    },
    cell: {
        textAlign: 'right',
        fontWeight: 600,
        background: '#ECEFF1',
        color: 'rgba(0, 0, 0, 0.54)'
    }
};

interface PeriodEndViewProps {
    periods: any;
    periodId: number;
    LastYearOfLastPeriod: number;
}

class PeriodEndView extends React.Component<PeriodEndViewProps, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        const { periods, periodId } = this.props;
        const period = periods.entities[periodId];
        return (
            <TableRow>
                <TableCell style={styles.cellFirst as any}>
                    {`${period.periodEnd.numberOfYears}. év betörlesztés után`}
                </TableCell>
                <TableCell style={styles.cell as any} numeric={true}>
                    <NumberFormat
                        value={period.periodEnd.assets}
                        displayType={'text'}
                        thousandSeparator={' '}
                        suffix={' Ft'}
                    />
                </TableCell>
                <TableCell style={styles.cell as any} />
                <TableCell style={styles.cell as any} numeric={true}>
                    <NumberFormat
                        value={period.periodEnd.ltpRepayment}
                        displayType={'text'}
                        thousandSeparator={' '}
                        suffix={' Ft'}
                    />
                </TableCell>
                <TableCell style={styles.cell as any} />
            </TableRow>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        periods: Reducers.getPeriods(state.homeLoan),
        LastYearOfLastPeriod: Reducers.getLastYear(state.homeLoan)
    };
};

export default connect(mapStateToProps, {})(PeriodEndView);