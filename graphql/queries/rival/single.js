import {
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull
} from 'graphql';

import {Types} from 'mongoose';

import rivalType from '../../types/rival';
import getProjection from '../../get-projection';
import rivalModel from '../../../models/rival';

export default {
  type: rivalType,
  args: {
    id: {
      name: 'rivalId',
      type: new GraphQLNonNull(GraphQLInt)
    }
  },
  resolve (root, params, options, fieldASTs) {
    const projection = getProjection(fieldASTs);

    return rivalModel
      .findOne()
      .where({rivalId: params.id})
      .select(projection)
      .exec();
  }
};
