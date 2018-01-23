import * as React from 'react';
import { connect } from 'react-redux';
import { Reducers } from './Reducers';
import { TableRow, TableCell } from 'material-ui/Table';
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

interface SummaryRowProps {
    allRepayment: number;
    allLtp: number;
}

class SummaryRow extends React.Component<SummaryRowProps, {}> {
    render() {
        const { allRepayment, allLtp } = this.props;
        return (
            <TableRow>
                <TableCell style={styles.cellFirst as any}>
                    összesen fizetendő
                </TableCell>
                <TableCell style={styles.cell as any} />
                <TableCell style={styles.cell as any} numeric={true}>
                    <NumberFormat
                        value={allRepayment}
                        displayType={'text'}
                        thousandSeparator={' '}
                        suffix={' Ft'}
                    />
                </TableCell>
                <TableCell style={styles.cell as any} />
                <TableCell style={styles.cell as any} numeric={true}>
                    <NumberFormat
                        value={allLtp}
                        displayType={'text'}
                        thousandSeparator={' '}
                        suffix={' Ft'}
                    />
                </TableCell>
            </TableRow>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allRepayment: Reducers.getallRepayment(state.homeLoan),
        allLtp: Reducers.getallLtp(state.homeLoan)
    };
};

export default connect(mapStateToProps, {})(SummaryRow);