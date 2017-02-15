function Lecturify() {
    this.paceUp = document.getElementById("increasePace");
    this.paceDown = document.getElementById("decreasePace");
    this.paceUp.addEventListener('click', this.speedUp);
    this.paceDown.addEventListener('click', this.slowDown);
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

window.onload = function() {
	this.lecturify = new Lecturify();
};