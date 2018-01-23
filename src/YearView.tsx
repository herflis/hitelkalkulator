import * as React from 'react';
import { TableRow, TableCell } from 'material-ui/Table';
import * as NumberFormat from 'react-number-format';

import { Year } from './Year';

const styles = {
    cellFirst: {
    },
    cell: {
        textAlign: 'right'
    },
    input: {
        width: 80,
        marginRight: '5%',
        padding: '10px 5px',
        border: 0,
        textAlign: 'right'
    }
};

interface YearViewProps {
    year: Year;
    periodId: number;
    changeRepayment: Function;
    changeAssets: Function;
}

export class YearView extends React.Component<YearViewProps, { periodRepayment: number }> {
    constructor(props) {
        super(props);
        this.state = {
            periodRepayment: 0
        };
    }
    render() {
        const { year, changeRepayment, periodId, changeAssets } = this.props;
        return (
            <TableRow>
                <TableCell style={styles.cellFirst}>{`${year.number}. év`}</TableCell>
                <TableCell numeric={true} style={styles.cell}>
                    <NumberFormat
                        value={year.assets}
                        thousandSeparator={' '}
                        onChange={e => changeAssets(e, periodId, year.number)}
                        style={styles.input}
                    /> Ft
                    </TableCell>
                <TableCell numeric={true} style={styles.cell}>
                    <NumberFormat
                        value={year.repayment}
                        thousandSeparator={' '}
                        onChange={e => changeRepayment(e, periodId)}
                        style={styles.input}
                    /> Ft
                </TableCell>
                <TableCell style={styles.cell} />
                <TableCell numeric={true} style={styles.cell}>
                    <NumberFormat
                        value={`${year.ltp} Ft`}
                        displayType={'text'}
                        thousandSeparator={' '}
                        suffix={' Ft'}
                    />
                </TableCell>
            </TableRow >
        );
    }
}