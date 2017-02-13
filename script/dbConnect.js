var firebase = require("firebase");


firebase.initializeApp({
    apiKey: "AIzaSyA3wCVMG1f33-WnafKkgF6cNtnoDFJB_IM",
   authDomain: "lecturify.firebaseapp.com",
   databaseURL: "https://lecturify.firebaseio.com",
   storageBucket: "lecturify.appspot.com",
   messagingSenderId: "946578632705"
})

var dbRef = firebase.database().ref("meldinger");
var messagesRef = dbRef.child("random"):
var messageRef = messagesRef.push();

  messageRef.set({
    navn: Kjetil Vaagen,
    alder: 20,
    kul: JAAAA,
  });
  
