const graphql = require('graphql')
const Incident = require('../models/incident')
const Hazard = require('../models/hazard')
const Action = require('../models/action')
const Alert = require('../models/alert')
const Employee = require('../models/employee')
const Location = require('../models/location')
const Category = require('../models/category')
const State = require('../models/state')
const Source = require('../models/source')
const Role = require('../models/role')

require('dotenv').config()

// WebPush setup
const webpush = require("web-push")
webpush.setVapidDetails(
    "mailto:virouss2014@gmail.com",
    process.env.PUSH_PUBLIC_KEY,
    process.env.PUSH_PRIVATE_KEY
)

const subscriptionManager = {"endpoint":"https://wns2-db5p.notify.windows.com/w/?token=BQYAAAB5XX2pSPfTi6y8EPDcIzc0gxe0tqJqM4kpVRizmPI3%2bvv3ZDMT2%2b13y2lrczp44ZSosnNztYs0b5M%2blBnkMxRMKWLaIkEzu9HGuxBd3znB2FMBx77INrdLwAs8S9q3gSHwQAO6P%2bmkvPFlMWTErpKy4nPKdaBleFqZPRrQqqXrKxevQIqcwBOiV1bifDhRYrAwHzkHC8s71gbVgHg%2f9y%2bHoQNDx9mpDnAVAXhhnFi5bmr5%2fuLiVz2qkHGswRUg%2fzOPotOOC5z5e8AVc6FqnZnX9wQzkOkM944EIEyPoXOLU5hyhO%2fageLJG7m8glGCWlY%3d","expirationTime":null,"keys":{"p256dh":"BIZrdfTe2T1DLP1QfvySaI4yFu_TJBNFi87T2pUZGcJjZG6V7D8qgRsrr1Jd9g020BqTHyjWJdZ8POm1PquKYBY","auth":"ZzdYqT7cWemIhxSlkYOreQ"}}
const subscriptionWorker = {"endpoint":"https://fcm.googleapis.com/fcm/send/cughVIq3Jvg:APA91bGQcg7NETavXvpVz9MiPFvwNDMrKW6UMeKxabpb4fNtYnisR6RKIagn0MYboFWit2q3FopVumSHZpu-g2W1rxFeDL0Po6MoTHKftxR5Kd4f7h8HAFSBSC2HRKRRkxzKWmSeT1E8","expirationTime":null,"keys":{"p256dh":"BM1FJMgp15L1QmUdRHYhQIiZ0M9GRhzaze7ld3IZwey39qvQHSPZYdaVQi7en9eJKGxW3NwSi8Q-XDGNZZb1gTs","auth":"boGlreD1lBofrRQqxUymXA"}}

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = graphql

const LocationType = new GraphQLObjectType({
    name: 'Location',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
    })
})
const CategoryType = new GraphQLObjectType({
    name: 'Category',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        type: { type: GraphQLString },
    })
})
const StateType = new GraphQLObjectType({
    name: 'State',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        type: { type: GraphQLString },
    })
})
const RoleType = new GraphQLObjectType({
    name: 'Role',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
    })
})
const SourceType = new GraphQLObjectType({
    name: 'Source',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
    })
})
const EmployeeType = new GraphQLObjectType({
  name: 'Employee',
  fields: ( ) => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      avatar: { type: GraphQLString },
      role: {
        type: RoleType,
        resolve(parent, args){
            return Role.findById(parent.roleId)
        }
      },
  })
})
const HazardType = new GraphQLObjectType({
    name: 'Hazard',
    fields: ( ) => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        createdBy: {
            type: EmployeeType,
            resolve(parent, args){
                return Employee.findById(parent.createdBy)
            }
        },
        location: {
            type: LocationType,
            resolve(parent, args){
                return Location.findById(parent.locationId)
            }
        },
        state: {
            type: StateType,
            resolve(parent, args){
                return State.findById(parent.stateId)
            }
        },
        source: {
            type: SourceType,
            resolve(parent, args){
                return Source.findById(parent.sourceId)
            }
        },
    })
})
const IncidentType = new GraphQLObjectType({
    name: 'Incident',
    fields: ( ) => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        location: {
            type: LocationType,
            resolve(parent, args){
                return Location.findById(parent.locationId)
            }
        },
        category: {
            type: CategoryType,
            resolve(parent, args){
                return Category.findById(parent.categoryId)
            }
        },
        createdAt: { type: GraphQLString },
        createdBy: {
            type: EmployeeType,
            resolve(parent, args){
                return Employee.findById(parent.createdBy)
            }
        },
        state: {
            type: StateType,
            resolve(parent, args){
                return State.findById(parent.stateId)
            }
        },
    })
})
const ActionType = new GraphQLObjectType({
    name: 'Action',
    fields: ( ) => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        dueDate: { type: GraphQLString },
        assignedBy: {
            type: EmployeeType,
            resolve(parent, args){
                return Employee.findById(parent.assignedBy)
            }
        },
        assignedTo: {
            type: EmployeeType,
            resolve(parent, args){
                return Employee.findById(parent.assignedTo)
            }
        },
        state: {
            type: StateType,
            resolve(parent, args){
                return State.findById(parent.stateId)
            }
        },
    })
})
const AlertType = new GraphQLObjectType({
    name: 'Alert',
    fields: ( ) => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        createdBy: {
            type: EmployeeType,
            resolve(parent, args){
                return Employee.findById(parent.createdBy)
            }
        },
        state: {
            type: StateType,
            resolve(parent, args){
                return State.findById(parent.stateId)
            }
        },
    })
})


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        incident: {
            type: IncidentType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Incident.findById(args.id)
            }
        },
        incidents: {
            type: new GraphQLList(IncidentType),
            resolve(parent, args){
                return Incident.find({})
            }
        },
        hazards: {
            type: new GraphQLList(HazardType),
            resolve(parent, args){
                return Hazard.find({})
            }
        },
        Actions: {
            type: new GraphQLList(ActionType),
            resolve(parent, args){
                return Action.find({})
            }
        },
        sources: {
            type: new GraphQLList(SourceType),
            resolve(parent, args){
                return Source.find({})
            }
        },
        employees: {
            type: new GraphQLList(EmployeeType),
            args: { role: { type: GraphQLString } },
            async resolve(parent, args){
                let query = {}
                if(args.role) { 
                    const role = await Role.findOne({name: args.role})
                    query = { roleId: role._doc._id}
                }
                return await Employee.find(query)
            }
        },
        locations: {
            type: new GraphQLList(LocationType),
            resolve(parent, args){
                return Location.find({})
            }
        },
        categories: {
            type: new GraphQLList(CategoryType),
            resolve(parent, args){
                return Category.find({})
            }
        },
        state: {
            type: new GraphQLList(StateType),
            args: { type: { type: GraphQLString } },
            resolve(parent, args){
                return State.find({type: args.type})
            }
        },
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addEmployee: {
            type: EmployeeType,
            args: {
                name: { type: GraphQLString },
                avatar: { type: GraphQLString },
                roleId: { type: GraphQLString }
            },
            resolve(parent, args){
                let employee = new Employee({
                    name: args.name,
                    avatar: args.avatar,
                    roleId: args.roleId,
                })
                return employee.save()
            }
        },
        addCategory: {
            type: CategoryType,
            args: {
                name: { type: GraphQLString },
                type: { type: GraphQLString }
            },
            resolve(parent, args){
                let category = new Category({
                    name: args.name,
                    type: args.age,
                })
                return category.save()
            }
        },
        addState: {
            type: StateType,
            args: {
                name: { type: GraphQLString },
                type: { type: GraphQLString }
            },
            resolve(parent, args){
                let state = new State({
                    name: args.name,
                    type: args.type,
                })
                return state.save()
            }
        },
        addRole: {
            type: RoleType,
            args: {
                name: { type: GraphQLString },
            },
            resolve(parent, args){
                let role = new Role({
                    name: args.name,
                })
                return role.save()
            }
        },
        addSource: {
            type: SourceType,
            args: {
                name: { type: GraphQLString },
            },
            resolve(parent, args){
                let source = new Source({
                    name: args.name,
                })
                return source.save()
            }
        },
        addLocation: {
            type: LocationType,
            args: {
                name: { type: GraphQLString },
            },
            resolve(parent, args){
                let location = new Location({
                    name: args.name,
                })
                return location.save()
            }
        },
        addIncident: {
            type: IncidentType,
            args: {
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                categoryId: { type: GraphQLString },
                locationId: { type: GraphQLString },
                createdAt: { type: GraphQLString },
                createdBy: { type: GraphQLString },
            },
            resolve(parent, args){
                let incident = new Incident({
                    title: args.title,
                    description: args.description,
                    categoryId: args.categoryId,
                    locationId: args.locationId,
                    createdAt: args.createdAt,
                    createdBy: args.createdBy,
                    stateId: "61338d74acd57f49503d01e2"
                })
                webpush.sendNotification(subscriptionManager, JSON.stringify({title: "New Incident Occurred"}))
                return incident.save()
            }
        },
        addHazard: {
            type: HazardType,
            args: {
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                locationId: { type: GraphQLString },
                createdAt: { type: GraphQLString },
                createdBy: { type: GraphQLString },
                sourceId: { type: GraphQLString },
            },
            resolve(parent, args){
                let hazard = new Hazard({
                    title: args.title,
                    description: args.description,
                    locationId: args.locationId,
                    createdAt: args.createdAt,
                    createdBy: args.createdBy,
                    sourceId: args.sourceId,
                    stateId: "61338d74acd57f49503d01e2",
                })
                webpush.sendNotification(subscriptionManager, JSON.stringify({title: "New Hazard Registred"}))
                return hazard.save()
            }
        },
        addAction: {
            type: ActionType,
            args: {
                title: { type: GraphQLString },
                description: { type: GraphQLString },
                createdAt: { type: GraphQLString },
                dueDate: { type: GraphQLString },
                assignedBy: { type: GraphQLString },
                assignedTo: { type: GraphQLString },
                sourceId: { type: GraphQLString },
            },
            resolve(parent, args){
                let action = new Action({
                    title: args.title,
                    description: args.description,
                    createdAt: args.createdAt,
                    dueDate: args.dueDate,
                    assignedBy: args.assignedBy,
                    assignedTo: args.assignedTo,
                    stateId: "61390b3f9e9c3c4550bc864e",
                })
                webpush.sendNotification(subscriptionWorker, JSON.stringify({title: "New Action Assigned To You"}))
                return action.save()
            }
        },
        addAlert: {
            type: AlertType,
            args: {
                title: { type: GraphQLString },
                description: { type: GraphQLString },
            },
            resolve(parent, args){
                let alert = new Alert({
                    title: args.title,
                    description: args.description,
                    createdBy: "61389eef5a5edd09f813fcaa",
                    stateId: "61391957bae8ca4aec727cb9",
                })
                webpush.sendNotification(subscriptionManager, JSON.stringify({title: "New Alert !!!"}))
                webpush.sendNotification(subscriptionWorker, JSON.stringify({title: "New Alert !!!"}))
                return alert.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
