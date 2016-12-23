var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var graphql = require('graphql');
var GraphQLObjectType = graphql.GraphQLObjectType;
var GraphQLBoolean = graphql.GraphQLBoolean;
var GraphQLID = graphql.GraphQLID;
var GraphQLString = graphql.GraphQLString;
var GraphQLFloat = graphql.GraphQLFloat;
var GraphQLList = graphql.GraphQLList;
var GraphQLNonNull = graphql.GraphQLNonNull;
var GraphQLSchema = graphql.GraphQLSchema

var peleadoresSchema = new Schema(
  {
  	_id: Schema.Types.ObjectId,  	
  	charId: { type: Number, index: true },
  	name: { type: String },
  	rankPoints: { type: Number},
  	image: { type: String} ,
  	shortname: { type: String},
  	abbreviation: { type: String}
  }
);

var rivalesSchema = new Schema(
  {
  	_id: Schema.Types.ObjectId,  	
  	rivalId: { type: Number, index: true },
  	psn: { type: String},
  	rank1id: { type: Number},
  	rank2id: { type: Number},
  	char1Id: { type: Number},
  	char2Id: { type: Number}
  }
);

var rangosSchema = new Schema(
	 {
	 	_id: Schema.Types.ObjectId,
	 	rankId: { type: Number, index: true },
	 	nombre: { type: String },
	 	orden: { type: Number},
	 	category: { type: String}, 
	 	abbreviation: { type: String }
	 }
);

var Peleadores = mongoose.model('Peleadores', peleadoresSchema);
var Rivales = mongoose.model('Rivales', rivalesSchema);
var Rangos = mongoose.model('Rangos', rangosSchema);

// mongoose.connect(process.env.COMPOSE_URI || COMPOSE_URI_DEFAULT, function (error) {
//   if (error) console.error(error)
//   else console.log('mongo connected')
// })


var PeleadorType = new GraphQLObjectType({
  name: 'peleador',
  fields: () => ({
    charId: {
      type: GraphQLID,
      description: 'Peleador id'
    },
    name: {
      type: GraphQLString,
      description: 'Peleador Name'
    }, 
    rankPoints: {
      type: GraphQLFloat,
      description: 'Rank Points for promotion'
    },
    image: {
      type: GraphQLString,
      description: 'Image filename'
    },
    shortname: {
      type: GraphQLString,
      description: 'Peleador shortName'
    }, 
    abbreviation: {
      type: GraphQLString,
      description: 'Peleador name abbreviation'    	
    }
  })
})


var promiseListAllPeleadores = () => {
  return new Promise((resolve, reject) => {
    Peleadores.find((err, peleadores) => {
      if (err) reject(err)
      else resolve(peleadores)
    })
  })
}

var QueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    peleadores: {
      type: new GraphQLList(PeleadorType),
      resolve: () => {
        return promiseListAllPeleadores()
      }
    }
  })
})

module.exports = new GraphQLSchema({
   query: QueryType
  }  //,mutation: MutationType}
);
