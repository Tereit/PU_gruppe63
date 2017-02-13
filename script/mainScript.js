/**
 * Created by Martin Kostveit on 13.02.2017.
 */

'use strict';

function Lecturify() {
	
	
	
	this.initFirebase();
}

Lecturify.prototype.initFirebase = function() {
	// Shortcuts to Firebase SDK features
	this.auth = firebase.auth();
	this.database = firebase.database();
	this.storage = firebase.storage();
	// Initiates Firebase auth and listen to auth state changes.
	this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};