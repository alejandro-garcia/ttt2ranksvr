import {
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull
} from 'graphql';

import GraphQLDate from 'graphql-date';
import {Types} from 'mongoose';
import summaryType from '../../types/summary';
import getProjection from '../../get-projection';
import summaryModel from '../../../models/summary';
import moment from 'moment';

//GraphQLSchema.Query.Fight
export default {
  type: summaryType,
  args: {
     fecha: {
       type: GraphQLDate      
     },
     rival: {
       type: GraphQLInt
     }
   },
  resolve (root, params, source, fieldASTs) {
    const projection = getProjection(fieldASTs);

    debugger;
    var fechaIni = moment(params.fecha).subtract(1, "days").toDate();      
    var fechaFin = moment(params.fecha).add(1, "days").toDate();

    return summaryModel.aggregate([
      {
          $match:{fecha: 
          {$gt: fechaIni, 
           $lt: fechaFin}
      }},
      { $project: { 
            resultado: {$cond: [{$eq: [{$gt: ["$puntos",5]},true]},"win","loss"]} , _id:0 
            }
      }  
      ,{ $group: {_id: "$resultado", count: {$sum: 1}}}      
      ,{
          $project: {"wins": {$cond:[{$eq: ["$_id", "win"]},"$count",0]}, 
                     "losses": {$cond:[{$eq: ["$_id", "loss"]},"$count",0]},          
                    _id:0 }       
      }
      ,{ $group: { _id:0, fightsCount: {$sum: {$add:["$wins","$losses"]}}, wins: {$sum: "$wins"}, losses: {$sum: "$losses"}}}
      ]).exec();
      //  .then(values=>{
      //    debugger;
      //    console.log(JSON.stringify(values));
      //    return values;
      //  })

    // fightModel.find().where({fecha: {$gt: fechaIni, $lt: fechaFin}}).select().exec()
    // .then(
    //    values=>{
    //         debugger;

    //         var wins = values.filter(e=> e.puntos > 5).length;
    //         var losses = values.filter(e=> e.puntos == 5).length;

    //         var result = new Document({
    //           "date":  params.fecha,
    //           "fightsCount": wins+losses,
    //           "wins": wins,
    //           "losses": losses
    //         })
            

    //         return result;
    //       }
    // )
    // .catch(err=>{
    //     debugger;
    //     console.log("error:" + err);
    // })
  },
};