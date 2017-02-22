/**
 * http://usejsdoc.org/
 */

var userID = "X3SJ2TMw3yMwz04fPoxSSuZCxW13";

//Function for a student to subscribe to a subject
function subscribeToSubject(studentId, subjectId, callback){
	var dbRef = firebase.database().ref();
	if(studentId && subjectId){
		dbRef.child("users/students/" + studentId + "/subscriptions").push().set({
			subjectId: "" + subjectId
		}).then(function(){
			callback;
		});
	}
	
}

//Function for a student to unsubscribe from a subject
function unsubscribeFromSubject(studentId, subjectId, callback){
	var dbRef = firebase.database().ref();
	if(studentId && subjectId){
		dbRef.child("users/students/" + studentId + "/subscriptions").once("value", function(snapshot){
			snapshot.forEach(function(childsnap){
				if(childsnap.val().subjectId == subjectId){
					dbRef.child("users/students/" + studentId + "/subscriptions/" + childsnap.key).remove();
				}
			})
		}).then(function(){
			callback;
		});
		
		
	}
}

//Gets a list of the subjects that the student has subscribed to
function getSubscribedSubjects(studentId, callback){
	var dbRef = firebase.database().ref();
	var subjectIdList = [];
	dbRef.child("users/students/" + studentId + "/subscriptions").once("value", function(snapshot){
		snapshot.forEach(function(childsnap){
			subjectIdList.push(childsnap.val().subjectId);
		}).then(function(){
			callback(subjectIdList);
		});
	});
}

function createSubjectList(subjectIdList){
	
	for(subjectId in subjectIdList){
		var td1 = document.createElement("TD");
		var td2 = document.createElement("TD");
		var tr = document.createElement("TR");
		var text = document.createElement("TEXTBOX");
		var btn = document.createElement("BUTTON");
		var list = document.getElementById("subListId");
		
		tr.style = "background-color: gray";
		text.innerHTML = subjectId;
		td1.appendChild(text);
		btn.innerText = "UNSUBSCRIBE";
		btn.onclick = function(){unsubscribeFromSubject(userID, subjectId)};
		td2.appendChild(btn);
		tr.appendChild(td1);
		tr.appendChild(td2);
		list.appendChild(tr);
	}
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
	var area = document.getElementById("searchResultId");
	var failure = document.getElementById("searchFailureId");
	var text = document.getElementById("searchResultTextId");
	var btn = document.getElementById("searchResultButtonId");
	if(subject != null){
		updateSubjectButton(subjectId);
	}
	else{
		area.style.visibility = "hidden";
		failure.style.visibility = "visible";
		failure.innerHTML = subjectId + " is not a registered subject.";
	}
}

function updateSubjectButton(subjectId, area = document.getElementById("searchResultId"), btn = document.getElementById("searchResultButtonId"), failure = document.getElementById("searchFailureId"), text = document.getElementById("searchResultTextId")){
	checkIfSubscribed(userID, subjectId, function(isSubscribed){
		area.style.visibility = "visible";
		btn.innerHTML = subjectId + "\n";
		failure.style.visibility = "hidden";
		text.innerHTML = subjectId;
		if(isSubscribed){
			btn.innerHTML = "UNSUBSCRIBE";
			btn.onclick = function(){unsubscribeFromSubject(userID, subjectId)};
		}
		else{
			btn.innerHTML = "SUBSCRIBE";
			btn.onclick = function(){subscribeToSubject(userID, subjectId)};
		}
	});
}

//Returns a professor based on it's id, with a callback function
function getProfessor(professorId, callback){
	var dbRef = firebase.database().ref();
	dbRef.child("users/professors/" + professorId).once("value", function(snapshot){
		callback(professorId, snapshot);
	});
}

//Checks if the student has subscribed to the subjects
function checkIfSubscribed(studentId, subjectId, callback){
	var dbRef = firebase.database().ref();
	dbRef.child("users/students/" + studentId + "/subscriptions").once("value", function(snapshot){
		var isSubscribed = false;
		isSubscribed = snapshot.forEach(function(childsnap){
			if(childsnap.val().subjectId == subjectId)
				return true;
		});
		callback(isSubscribed);
	});
}

/*Fetches information about a certain subject and passes that on 
 * to a callback function since database fetching is asyncronous
 * and continues the code.
*/
function getSubject(subjectId, callback){
	var dbRef = firebase.database().ref();
	dbRef.child("subjects").once("value", function(snapshot){
		snapshot.forEach(function(childsnap){
			if(childsnap.val().subjectId == subjectId){
				callback(subjectId, childsnap);
			}
		});
		
	});
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
