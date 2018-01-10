import * as React from 'react';
import { connect } from 'react-redux';
import { TableRow, TableCell } from 'material-ui/Table';
import { Reducers } from './Reducers';

import { PeriodEnd } from './PeriodEnd';

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
    periodEnd: PeriodEnd;
    periodLength: number;
    LastYearOfLastPeriod: number;
}

class PeriodEndView extends React.Component<PeriodEndViewProps, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        const { periodEnd } = this.props;
        return (
            <TableRow>
                <TableCell style={styles.cellFirst as any}>
                    {`${periodEnd.numberOfYears}. év betörlesztés után`}
                </TableCell>
                <TableCell style={styles.cell as any} numeric={true}>{`${periodEnd.assets} Ft`}</TableCell>
                <TableCell style={styles.cell as any} />
                <TableCell style={styles.cell as any} numeric={true}>{`${periodEnd.ltpRepayment} Ft`}
                </TableCell>
                <TableCell style={styles.cell as any} />
            </TableRow>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        LastYearOfLastPeriod: Reducers.getLastYear(state.homeLoan)
    };
};

export default connect(mapStateToProps, {})(PeriodEndView);