import {
  GraphQLList,
  GraphQLInt,
  GraphQLString
} from 'graphql';

import GraphQLDate from 'graphql-date';
import fightType from '../../types/fight';
import getProjection from '../../get-projection';
import fightModel from '../../../models/fight';
import moment from 'moment';

export default {
  type: new GraphQLList(fightType),
  args: {
     fecha: {
       type: GraphQLDate      
     },
     rival: {
       type: GraphQLInt
     }
   },
  resolve (root, params, source, fieldASTs) {
    //debugger;
    //const projection = getProjection(options.fieldASTs[0]);

    const projection = getProjection(fieldASTs);

    if (!params || (params && (!params.fecha && !params.rival))){      
      console.log("params es null o undefined");

       return fightModel
         .find()
         .select(projection)
         .exec();
     } else if (params.fecha){
      console.log("valor de params: " + JSON.stringify(params));
      var fechaIni = moment(params.fecha).subtract(1, "days").toDate();      
      var fechaFin = moment(params.fecha).add(1, "days").toDate();

       return fightModel    
         .find()
         .where({fecha: {$gt: fechaIni, $lt: fechaFin}})
         .select(projection)
         .exec();
    } else 
    {
      return fightModel    
         .find()
         .where({rivalId: params.rival})
         .select(projection)
         .exec();
    }
  }
};
