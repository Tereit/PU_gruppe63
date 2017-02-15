QUnit.test("User story 1 tests", function(assert) {
	var testRef = "subjects/algdat/lecture1/pace";
	function getPace() {
		var ref = firebase.database().ref(testRef);
		ref.on("value", function(snapshot) {
			return snapshot.val();
		});
	}
	var originalPace = getPace();
	var increasedPace = originalPace + 1;
	lecturify.speedUp(testRef);
	var increasedPace = getPace();
	assert.equal(increasedPace, increasedPace);
	lecturify.slowDown(testRef);
	var slowedPace = getPace();
	assert.equal(slowedPace, originalPace);
});

QUnit.test("User story 2 tests", function(assert) {
	//TODO: asynchronous data causing issues for the test
	var done = assert.async();
	var testRef = firebase.database().ref();
	var testUsername = "martin@stud.ntnu.no";
	function checkUser() {
		testRef.child("users/professors").once('value').then(function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				if(childSnapshot.val().username === testUsername) {
					assert.ok(true);
					done();
				}
			});
		}, function(error) {
			assert.ok(false);
		});
	}
	checkUser();
});

window.onload = function() {
	window.lecturify = new Lecturify();
	// this.firebase = new Firebase("lecturify.firebaseapp.com");
};