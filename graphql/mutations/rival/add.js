import {
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType
} from 'graphql';

import rivalType from '../types/rival';
import {Types} from 'mongoose';

//import getProjection from '../../get-projection';
import Rival from '../../models/rival';

//var RivalAdd = {
export default {
    type: rivalType,
    description: "Add a rival",
    args: {
        psn: {
            name: 'PSN',
            type:  new GraphQLNonNull(GraphQLString)
        },
        rank1id: {
            name: 'id of rank 1',
            type: new GraphQLNonNull(GraphQLInt)
        },
        char1Id: {
            name:'id of character 1',
            type: new GraphQLNonNull(GraphQLInt)
        },
        rank2id: {
            name: 'id of rank 2',
            type: GraphQLInt
        },
        char2Id: {
            name:'id of character 2',
            type: GraphQLInt
        }

    },
    resolve: (root, args) => {
        debugger;
                
        return new Promise((resolve, reject)=>{
           
            Rival.findOne().where({psn: args.psn}).exec((err, objRival)=>{
                if (err) reject(err)
                else{
                    if (!objRival){                        
                        //Rival.findOne( {$query:{}, $orderby:{rivalId:-1}} ).exec((innerErr,lastRival)=>{
                        Rival.findOne({}).sort({rivalId:-1}).exec((innerErr,lastRival)=>{
                            if (innerErr){
                                reject(innerErr);
                            } else if (!lastRival){
                                reject("lastRival is null");
                            }
                              
                            console.log("lastRival: " + JSON.stringify(lastRival));

                            var newRival = new Rival({
                                            rivalId: (lastRival.rivalId + 1),
                                            psn: args.psn,
                                            rank1id: args.rank1id,
                                            char1Id: args.char1Id,
                                            rank2id: args.rank2id,
                                            char2Id: args.char2Id
                                        });

                            newRival.save(function (err) {
                                    if (err) reject(err)
                                    else resolve(newRival)
                                })
                        });


                    }
                    else 
                      reject(objRival);
                }
            });
        })
        // .then((insertedRival)=> {
        //     console.log("id: " + insertedRival._id);
        //     return insertedRival 
        // })
        // .catch(()=> null);
  }
}

// export default new GraphQLObjectType({
//   name: 'Mutation',
//   fields: {
//     add: RivalAdd
//   }
// });