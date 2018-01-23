import * as React from 'react';
import { connect } from 'react-redux';
import { Actions } from './Actions';
import { Reducers } from './Reducers';
import { TableRow, TableCell } from 'material-ui/Table';
import * as NumberFormat from 'react-number-format';

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

interface StartingRowProps {
    startingBalance: number;
    setBalance: Function;
}

class StartingRow extends React.Component<StartingRowProps, {}> {
    render() {
        const { startingBalance, setBalance } = this.props;
        return (
            <TableRow>
                <TableCell style={styles.cellFirst} />
                <TableCell numeric={true} style={styles.cell}>
                    <NumberFormat
                        value={startingBalance}
                        thousandSeparator={' '}
                        onChange={e => setBalance(Number(e.target.value.replace(/ /g, '')))}
                        style={styles.input}
                    /> Ft
                </TableCell>
                <TableCell numeric={true} style={styles.cell} />
                <TableCell style={styles.cell} />
                <TableCell numeric={true} style={styles.cell} />
            </TableRow >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        startingBalance: Reducers.getStartingBalance(state.homeLoan)
    };
};

export default connect(mapStateToProps, {
    setBalance: Actions.SetStartingBalance
})(StartingRow);