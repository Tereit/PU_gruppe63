/**
 * Created by Martin Kostveit on 13.02.2017.
 */

'use strict';

function Lecturify() {
	
	this.paceUp = document.getElementById('');
	this.paceDown = document.getElementById('');
	
	this.paceUp.addEventListener('click', this.speedUp());
	this.paceDown.addEventListener('click', this.speedDown());
	
	this.initFirebase();
}

Lecturify.prototype.initFirebase = function() {
	// Shortcuts to Firebase SDK features
	this.auth = firebase.auth();
	this.database = firebase.database();
	this.storage = firebase.storage();
};

Lecturify.prototype.speedUp = function() {
	
};

Lecturify.prototype.slowDown = function() {
	
};