import {
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

import {Types} from 'mongoose';

import fightType from '../../types/fight';
import getProjection from '../../get-projection';
import fightModel from '../../../models/fight';

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

    return fightModel.findOne().where({peleaId: peleaId.id}).select(projection).exec();
  }
};
