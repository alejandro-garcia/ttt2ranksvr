import {
  GraphQLList
} from 'graphql';

import rankType from '../../types/rank';
import getProjection from '../../get-projection';
import rankModel from '../../../models/rank';

export default {
  type: new GraphQLList(rankType),
  args: {},
  resolve (root, params, options, fieldASTs) {
    const projection = getProjection(fieldASTs);

    return rankModel
      .find()
      .select(projection)
      .exec();
  }
};
