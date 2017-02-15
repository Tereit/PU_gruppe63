
QUnit.test( "User story 1 tests", function( assert ) {
	var testRef = "subjects/algdat/lecture1/pace";
	function getPace() {
		var ref = firebase.database().ref(testRef);
		ref.on("value", function(snapshot) {
			return snapshot.val();
		});
	}
	getPace();
	var originalPace = getPace();
	var increasedPace = originalPace + 1;
	lecturify.speedUp("subjects/algdat/lecture1/pace");
	var increasedPace = getPace();
	assert.equal(increasedPace, increasedPace);
	lecturify.slowDown("subjects/algdat/lecture1/pace");
	var slowedPace = getPace();
	assert.equal(slowedPace, originalPace);
});

window.onload = function() {
	  window.lecturify = new Lecturify();
	  //this.firebase = new Firebase("lecturify.firebaseapp.com");
};