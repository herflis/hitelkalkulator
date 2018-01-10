import * as React from 'react';
import { connect } from 'react-redux';
import { TableBody } from 'material-ui/Table';
import YearView from './YearView';
import PeriodEndView from './PeriodEndView';

import { Period } from './Period';

interface PeriodViewProps {
    period: Period;
}

class PeriodView extends React.Component<PeriodViewProps, {}> {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <TableBody>
                {
                    this.props.period.years.map((year, index) =>
                        <YearView key={index} year={year} periodId={this.props.period.id} />
                    )
                }
                <PeriodEndView periodEnd={this.props.period.periodEnd} periodLength={this.props.period.length} />
            </TableBody>
        );
    }
}

const mapStateToProps = (state) => {
    return {
    };
};

export default connect(mapStateToProps, {})(PeriodView);