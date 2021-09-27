const express = require('express');
const cors = require('cors');
require('dotenv').config()

const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const mongoose = require('mongoose');

const webpush = require("web-push")
webpush.setVapidDetails(
    "mailto:virouss2014@gmail.com",
    process.env.PUSH_PUBLIC_KEY,
    process.env.PUSH_PRIVATE_KEY
)
const app = express();

// allow cross-origin requests
app.use(cors());
// using json body parser
app.use(express.json())

// connect to mlab database
// make sure to replace my db string & creds with your own
mongoose.connect('mongodb://127.0.0.1:27017/?readPreference=primary&serverSelectionTimeoutMS=2000&appname=MongoDB%20Compass&directConnection=true&ssl=false')
mongoose.connection.once('open', () => {
    console.log('conneted to database');
});

// WebPush setup

// const subscriptionManager = {"endpoint":"https://fcm.googleapis.com/fcm/send/cughVIq3Jvg:APA91bGQcg7NETavXvpVz9MiPFvwNDMrKW6UMeKxabpb4fNtYnisR6RKIagn0MYboFWit2q3FopVumSHZpu-g2W1rxFeDL0Po6MoTHKftxR5Kd4f7h8HAFSBSC2HRKRRkxzKWmSeT1E8","expirationTime":null,"keys":{"p256dh":"BM1FJMgp15L1QmUdRHYhQIiZ0M9GRhzaze7ld3IZwey39qvQHSPZYdaVQi7en9eJKGxW3NwSi8Q-XDGNZZb1gTs","auth":"boGlreD1lBofrRQqxUymXA"}}
// const subscriptionWorker = {"endpoint":"https://wns2-db5p.notify.windows.com/w/?token=BQYAAAB5XX2pSPfTi6y8EPDcIzc0gxe0tqJqM4kpVRizmPI3%2bvv3ZDMT2%2b13y2lrczp44ZSosnNztYs0b5M%2blBnkMxRMKWLaIkEzu9HGuxBd3znB2FMBx77INrdLwAs8S9q3gSHwQAO6P%2bmkvPFlMWTErpKy4nPKdaBleFqZPRrQqqXrKxevQIqcwBOiV1bifDhRYrAwHzkHC8s71gbVgHg%2f9y%2bHoQNDx9mpDnAVAXhhnFi5bmr5%2fuLiVz2qkHGswRUg%2fzOPotOOC5z5e8AVc6FqnZnX9wQzkOkM944EIEyPoXOLU5hyhO%2fageLJG7m8glGCWlY%3d","expirationTime":null,"keys":{"p256dh":"BIZrdfTe2T1DLP1QfvySaI4yFu_TJBNFi87T2pUZGcJjZG6V7D8qgRsrr1Jd9g020BqTHyjWJdZ8POm1PquKYBY","auth":"ZzdYqT7cWemIhxSlkYOreQ"}}
// const subscriptionFirefox = { endpoint: "https://updates.push.services.mozilla.com/wpush/v2/gAAAAABhN…E43am9wYNs0loRCuZcsI0-hZQV5d0eIE5HIGWcviFR9h-ZJZwnVLd0g-PB9E", options: PushSubscriptionOptions }
// bind express with graphql
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

// webpush.sendNotification(subscriptionManager, JSON.stringify({title: "omma"}))
// webpush.sendNotification(subscriptionWorker, JSON.stringify({title: "omma"})).catch(e=>console.log(e))
// webpush.sendNotification(subscriptionFirefox, JSON.stringify({title: "omma"}))

app.listen(4000, () => {
    console.log('now listening for requests on port 4000');
});
