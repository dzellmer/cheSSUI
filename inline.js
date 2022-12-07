'use strict';
 
const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
 
process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements
 
exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  
  function moveHandler(agent){
    let original_position = agent.parameters.original_position;
    let destination_position = agent.parameters.destination_position;

    agent.add("moving " + original_position + " to " + destination_position + " say yes to confirm");
    return writeToDb ({
      "origin": original_position,
      "destination": destination_position
    });
  }

  function resultHandler(agent) {
    console.log("come into result handler");
    return readFromDb (agent);
  }

  function writeToDb (move) {
    console.log("come to writeToDb");
    // Get parameter from Dialogflow with the string to add to the database
    const docRef = db.collection('chessmove').doc('move');
    return db.runTransaction(t => {
      return t.get(docRef)
      .then(doc => {
        t.set(docRef, {
          origin:move.origin, destination:move.destination
        });
    
      });
    }).catch(err => {
      console.log(`Error writing to Firestore: ${err}`);
    });
  }


  function readFromDb (agent) {
    console.log("enter readFromDb");
    const docRef =db.collection("moveresult").doc("result");
    return db.runTransaction(t => {
      return t.get(docRef)
      .then(doc => {
        if(doc.data().success === true){
          agent.add("Valid move");
          
          const checkRef =db.collection("checkmate").doc("check");
          return db.runTransaction(t => {
            console.log("getting checkmate information");
               return t.get(checkRef)
               .then(doc => {
                 if(doc.data().checking === true){
                   agent.add("Be careful checkmate");
                 }
                 
                 const winnerRef =db.collection("checkwinner").doc("winner");
                 return db.runTransaction(t => {
                    console.log("getting winner information");
                    return t.get(winnerRef)
                          .then(doc => {
                     
                           
                           if(doc.data().win !== ""){
                             let w = doc.data().win;
                           	 agent.add(w + " win the game");
                          }
               });});
               });});
          
        }else{
          console.log("enter invalid move");
          agent.add("Invalid move. Try again"); 
        }
      });
           
    }).catch(err => {
      console.log(`Error reading from Firestore: ${err}`);
    });
  }

  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }
 
  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  
  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('move', moveHandler);
  intentMap.set('Result', resultHandler);
  agent.handleRequest(intentMap);
});
