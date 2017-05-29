import {
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

import {Types} from 'mongoose';

import fighterType from '../../types/fighter';
import getProjection from '../../get-projection';
import fighterModel from '../../../models/fighter';

export default {
  type: fighterType,
  args: {
    id: {
      name: 'charId',
      type:  GraphQLInt
    }
  },
  resolve (root, params, source, fieldASTs) {
    const projection = getProjection(fieldASTs);
    debugger;    

    return fighterModel.findOne().where({charId: params.id}).select(projection).exec();

   //  return fighterModel
   //    .findById(params.id)
   //    .select(projection)
   //    .exec();
  }
};
