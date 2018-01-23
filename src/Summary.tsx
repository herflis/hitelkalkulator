import * as React from 'react';
import { connect } from 'react-redux';
import { Reducers } from './Reducers';
import { Actions } from './Actions';
import * as NumberFormat from 'react-number-format';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';

const styles = {
    headline: {
        display: 'block',
        marginTop: 10
    }
};

interface SummaryProps {
    allWithoutLtp: number;
    allWithLtp: number;
    savings: number;
    setAllWithoutLtp: Function;
}

class Summary extends React.Component<SummaryProps, {}> {
    constructor(props) {
        super(props);
        this.changeAll = this.changeAll.bind(this);
    }
    changeAll(e) {
        this.props.setAllWithoutLtp(Number(e.target.value.replace(/ /g, '')));
    }
    render() {
        const { allWithoutLtp, allWithLtp, savings } = this.props;
        return (
            <div>
                <Card>
                    <CardContent>
                        <Typography type="title">LTP nélkül össz visszafizetendő hitel:</Typography>
                        <NumberFormat
                            value={allWithoutLtp}
                            thousandSeparator={' '}
                            onChange={e => this.changeAll(e)}
                            customInput={TextField}
                        /> Ft
                </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography type="title">LTP-vel össz visszafizetendő hitel:</Typography>
                        <NumberFormat
                            value={allWithLtp}
                            thousandSeparator={' '}
                            displayType={'text'}
                            suffix={' Ft'}
                            style={styles.headline}
                        />
                </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography type="title">Ennyivel kevesebbet kell visszafizetni LTP-vel:</Typography>
                        <NumberFormat
                            value={savings}
                            thousandSeparator={' '}
                            displayType={'text'}
                            suffix={' Ft'}
                            style={styles.headline}
                        />
                </CardContent>
                </Card>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        allWithoutLtp: Reducers.getAllWithoutLtp(state.homeLoan),
        allWithLtp: Reducers.getAllWithLtp(state.homeLoan),
        savings: Reducers.getSavingsSummary(state.homeLoan)
    };
};

export default connect(mapStateToProps, {
    setAllWithoutLtp: Actions.SetAllWithoutLtp
})(Summary);