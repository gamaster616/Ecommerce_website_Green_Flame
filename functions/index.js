
/* eslint-disable */

const functions = require("firebase-functions");
const express = require("express");
const cors = require('cors');
const stripe = require("stripe")
  ('sk_test_51KhRzlSConOUA4zTdWnBJyfFTfPkv2GgvDVbpKAyu48fK2pBw9UTIH7NhJYkjKoolK753MEdkm2rkqR8XhWSxAUP00utuEL2NZ')

//API

// - APP config
const app = express();

// - Middlewares
app.use(cors({ origin: true,credentials:true }));
app.use(express.json());

// - API routes
app.get('/', (request, response) => response.status(200).send('hello thgbfdszgfld'));
app.post('/payments/create', async (request, response) => {
  const total = request.query.total;

  console.log('Payment Request Received Boom!! for this amount >>>', total) 

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of currency 
    currency: "inr",
    // payment_method_types:['card']
  });


  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  })
})


// - Listen command

exports.api = functions.https.onRequest(app);



//example end point

//http://localhost:5001/projectnumber-one/us-central1/api









// ,
//   "functions": {
//     "predeploy": [
//       "npm --prefix \"$RESOURCE_DIR\" run lint"
//     ]
//   }


//"npm --prefix \"$RESOURCE_DIR\" run lint"





// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
