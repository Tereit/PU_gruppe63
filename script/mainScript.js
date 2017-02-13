/**
 * Created by Martin Kostveit on 13.02.2017.
 */

'use strict';

function Lecturify() {
    this.initFirebase();

    this.user = document.getElementById("user");
    this.pass = document.getElementById("pass");

  //  this.paceUp.addEventListener('click', this.speedUp);
}

Lecturify.prototype.initFirebase = function() {
    // Shortcuts to Firebase SDK features
    this.auth = firebase.auth();
    this.database = firebase.database();
    this.storage = firebase.storage();
};

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
function scrollEvent() {
    window.addEventListener('scroll', function(){
        var distanceY = window.pageYOffset;
        if (distanceY > 100) {
            topContainer.style.width = "3.5em";
            text.innerHTML="☰";
        } else {
            topContainer.style.width = 100-(distanceY*0.9)+"%";
            text.innerHTML="Lecturify";
        }
    });
}
scrollEvent();
