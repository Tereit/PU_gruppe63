/**
 * Created by Martin Kostveit on 13.02.2017.
 */

//'use strict';

function Lecturify() {
    this.paceUp = document.getElementById("increasePace");
    this.paceDown = document.getElementById("decreasePace");
    this.paceUp.addEventListener('click', this.speedUp);
    this.paceDown.addEventListener('click', this.slowDown);

    //this.btnLogin = document.getElementById("btnLogin");
    //this.R_btnLogin = document.getElementById("R_btnLogin");

    //this.btnLogin.addEventListener("click", this.onLogin);
    //this.R_btnLogin.addEventListener("click", this.onRegister);
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
