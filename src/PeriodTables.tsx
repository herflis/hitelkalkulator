import * as React from 'react';
import PeriodView from './PeriodView';

export const PeriodTables = ({ periods }) => {
    return (
        periods.ids.map(id =>
            <PeriodView key={id} period={periods.entities[id]} />
        )
    );
};