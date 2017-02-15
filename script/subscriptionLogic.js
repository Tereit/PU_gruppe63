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