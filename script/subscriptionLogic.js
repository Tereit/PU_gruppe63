/**
 * http://usejsdoc.org/
 */

var userID = "X3SJ2TMw3yMwz04fPoxSSuZCxW13";

//Function for a student to subscribe to a subject
function subscribeToSubject(user, subjectId){
	var dbRef = firebase.database().ref();
	if(user && subjectId){
		dbRef.child("users/students/" + user.uid).push().set({
			subjectId: "" + subjectId
		})
	}
}

//Function for a student to unsubscribe from a lecture
function unsubscribeFromLecture(user, lectureID){
	var dbRef = firebase.database().ref();
	if(user && lectureID){
		dbRef.child("userSubscription/" + user.uid + "/" + lectureID).remove()
	}
}

//Fetches the lectures that a student has subscribed to
function fetchLectures(user){
	var dbRef = firebase.database().ref();
	var arrayOfLectures = [];
	if(user){
		dbRef.child("userSubscription/" + user.uid).on("value", function(snapshot){
			console.log(snapshot.val());
		});
	}
}

//Searches for a subject based on a subject ID to check for its existence
function verifySubject(subjectId){
	console.log(subjectId);
	var snap, returnstate = false;
	
	while(!returnstate){
		returnstate, snap = getSubject(subjectId);
	}
	if(snap != null){
		return true,true;
	}
	return true, false;
}

//Searches for a subject and displays a button to subscribe to the subject
function searchForAndDisplaySubject(subjectId){
	searchFailureId.innerHTML = "";
	getSubject(subjectId, function(subjectId, subject){
		handleSubject(subjectId, subject);
	});
	
}
//Creates the button to subscribe to a lecture
function handleSubject(subjectId, subject){
	if(subject != null){
		var btn = document.createElement("BUTTON");
		btn.id = "subjectButtonId";
		btn.innerHTML = subjectId + "\n";
		getProfessor(subject.professorId, function(professorId, snapshot){
			if(snapshot != null){					;
				subjectButtonId.innerHTML += "Lecturer: " + snapshot.val().username;
			}
		})
		btn.onclick = subscribeToSubject(userID, subjectId);
		subjectsBar.appendChild(btn);
	}
	else{
		searchFailureId.innerHTML = subjectId + " is not a registered subject.";
	}
}

function getProfessor(professorId, callback){
	var dbRef = firebase.database().ref();
	dbRef.child("users/professors/" + professorId).once("value", function(snapshot){
		console.log("1. " + snapshot.val());
		callback(professorId, snapshot);
	});
}

/*Fetches information about a certain subject and passes that on 
 * to a callback function since database fetching is asyncronous
 * and continues the code.
*/
function getSubject(subjectId, callback){
	var dbRef = firebase.database().ref();
	var snap;
	console.log("1");
	dbRef.child("subjects").once("value", function(snapshot){
		console.log("2");
		var subject = snapshot.forEach(function(childsnap){
			console.log("3");
			if(childsnap.val().subjectId == subjectId){
				console.log("4");
				return childsnap;
			}
			console.log("5");
		});
		console.log("6");
		callback(subjectId, subject);
		console.log("7");
		
	});
	console.log("8");
}

function trialFunction(){
	var dbRef = firebase.database().ref();
	var arrayOfLectures = [];
	var studentId = "X3SJ2TMw3yMwz04fPoxSSuZCxW13"
	dbRef.child("users/students/" + studentId + "/subscriptions").once("value", function(snapshot){
		var out = "";
		snapshot.forEach(function(childSnap){
			out += childSnap.val().id + "\n";
			var td = document.createElement("TD");
			var tr = document.createElement("TR");
			var t = document.createTextNode(childSnap.val().id);
			td.appendChild(t);
			tr.appendChild(td);
			subjectTableId.appendChild(tr);
		});
		
		document.getElementById("textAreaID").innerHTML = out;
	});
}
