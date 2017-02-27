/**
 * http://usejsdoc.org/
 */
/*
var userID = "X3SJ2TMw3yMwz04fPoxSSuZCxW13";
searchList = [];

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



function getSnittList(list1, list2){
	var list = [];
	for(var i = 0; i < list1.length; i++){
		for(var o = 0; o < list2.length; o++){
			if(list1[i] == list2[i]){
				list.push(list1[i]);
			}
		}
	}
	return list;
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





function getAllSubjectsId(callback){
	var dbRef = firebase.database().ref();
	var subjectIdList = [];
	dbRef.child("subjects").once("value", function(snapshot){
		snapshot.forEach(function(childsnap){
			subjectIdList.push((childsnap.val().subjectId != null ? childsnap.val().subjectId : childsnap.val().id));
		});
	}).then(function(){
		callback(subjectIdList);
	});
}

//Searches for a subject and displays a button to subscribe to the subject
function searchForAndDisplaySubject(subjectId){
	getSubject(subjectId, function(subjectId, subject){
		handleSubject(subjectId, subject);
	});
	
}

//Creates the button to subscribe to a lecture
function handleSubject(subjectId, subject){
	var text = document.getElementById("searchResultTextId");
	var btn = document.getElementById("searchResultButtonId");
	if(subject != null){
		updateSubjectButton(subjectId, btn, text);
	}
}

function updateSubjectButton(subjectId, btn, text){
	checkIfSubscribed(userID, subjectId, function(isSubscribed){
		btn.innerHTML = subjectId;
		text.innerHTML = subjectId;
		if(isSubscribed){
			btn.innerHTML = "UNSUBSCRIBE";
			btn.onclick = function(){unsubscribeFromSubject(userID, subjectId, function(){updateSubjectButton(subjectId, btn, text)})};
		}
		else{
			btn.innerHTML = "SUBSCRIBE";
			btn.onclick = function(){subscribeToSubject(userID, subjectId, function(){updateSubjectButton(subjectId, btn, text)})};
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
	var isSubscribed = false;
	dbRef.child("users/students/" + studentId + "/subscriptions").once("value", function(snapshot){
		
		isSubscribed = snapshot.forEach(function(childsnap){
			if(childsnap.val().subjectId == subjectId)
				return true;
		});
		
	}).then(function(){
		callback(isSubscribed);
	});
}


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


*/