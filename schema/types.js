const EmployeeType = new GraphQLObjectType({
  name: 'Employee',
  fields: ( ) => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      age: { type: GraphQLInt },
  })
});
const LocationType = new GraphQLObjectType({
  name: 'Location',
  fields: ( ) => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
  })
});
const LocationType = new GraphQLObjectType({
  name: 'Location',
  fields: ( ) => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
  })
});
const IncidentType = new GraphQLObjectType({
  name: 'Incident',
  fields: ( ) => ({
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      date: { type: GraphQLObjectType },
      category: { type: GraphQLString },
      location: { type: GraphQLString },
      status: { type: GraphQLString },
      employee: {
          type: EmployeeType,
          resolve(parent, args){
              return Employee.findById(parent.employeeId);
          }
      }
  })
});