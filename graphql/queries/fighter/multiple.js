import {
  GraphQLList
} from 'graphql';

import fighterType from '../../types/fighter';
import getProjection from '../../get-projection';
import fighterModel from '../../../models/fighter';

export default {
  type: new GraphQLList(fighterType),
  args: {},
  resolve (root, params, source, fieldASTs) {
    //debugger;
    //const projection = getProjection(options.fieldASTs[0]);

    const projection = getProjection(fieldASTs);

    return fighterModel
      .find()
      .select(projection)
      .exec();
  }
};
