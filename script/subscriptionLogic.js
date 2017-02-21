/**
 * http://usejsdoc.org/
 */

//Function for a student to subscribe to a lecture
function subscribeToLecture(user, lectureID){
	var dbRef = firebase.database().ref();
	if(user && lectureID){
		dbRef.child("userSubscription/" + user.uid).push().set({
			lid: "" + lectureID
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
	var dbRef = firebase.database().ref();
	dbRef.child("subjects").once("value", function(snapshot){
		snapshot.forEach(function(childsnap){
			if(childsnap.val().subjectId == subjectId){
				return true;
			}
		})
	})
	return false;
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
