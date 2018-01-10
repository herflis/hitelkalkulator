import * as React from 'react';
import { connect } from 'react-redux';
import { TableRow, TableCell } from 'material-ui/Table';
import { Actions } from './Actions';

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
        border: 0
    }
};

interface YearViewProps {
    year: Year;
    periodId: number;
    ChangeRepayment: Function;
}

class YearView extends React.Component<YearViewProps, { periodRepayment: number }> {
    constructor(props) {
        super(props);
        this.state = {
            periodRepayment: 0
        };
        this.handleRepaymentChange = this.handleRepaymentChange.bind(this);
    }
    handleRepaymentChange(e) {
        this.props.ChangeRepayment(this.props.periodId, e.target.value);
        this.setState({
            periodRepayment: e.target.value
        });
    }
    render() {
        const { year } = this.props;
        return (
            <TableRow>
                <TableCell style={styles.cellFirst}>{`${year.number}. év`}</TableCell>
                <TableCell numeric={true} style={styles.cell}>{`${year.assets} Ft`}</TableCell>
                <TableCell numeric={true} style={styles.cell}>
                    <input
                        style={styles.input}
                        type="number"
                        onChange={e => this.handleRepaymentChange(e)}
                        className="no-spinners"
                        defaultValue={String(this.state.periodRepayment)}
                    /> Ft
                </TableCell>
                <TableCell style={styles.cell} />
                <TableCell numeric={true} style={styles.cell}>{`${year.ltp} Ft`}</TableCell>
            </TableRow>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps, {
    ChangeRepayment: Actions.ChangePeriodRepayment
})(YearView);