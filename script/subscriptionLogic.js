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

function trialFunction(){
	var dbRef = firebase.database().ref();
	var arrayOfLectures = [];
	dbRef.child("users/students/X3SJ2TMw3yMwz04fPoxSSuZCxW13/subscriptions").once("value", function(snapshot){
		var out = "";
		console.log("#1");
		console.log(snapshot.val());
		snapshot.forEach(function(childSnap){
			console.log("#2");
			console.log(childSnap.val());
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
