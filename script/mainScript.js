/**
 * Created by Martin Kostveit on 13.02.2017.
 */

//'use strict';

function Lecturify() {
    this.initFirebase();

    this.paceUp = document.getElementById("increasePace");
    this.paceDown = document.getElementById("decreasePace");
    this.paceUp.addEventListener('click', this.speedUp);
    this.paceDown.addEventListener('click', this.slowDown);
    
    //this.btnLogin = document.getElementById("btnLogin");
    //this.R_btnLogin = document.getElementById("R_btnLogin");

    //this.btnLogin.addEventListener("click", this.onLogin);
    //this.R_btnLogin.addEventListener("click", this.onRegister);
}

Lecturify.prototype.initFirebase = function() {
    // Shortcuts to Firebase SDK features
    this.auth = firebase.auth();
    this.database = firebase.database();
    this.storage = firebase.storage();

    //SJEKKER OM BRUKER TILSTANDEN HAR ENDRET SEG
    //Hvis du gitt ut av nettsiden uten å logge inn, kommer du automatisk inn
    firebase.auth().onAuthStateChanged(user => {
      updateUser(user);
    });
};


//LOGIN
Lecturify.prototype.onLogin = function(){
  this.user = document.getElementById("user").value;
  this.pass = document.getElementById("pass").value;
  var professor = document.getElementById("r2");
  firebase.auth().signInWithEmailAndPassword(this.user, this.pass).catch(
    error => console.log(error.message));
};

//REGISTRERE NY BRUKER
Lecturify.prototype.onRegister = function(){
  this.user = document.getElementById("R_user").value;
  this.pass = document.getElementById("R_pass").value;
  if(this.user != "" && this.pass != ""){
    firebase.auth().createUserWithEmailAndPassword(this.user, this.pass).catch(
      error => console.log(error.message));
  }else{
    alert("Invalid information");
  }
};




//Oppdatere databasen ved innlogging
function updateUser(user){
  var student1 = document.getElementById("r1");
  var student2 = document.getElementById("radio1");
  var dbRef = firebase.database().ref();
  if(user){
    if(student1.checked || student2.checked){
      dbRef.child("users/students/" + user.uid).set({
        email: user.email
      }).then(window.location.href = "../html/main.html");
    }
    else{
      dbRef.child("users/professors/" + user.uid).set({
        email: user.email
      }).then(window.location.href = "../html/main.html");
    }
    }
    else{
    console.log("not logged in");
  }
}



Lecturify.prototype.speedUp = function() {
    firebase.database().ref("pace").transaction(function(tall){
        if(tall){
            tall++;
        }
        return tall;
    })
};

Lecturify.prototype.slowDown = function() {
    firebase.database().ref("pace").transaction(function(tall){
        if(tall){
            tall--;
        }
        return tall;
    })
};


//martin: makes the scroll effect of the topContainer
var text = document.getElementById("lecturifyText");
var topContainer = document.getElementById("topContainer");
var upperMainRect = document.getElementById("upperMain").getBoundingClientRect();
//document.getElementById("upperMain").style.boxShadow="0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19)";
function scrollEvent() {
    window.addEventListener('scroll', function(){
        var distanceY = window.pageYOffset;
        if (distanceY > 100 && distanceY+200 < upperMainRect.bottom) {
            topContainer.style.width = "3.5em";
            text.innerHTML="☰";
        } else if(distanceY+200 > upperMainRect.bottom) {
            document.getElementById("lowerMain").style.boxShadow="0 0 15px 10px rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19)";
            document.getElementById("upperMain").style.boxShadow="0 12px 15px 0 rgba(0,0,0,0),0 17px 50px 0 rgba(0,0,0,0)";
        } else {
            topContainer.style.width = 100-(distanceY*0.9)+"%";
            text.innerHTML="Lecturify";
            document.getElementById("lowerMain").style.boxShadow="0 0 15px 10px rgba(0,0,0,0),0 17px 50px 0 rgba(0,0,0,0)";
            document.getElementById("upperMain").style.boxShadow="0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19)";
        }
    });
}
scrollEvent();


function init() {
    scrollEvent();

}

window.onload = function() {
	this.lecturify = new Lecturify();
};