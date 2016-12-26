import {
  GraphQLList,
  GraphQLInt,
  GraphQLID,
  GraphQLNonNull
} from 'graphql';

import {Types} from 'mongoose';

import rankType from '../../types/rank';
import getProjection from '../../get-projection';
import rankModel from '../../../models/rank';

export default {
  type: rankType,
  args: {
    id: {
      name: 'rankId',
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  resolve (root, params, options, fieldASTs) {
    const projection = getProjection(fieldASTs);

    return rankModel
      .findOne()
      .where({rankId: params.id})
      .select(projection)
      .exec();
  }
};
