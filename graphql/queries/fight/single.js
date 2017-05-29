import {
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

import {Types} from 'mongoose';

import fightType from '../../types/fight';
import fighterType from '../../types/fighter';
import getProjection from '../../get-projection';
import fightModel from '../../../models/fight';

//GraphQLSchema.Query.Fight
export default {
  type: fightType,
  args: {
    id: {
      name: 'peleaId',
      type:  GraphQLInt
    }
  },
  resolve (root, params, source, fieldASTs) {
    const projection = getProjection(fieldASTs);

    return fightModel.findOne().where({peleaId: params.id}).select(projection).exec();
  },
  getFighterName(params){
    debugger;
    
  }
};
