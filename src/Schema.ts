import { schema } from 'normalizr';

export module Schemas {
    const period = new schema.Entity('entities');
  
    export const arrayOfPeriod = new schema.Array(period);
}