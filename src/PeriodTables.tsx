import * as React from 'react';
import PeriodView from './PeriodView';

export const PeriodTables = ({ periods }) => {
    return (
        periods.ids.map((id, index) => 
            <PeriodView key={id} periodId={id} index={index} />
        )
    );
};