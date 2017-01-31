import {
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType
} from 'graphql';

import GraphQLDate from 'graphql-date';

import fightType from '../types/fight';
import fighterType from '../types/fighter';
import rankType from '../types/rank';
import rivalType from '../types/rival';

import {Types} from 'mongoose';

//import getProjection from '../../get-projection';
import Fight from '../../models/fight';
import Fighter from '../../models/fight';
import Rival from '../../models/rival';
import Rank  from '../../models/rank';

function getCollectionValue(model, qry, column){
    return new Promise((resolve, reject)=>{
        model.findOne().where(qry).exec((err,data) =>{
            if (err) reject(err)
              else {
                  if (data)
                     resolve(data[column]);
                  else 
                     reject(null);
              }
        });
   });
}

//var RivalAdd = {
export default {
    type: rivalType,
    description: "Add a rival",
    args: {

//peleaId: { type: Number, index: true },
        fecha: { name: 'Fecha', type: new GraphQLNonNull(GraphQLDate)},        
        char1Name: { name: 'char1Name', type: new GraphQLNonNull(GraphQLString)},
        char2Name: { name: 'char2Name', type: GraphQLString},
        rivalName: { name: 'Rival', type: new GraphQLNonNull(GraphQLString)},
        puntos: { name: 'Puntos', type: new GraphQLNonNull(GraphQLInt)},
        promoBattle: { name: 'promoBattle', type: GraphQLString}, 
        demoBattle: { name: 'demoBattle', type: GraphQLString}, 
        //promoted: { name: 'promoted', type: GraphQLString}, 
        //demoted: { name: 'demoted', type: GraphQLString},
        rivalRank1: { name: 'rivalRank1', type: new GraphQLNonNull(GraphQLString)},
        rivalRank2: { name: 'rivalRank2', type: GraphQLString},
        promoBattle2: { name: 'promoBattle2', type: GraphQLString},
        demoBattle2:  { name: 'demoBattle2', type: GraphQLString},
        rivalChar1Name:  { name: 'rival char 1 name', type: new GraphQLNonNull(GraphQLString)},
        rivalChar2Name: { name: 'rival char 2 name', type: GraphQLString},
        //promoted2: { type: String},
        //demoted2: { type: String},
        rank1Name: { type: new GraphQLNonNull(GraphQLString)},
        rank2Name: { type: GraphQLString}

    },
    resolve: (root, args) => {
        debugger;
                
        return new Promise((resolve, reject)=>{

            var isPromo1 = args.promoBattle || 'N';
            var isPromo2 = args.promoBattle2 || 'N';
            var isDemoBattle1 = args.demoBattle || 'N';
            var isDemoBattle2 = args.demoBattle2 || 'N';            
            
            var isPromoted1 = (isPromo1 && args.puntos > 5) ? 'S': 'N';
            var isPromoted2 = (isPromo2 && args.puntos > 5) ? 'S': 'N';
            var isDemoted1 = (isDemoBattle1 && args.puntos == 5) ? 'S': 'N';
            var isDemoted2 = (isDemoBattle2 && args.puntos == 5) ? 'S': 'N';
            
            var char1Id = -1, char2Id = -1, rivalChar1Id = -1, rivalChar2Id = -1
            var rivalId = -1;
            var rivalRank1Id = -1;
            var rivalRank2Id = -1;
            var rank1Id = -1, rank2Id = -1;

            debugger;
            getCollectionValue(Fighter,{ abbreviation: args.char1Name }, 'charId')
             .then((value)=> {char1Id = value})
             .catch((err)=> reject(err))

            if (args.char2Name){
                getCollectionValue(Fighter,{ abbreviation: args.char2Name }, 'charId')
                .then((value)=> {char2Id = value})
                .catch((err)=> reject(err))
            }

            getCollectionValue(Fighter,{ abbreviation: args.rivalChar1Name }, 'charId')
             .then((value)=> {rivalChar1Id = value})
             .catch((err)=> reject(err))

            if (args.rivalChar2Name){
                getCollectionValue(Fighter,{ abbreviation: args.rivalChar2Name }, 'charId')
                .then((value)=> {rivalChar2Id = value})
                .catch((err)=> reject(err))
            }
            
            getCollectionValue(Rank, {abbreviation: args.rivalRank1}, 'rankId')
             .then((value)=> {rivalRank1Id = value})
             .catch((err)=> reject(err))
            
            if (args.rivalRank2){
                getCollectionValue(Rank, {abbreviation: args.rivalRank2}, 'rankId')
                .then((value)=> {rivalRank2Id = value})
                .catch((err)=> reject(err))                    
            }

            getCollectionValue(Rank, {abbreviation: args.rank1Name}, 'rankId')
             .then((value)=> {rank1Id = value})
             .catch((err)=> reject(err))

            if (args.rank2Name){
                getCollectionValue(Rank, {abbreviation: args.rank2Name}, 'rankId')
                 .then((value)=> {rank2Id = value})
                 .catch((err)=> reject(err))
            }

            Rival.findOne().where({psn: args.rivalName}).exec((err, objRival)=>{
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

                            rivalId = lastRival.rivalId + 1;
                              
                            console.log("lastRival: " + JSON.stringify(lastRival));

                            var newRival = new Rival({
                                            rivalId: rivalId,
                                            psn: args.rivalName,
                                            rank1id: rivalRank1Id,
                                            char1Id: rivalChar1Id,
                                            rank2id: rivalRank2Id,
                                            char2Id: rivalChar2Id
                                        });

                            newRival.save(function (err) {
                                    if (err) reject(err);
                                    //else resolve(newRival)
                                })
                        });


                    }
                    else {
                       rivalId = objRival.rivalId;
                    }
                      
                }
            })

            //var char1Id = -1, char2Id = -1, rivalChar1Id = -1, rivalChar2Id = -1
            if (rivalId == -1)
              reject("error asign rivalid");
            else if (char1Id == -1)
              reject("error asign char1Id");
            else if (rivalChar1Id == -1)
              reject ("error asign rival char1 id");
            else if (rank1Id == -1)
              reject("error asing rank1 id");

             Fight.findOne({}).sort({peleaId:-1}).exec((innerErr,lastFight)=>{
                if (innerErr) 
                   reject(innerErr);
                else {
                    var newFight = new Fight(
                        {
                            peleaId: lastFight.peleaId + 1,
                            fecha:   args.fecha, 
                            char1Id: char1Id,
                            char2Id: (char2Id != -1)? char2Id: null,
                            rivalId: rivalId, 
                            puntos:  args.puntos,
                            promoBattle: isPromo1, 
                            demoBattle:  isDemoBattle1, 
                            promoted: isPromoted1, 
                            demoted: isDemoted1,
                            rivalRank1: rivalRank1Id,
                            rivalRank2: (rivalRank2Id != -1) ? rivalRank1Id: null,
                            promoBattle2: isPromo2,
                            demoBattle2:  isDemoBattle2,
                            rivalChar1Id:  rivalChar1Id,
                            rivalChar2Id:  (rivalChar2Id != -1) ? rivalChar2Id: null,
                            promoted2: isPromoted2,
                            demoted2: isDemoted2,
                            rank1id: rank1Id,
                            rank2id: (rank2id) ? rank2Id: null
                        }
                    );

                    newFight.save(function (err) {
                        if (err) 
                            reject(err);
                        else 
                            resolve(newFight);
                    })
                }

            });
        })
  }
}