import {
  GraphQLList
} from 'graphql';

import fightType from '../../types/fight';
import getProjection from '../../get-projection';
import fightModel from '../../../models/fight';

export default {
  type: new GraphQLList(fightType),
  args: {},
  resolve (root, params, source, fieldASTs) {
    debugger;
    //const projection = getProjection(options.fieldASTs[0]);

    const projection = getProjection(fieldASTs);

    return fightModel
      .find()
      .select(projection)
      .exec();
  }
};
