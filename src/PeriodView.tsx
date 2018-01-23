import * as React from 'react';
import { connect } from 'react-redux';
import { Reducers } from './Reducers';
import { Actions } from './Actions';
import { TableBody } from 'material-ui/Table';
import { YearView } from './YearView';
import StartingRow from './StartingRow';
import PeriodEndView from './PeriodEndView';

interface PeriodViewProps {
    periodId: number;
    periods: any;
    setRepaymentForPeriod: Function;
    setAssets: Function;
    index: number;
}

class PeriodView extends React.Component<PeriodViewProps, {}> {
    constructor(props) {
        super(props);
        this.changeRepayment = this.changeRepayment.bind(this);
        this.changeAssets = this.changeAssets.bind(this);
    }
    changeRepayment(e, id) {
        if (e.target.value.length > 0) {
            const val = Number(e.target.value.replace(/ /g, ''));
            this.props.setRepaymentForPeriod(val, id);
        }
    }
    changeAssets(e, id, yearnum) {
        if (e.target.value.length > 0) {
            const val = Number(e.target.value.replace(/ /g, ''));
            this.props.setAssets(val, id, yearnum);
        }
    }
    render() {
        const { periods, periodId, index } = this.props;
        return (
            <TableBody>
                {
                    index === 0 ? <StartingRow /> : null
                }
                {
                    periods.entities[periodId].years.map((year, i) =>
                        <YearView
                            key={i}
                            year={year}
                            periodId={periodId}
                            changeRepayment={this.changeRepayment}
                            changeAssets={this.changeAssets}
                        />
                    )
                }
                <PeriodEndView
                    periodId={periodId}
                />
            </TableBody>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        periods: Reducers.getPeriods(state.homeLoan)
    };
};

export default connect(mapStateToProps, {
    setRepaymentForPeriod: Actions.SetRepaymentForPeriod,
    setAssets: Actions.SetAssetsForYear
})(PeriodView);