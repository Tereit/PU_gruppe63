/**
 * Created by Martin Kostveit on 13.02.2017.
 */

//'use strict';
init();
//Firebase ref
var ref = firebase.database().ref();
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
        } else if(distanceY<100){
            topContainer.style.width = 100-(distanceY*0.9)+"%";
            text.innerHTML="Lecturify";
            document.getElementById("lowerMain").style.boxShadow="0 0 15px 10px rgba(0,0,0,0),0 17px 50px 0 rgba(0,0,0,0)";
            document.getElementById("upperMain").style.boxShadow="0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19)";
        }
    });
}

//Legger til generelle firebase funksjoner som kommer til å bli brukt flere ganger

//Professor: Lage nytt fag
//code er en unik kode for faget
function createSubject(subjectName, uid){
  ref.child("subjects/" + subjectName).set({
    id: "unknown",
  })
  ref.child("users/professors/" + uid + "/subscriptions").push({
    id: subjectName
  })
}



//Hente alle fag som bruker følger
//type skal være en string professor eller student. bruk sessionStorage
/*
function getSubscribedSubjects(uid, type){
  var fag = []
  if(type = "professor"){
    ref.child("users/professors/" + uid + "/subscriptions").once("value").then(function(snapshot){
      object = snapshot.val()
      for (var key in object){
        fag.push(object[key].fag)
      }
      return fag
    })
  }
  else if(type = "student"){
    ref.child("users/students/" + uid + "/subscriptions").once("value").then(function(snapshot){
      object = snapshot.val()
      for (var key in object){
        fag.push(object[key].fag)
      }
      return fag
    })
  }
  else{
    return "Invalid user type";
  }
}
*/

//martin: write the average between 0-10 and change the paceControll bar. For lecturer??
/* TODO(fix calculations)
var paceInt = 0;
var paceAnswers = 0;
function paceController(pace) {
    if(pace==="f") {
        paceInt++;
    } else {
        paceInt--;
    }
    paceAnswers++;
    document.getElementById("indicator").style.left=(paceInt/paceAnswers)*10+52.5+"%";
}
*/

function init() {
    scrollEvent();
}

function changeToLecture() {
    document.getElementById("lectureFeed").style.display="block";
}
function exitLecture() {
    document.getElementById("lectureFeed").style.display="none";
}

/*
window.onload = function() {
	this.lecturify = new Lecturify();
  var uid = sessionStorage.bruker
  var type = sessionStorage.userType
  console.log(uid)
  console.log(type)
	this.paceUp = document.getElementById("increasePace");
    this.paceDown = document.getElementById("decreasePace");
    this.paceUp.addEventListener('click', lecturify.speedUp);
    this.paceDown.addEventListener('click', lecturify.slowDown);
}
*/
