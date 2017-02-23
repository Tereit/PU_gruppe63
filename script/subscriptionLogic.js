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

//Returns a list of subjects based on a search text
function search(searchText, subjects){
	var newList = [];
	for(var u = 0; u < subjects.length; u++){
		for(var i = 0, len = searchText.length; i < len; i++){
			if(subjects[u].charAt(i) == searchText.charAt(i)){
				if(i == len - 1){
					newList.push(subjects[u]);
				}
			}
			else{
				break;
			}
		}
	}
	return newList;
}

function updateSubjectList(searchText){
	if(searchText != ""){
		getNotSubscribedSubjects(userID, function(notSubscribed){
			getSubjectsByName(notSubscribed, function(list){
				getAllSubjectsCallback(search(searchText, list));
			});
		});
	}
	else{
		getAllSubjects(getAllSubjectsCallback);
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
		});
	}).then(function(){
		callback(subjectIdList);
	});
}
//Gets a list of the subjects that the student has not subscribed to
function getNotSubscribedSubjects(studentId, callback){
	getSubscribedSubjects(studentId, function(subjects){
		getAllSubjectsId(function(allSubjects){
			var notSubscribedSubjects = [];
			for(var u = 0; u < allSubjects.length; u++){
				var samme = true;
				for(var i = 0; i < subjects.length; i++){
					if(subjects[i] == allSubjects[u]){
						samme = false;
					}
				}
				if(samme){
					notSubscribedSubjects.push(allSubjects[u]);
				}
			}
			callback(notSubscribedSubjects);
		});
	});
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

function getSubjectsByName(subjectIdList ,callback){
	var dbRef = firebase.database().ref();
	var list = [];
	
	
	dbRef.child("subjects").once("value", function(snapshot){
		snapshot.forEach(function(childsnap){
			for(var i = 0; i < subjectIdList.length; i++){
				if(subjectIdList[i] == childsnap.val().id){
					list.push(childsnap.key);
				}
			}
		});
	}).then(function(){
		callback(list);
	});
	
}
