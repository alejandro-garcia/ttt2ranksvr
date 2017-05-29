import mongoose from 'mongoose';
import fighter from './models/fighter';
import rank from './models/rank';
import rival from './models/rival';
import fight from './models/fight';
import { DataReader } from 'buffered-reader';
//var reader = require ("buffered-reader");
//var DataReader = reader.DataReader;
//var objRival = rival;
var objFighter = fighter;
var lines = [];
var fightData = [];
var rowData = {};
var newRivals = [];
var lastRivalId = -1;
var lastFightId = -1;
var peleador1 = -1;
var peleador2 = -1;
var dtValue = null;

String.prototype.ltrim = function( chars ) {
    chars = chars || "\\s*";
    return this.replace( new RegExp("^[" + chars + "]+", "g"), "" );
}

String.prototype.rtrim = function( chars ) {
    chars = chars || "\\s*";
    return this.replace( new RegExp("[" + chars + "]+$", "g"), "" );
}

function uniques(arr) {
    var a = [];
    for (var i = 0, l = arr.length; i < l; i++)
        if (a.indexOf(arr[i]) === -1 && arr[i] !== '')
            a.push(arr[i]);
    return a;
}
//mongoose.Promise = global.Promise;

//mongoose.connect('mongodb://localhost/ttt2ranks', function(err, res) {  
var connOpt= { server: { reconnectTries: Number.MAX_VALUE } };
//mongoose.connect('mongodb://localhost/ttt2ranks',connOpt,function(err, res){
mongoose.connect('mongodb://localhost/ttt2ranks',connOpt)
.then(()=>{
  //  if(err) {
  //    console.log('ERROR: connecting to Database. ' + err);
  //  }
  //  else {
       debugger;
       console.log('app.js -- mongo connected');

     //   console.log ("probando query contra mongoose");
     
        var fighterList = [];
        var rankList = [];
        var rivalList = [];
        //var objRival = rival;
        var lnIdx = -1;

        function validarRank(rank)
        {
            var result = false;

            //rank = FormatearRango(rank);            
            result = rankList.some(x=>{ return x.abbreviation.toLowerCase() == rank || x.nombre.toLowerCase() == rank});

            return result; 
        }        

        function getFighterId(nombre){
           if (!fighterList || (fighterList && fighterList.length == 0)) 
           {
              console.log("la lista fighterList esta vacia");
              return -1;
           }

           if (nombre != -1){
              var items = fighterList.filter(x=> x.abbreviation == nombre);
              if (items.length > 0)
                return items[0].charId;
              else 
                return -1;      
           } else {
             return -1;
           }      
        }       

        function buscarIdRankPorNombre(nombre){          
          if (!nombre){
             debugger;
             console.log("buscarIdRankPorNombre, el parametro nombre no esta definido");
             return -1;
          }
          
           if (!rankList || (rankList && rankList.length == 0))
           {
              console.log("la lista rankList esta vacia");
              return -1;
           }

           if (nombre != -1){             
              var items = rankList.filter(x=> {return x.abbreviation == nombre});
              if (items.length > 0)
                return items[0].rankId;
              else 
                return -1;
           } else {
             return -1;
           }
           
        }

        function esPeleaRango(tipo, datosPelea, luchador1, luchador2){
            var result = [false, false];

            var tipoRank = (tipo == 1) ? "ascenso" : "descenso";

            if (datosPelea.indexOf("(") != -1 && datosPelea.toLowerCase().indexOf(tipoRank) != -1)
            {               
                //debugger;            
                var temp = datosPelea.split(":");
                temp = temp[1].ltrim().split(" ")[0].split(",");                
                //temp = temp[0].Split(")".ToCharArray(), StringSplitOptions.RemoveEmptyEntries);

                var idPeleador1, idPeleador2;

                if (temp[0].indexOf("ambos") == -1){
                
                    idPeleador1 = getFighterId(temp[0].replace(")","").replace(";",""));

                    if (idPeleador1 != 0)
                    {
                        if (idPeleador1 == luchador1)
                            result[0] = true;
                        else if (idPeleador1 == luchador2)
                            result[1] = true; 
                    }

                    if (temp.length == 2 && (temp[1].indexOf(")") != -1 || temp[1].indexOf(";") != -1))
                    {
                        idPeleador2 = getFighterId(temp[1].split(";")[0].replace(")",""));

                        if (idPeleador2 == luchador1)
                            result[0] = true;
                        else if (idPeleador2 == luchador2)
                            result[1] = true; 
                    }
                }
                else {
                  result[0] = true;
                  result[1] = true;
                }
                
                if (result[0] == false && result[1] == false)
                  debugger;
                //debugger;
            }
            
            return result; 
        }
  
      function validateRival(nombre,rank1,rank2,char1,char2){
        return new Promise((resolve, reject)=>{
          if (!nombre){
            console.log("nombre no tiene valor");
            reject();
          }

          //objRival.find(jsonParams).limit(1).exec((err, value)=>{
              //  if (err){
              //     debugger; 
              //     console.log ("error: " + err);
              //     callBack(null);
              //  }
          //if (!rivalList.some(e=> e.psn == nombre)){
          var rivalItems = rivalList.filter(e=>e.psn == nombre);                    
          if (!rivalItems || (rivalItems && rivalItems.length == 0)){
              
              if (newRivals.length == 0 || !newRivals.some(f=>f.psn == nombre))
              {
                lastRivalId++;
                newRivals.push({
                  'rivalId': lastRivalId,
                  'psn': nombre,
                  'rank1id':rank1,
                  'rank2id':rank2,
                  'char1Id':char1,
                  'char2Id':char2
                });
                resolve(lastRivalId);
              } else {
                //debugger;
                var existsRivalId = newRivals.filter(f=>f.psn == nombre)[0].rivalId;
                resolve(existsRivalId);
              }
          } else {            
            resolve(rivalItems[0].rivalId);
          }
        });
      }


      function processFile(){            
         return new Promise((resolve, reject)=>{
           function readNext(){
              lnIdx++;
              if (lnIdx >= lines.length){
                resolve();
                return;
              }

              var pelea = lines[lnIdx];

              if (pelea.indexOf("***") != -1){
                  //debugger;
                  var dateVar =  pelea.split(" ")[1].split("/");
                  dtValue = new Date( dateVar[2], dateVar[1]-1, dateVar[0]);
                  if (dtValue){
                    rowData = {};
                    //rowData.fecha = dtValue;
                  }
                  readNext(); 
                  return;
                } else if (pelea.indexOf("###") != -1){
                  if (pelea.indexOf("/") != -1){
                      var peleadores = pelea.split(" ")[1];                        
                  
                      //var promises = [];

                      peleador1 = getFighterId(peleadores.split("/")[0]);
                      peleador2 = getFighterId(peleadores.split("/")[1]);
                  
                      readNext();  
                      return;              
                  } else {
                    readNext();
                    return;
                  }
                } else if (pelea.indexOf("--") == 0){
                  readNext();
                  return;
                } else if (!pelea){
                  readNext();
                  return;
                }

                    if (pelea.indexOf("###") != -1){
                      //bugfix
                      readNext();
                      return;
                    }                      

                    var datosPelea = pelea.split(",");
                    if (datosPelea.length == 0){
                        readNext();
                        return;
                    }
                    

                    var rivalNombre = datosPelea[0];

                    var rivalRank1 = datosPelea[1];
                    var rivalRank1Id = buscarIdRankPorNombre(rivalRank1);
                    var rivalRank2Id = -1;
                    var rivalChar1 = -1;
                    var rivalChar2 = -1;

                    var rivalRank2 = -1;
                    var puntos = 0;

                    if (validarRank(datosPelea[2]))
                    {
                        if (datosPelea.length >= 6){
                          rivalRank2 = datosPelea[2];
                          rivalRank2Id = buscarIdRankPorNombre(rivalRank2);
                          rivalChar1 = getFighterId(datosPelea[3]);
                          rivalChar2 = getFighterId(datosPelea[4]);
                          puntos = Number(datosPelea[5].split ("(")[0]);
                        } else {
                          debugger;
                          console.log("error en la linea " + lnIdx + ", datos: " + JSON.stringify(datosPelea));
                        }
                    }
                    else{
                        if (datosPelea.length >= 4){
                           rivalChar1 = getFighterId(datosPelea[2]);
                           puntos = Number(datosPelea[3].split ("(")[0]);
                        } else {
                          debugger;
                          console.log("error en la linea " + lnIdx + ", datos: " + JSON.stringify(datosPelea));
                        }
                    }

                    rowData.peleaId = -1;
                    rowData.fecha = dtValue;
                    rowData.char1Id = peleador1;
                    rowData.char2Id = peleador2;                                        
                    rowData.rivalId = -1;
                    rowData.rivalRank1 = rivalRank1Id;
                    rowData.rivalRank2 = rivalRank2Id;
                    rowData.rivalChar1Id = rivalChar1;
                    rowData.rivalChar2Id = rivalChar2;
                    rowData.puntos = puntos;                  
                                  
                    validateRival(rivalNombre).then(rivalData => {
                        if (!rivalData){
                          console.log("rivalData es null");
                          readNext();
                          return;
                        }

                        rowData.peleaId = ++lastFightId;
                        rowData.rivalId = rivalData;

                        var esAscenso = esPeleaRango(1, pelea, rowData.char1Id, rowData.char2Id);
                        var esDescenso = esPeleaRango(2, pelea, rowData.char1Id, rowData.char2Id);

                        rowData.promoBattle= esAscenso[0] ? "Y" : "N";
                        rowData.demoBattle= esDescenso[0] ? "Y" : "N";
                        rowData.promoBattle2=  esAscenso[1] ? "Y" : "N";
                        rowData.demoBattle2= esDescenso[1] ? "Y" : "N";

                        //debugger;
                        fightData.push(rowData);
                        rowData={};

                        readNext();
                        return;
                    })
                    .catch(validateRivalErr =>{
                       debugger;
                       console.log("error promesa validateRival..." + validateRivalErr);
                       readNext();
                       return;
                    })
           }

           readNext(); //init recursive calls.
         })
      } //function processFile

      function bulkSaveRivals(){
        debugger;
        return new Promise((resolve, reject)=> {
           if (!newRivals || (newRivals && newRivals.length == 0)){
             resolve(["empty array"]);
             return;
           }
          
          rival.insertMany(newRivals)
            .then((insertData)=>{
               debugger;
               resolve();
             }
            )
            .catch(err=> {
              debugger; 
              console.log("bulkSaveRival error... " + err);
              reject(err)
            })

          //  var idxRival = -1;
           
          //  function nextRival(){
          //     if (++idxRival == newRivals.length)
          //        resolve();                                                   
          //  }
        })
      }

      function bulkSaveFights(){
        debugger;
        return new Promise((resolve, reject)=> {
          if (!fightData || (fightData && fightData.length == 0))
             reject("empty array");
            
          fight.insertMany(fightData)
             .then((inserted)=>{
                debugger;
                resolve();
             })
             .catch(err=>{
               debugger; 
               console.log("bulkSaveFights error... " + err);
               reject(err);
             })
          
        });
      }

        var promesas = []; 
        promesas.push (new Promise((resolve,reject)=>{
           objFighter.find().exec()
          .then(value=>{
            console.log("resultado consulta fighters...");
            console.log(JSON.stringify(value)); 

            fighterList = value.map(x=> { return { "abbreviation": x.abbreviation, "charId": x.charId } });            
            resolve();
            //processFile();
          })
          .catch(mErr => {
            console.log("error consulta mongo: " + mErr);
            reject();
          })
        }));

        promesas.push (new Promise((resolve,reject)=>{
          rank.find().exec()
            .then(value=>{
              console.log("resultado consulta ranks...");
              console.log(JSON.stringify(value)); 
              rankList = value.map(x=> { return { "abbreviation": x.abbreviation, 
                                                  "nombre": x.nombre,
                                                  "rankId": x.rankId } 
                                  });
              resolve();
            })
            .catch(mErr => {
              console.log("error consulta mongo: " + mErr);
              reject();
            })
        }));

        promesas.push (new Promise((resolve,reject)=>{
          rival.find().exec()
            .then(value=>{
              console.log("resultado consulta rivals...");
              console.log(JSON.stringify(value)); 
              rivalList = value.map(x=> { return { "psn": x.psn,
                                                   "rivalId": x.rivalId } 
                                  });
              resolve();
            })
            .catch(mErr => {
              console.log("error consulta mongo: " + mErr);
              reject();
            })
        }));

        promesas.push(new Promise((resolve,reject)=>{
          rival.find().sort({rivalId:-1}).limit(1).exec()
            .then(value => { 
                lastRivalId = value[0].rivalId;
                resolve();
             }            
            )
            .catch(err=>reject(err));
        }));


        promesas.push(new Promise((resolve,reject)=>{
          fight.find().sort({peleaId:-1}).limit(1).exec()
            .then(value=>{
               lastFightId = value[0].peleaId;
               resolve();
            })
            .catch(err=>reject(err));
        }));


        promesas.push( new Promise((resolve,reject)=>{
            var filePath = "/home/alejandro/Documentos/peleas.txt"
            var fs = require('fs');

            fs.readFile(filePath, 'utf8', function(err, data) {
              if (err){
                console.log("error: " + err);
                reject(err);
                //throw err;
              } 

              console.log('OK: ' + filePath);
              //console.log(data)

              lines = data.split(/\r?\n/);            

              if (!lines || (lines && lines.length == 0))
              {
                  console.log("el objeto lines esta vacio");
                  reject();
              } else {
                debugger;
                resolve();
              }
            });
        }));



        // promesas.push (new Promise((resolve)=>{
        //    rival.findOne({'psn': 'mococa47'}).exec()
        //   .then(value=>{
        //     debugger;
        //     console.log("resultado consulta rivals...");
        //     console.log(JSON.stringify(value)); 

        //     //fighterList = value.map(x=> { return { "abbreviation": x.abbreviation, "charId": x.charId } });            
        //     resolve();
        //     //processFile();
        //   })
        //   .catch(mErr => {
        //     debugger;
        //     console.log("error consulta mongo: " + mErr);
        //     resolve();
        //   })
        // }));


        Promise.all(promesas).then(()=>{
          debugger;
          processFile()
            .then(()=>{
                debugger;
                bulkSaveRivals()
                  .then(()=>{
                     bulkSaveFights().
                       then(()=>{
                         debugger;
                         console.log("completada la insercion de registros de peleas");                         
                       })
                       .catch(err=>{
                         debugger;
                         console.log("error en la insercion de peleas");                         
                       })
                    })
                    .catch(err=>{
                      debugger; 
                      console.log("error en la insercion de rivales");
                    })

            })
            .catch(errProcess=>{
              debugger; 
              console.log("error en promise processFile " + errProcess);
            })
        })
        .catch(errInit=>{
          console.log("error en promesa inicial: " + errInit);          
        });
   //}
})
.catch(err=>{
    debugger;
    console.log('ERROR: connecting to Database. ' + err);
})


// var newRival = new rival({
//     'rivalId': newId,
//     'psn': rivalNombre,
//     'rank1id': rivalRank1Id,
//     'rank2id': rivalRank2Id,
//     'char1Id': rivalChar1,
//     'char2Id': rivalChar2
// });
// newRival.save()
//   .then((newValue)=>{
//       debugger;
//       callBack(newId);
//       //resolve(newId);
//   })
//   .catch(insertErr => {
//     debugger;
//     console.log("error insertando los datos del rival... " + insertErr);
//     callBack(null);
//     //resolve(-1);
//   })


// fight.find().sort({peleaId: -1}).limit(1).exec()
//   .then(fightValue=>{
//       debugger;
//       rowData.peleaId = fightValue.peleaId + 1;

//       var esAscenso = esPeleaRango(1, pelea, rowData.char1Id, rowData.char2Id);
//       var esDescenso = esPeleaRango(2, pelea, rowData.char1Id, rowData.char2Id);

//       var newFight = new fight({
//         peleaId: rowData.peleaId,
//         fecha: rowData.fecha,
//         char1Id: rowData.char1Id,
//         char2Id: rowData.char2Id,
//         rivalId: rowData.rivalId,
//         puntos: rowData.puntos,
//         promoBattle: esAscenso[0] ? "Y" : "N",
//         demoBattle: esDescenso[0] ? "Y" : "N",
//         rivalRank1: rowData.rivalRank1,
//         rivalRank2: rowData.rivalRank2,
//         promoBattle2: esAscenso[1] ? "Y" : "N",
//         demoBattle2: esDescenso[1] ? "Y" : "N",
//         rivalChar1Id: rowData.rivalChar1Id, 
//         rivalChar2Id: rowData.rivalChar2Id
//       });

//       newFight.save()
//         .then(newReg=>{
//           debugger;
//           console.log("se inserto nuevo registro en fights..." + JSON.stringify(newReg));
//           readNext();
//         })
//         .catch(saveErr=>{
//           debugger;
//           console.log("error insertando la pelea..." + saveErr);
//           readNext();
//         })

//       //resolve();
//   })
//   .catch(fightErr=>{
//       debugger;
//       console.log("error obteniendo la ultima pelea de la bd..." + fightErr);
//       //reject();
//       readNext();
//   })