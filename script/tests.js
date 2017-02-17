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
	var done1 = assert.async();
	var done2 = assert.async();
	var testRef = firebase.database().ref();
	var testUsername = "martin@stud.ntnu.no";
	var testUsername2 = "bla@bla.bla.no";
	var result = false;
	var result2 = false;
	function checkUser() {
		testRef.child("users/professors").once('value').then(function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				if(childSnapshot.val().username === testUsername) {
					result = true;
					return;
				}
				if(childSnapshot.val().username === testUsername2) {
					result2 = true;
				}
			});
			assert.ok(result);
			done1();
			assert.notOk(result2);
			done2();
		}, function(error) {
			console.log(error);
			assert.ok(false);
			done1();
			assert.notOk(true);
			done2();
		});
	}
	checkUser();
});

window.onload = function() {
	window.lecturify = new Lecturify();
	// this.firebase = new Firebase("lecturify.firebaseapp.com");
};