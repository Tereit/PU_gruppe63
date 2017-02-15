QUnit.test( "User story 1 tests", function( assert ) {
	function getPace() {
		firebase.database.ref("pace").on("value", function(snapshot) {
			return snapshot.val();
		});
	}
	var originalPace = getPace();
	lecturify.speedUp();
	var increasedPace = getPace();
	assert.equal(increasedPace, originalPace + 1);
	lecturify.slowDown();
	var slowedPace = getPace();
	assert.equal(slowedPace, originalPace);
});

window.onload = function() {
	  window.lecturify = new Lecturify();
};