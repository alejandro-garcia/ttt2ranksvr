import {
  GraphQLList
} from 'graphql';

import rivalType from '../../types/rival';
import getProjection from '../../get-projection';
import rivalModel from '../../../models/rival';

export default {
  type: new GraphQLList(rivalType),
  args: {},
  resolve (root, params, options, fieldASTs) {        
    const projection = getProjection(fieldASTs);

    return rivalModel
      .find()
      .select(projection)
      .exec();
  }
};
