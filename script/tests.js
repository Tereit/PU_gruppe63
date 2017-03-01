QUnit.test("User story 1 tests", function(assert) {
	//var done1 = assert.async();
	//var done2 = assert.async();
	assert.equal(1,1);
	var subject = "subject";
	var lecture = "lecture";
	function getPace() {
		var ref = firebase.database().ref();
		console.log(ref);
		/*
		dbRef.child(subject).child(lecture).once("value", function(snapshot) {
			console.log(snapshot.val());
		});*/
	}
	getPace();
	//lecturify.speedUp()
	/*
	var originalPace = getPace();
	var increasedPace = originalPace + 1;
	lecturify.speedUp(testRef);
	var newPace = getPace();
	assert.equal(newPace, increasedPace);
	//done1();
	lecturify.slowDown(testRef);
	var slowedPace = getPace();
	assert.equal(slowedPace, originalPace);
	//done2();
	console.log(originalPace, newPace, increasedPace, slowedPace);
	*/
});

QUnit.test("User story 2 tests", function(assert) {
	var done1 = assert.async();
	var done2 = assert.async();
	var testRef = firebase.database().ref();
	var testUsername = "test@stud.ntnu.no";
	var testUsername2 = "bla@bla.bla.no";
	var result = false;
	var result2 = false;
	function checkUser() {
		testRef.child("users/professors").once('value').then(function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				if(childSnapshot.val().username == testUsername) {
					result = true;
					return;
				}
				if(childSnapshot.val().username == testUsername2) {
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
};