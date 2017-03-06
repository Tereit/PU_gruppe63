/**
 * Created by Mathias Lundteigen Mohus on 06/03.2017
 */

//Creates a new question in a lecture
function createQuestion(questionText, author, lectureId, date){
	var questionId = dbRef.child("questions").push({
		'lectureId': lectureId,
		'date': date,
		'questionText': questionText,
		'postedBy': author
	}).key();
	dbRef.child("lectures/" + lectureId + "/" + date + "questions" + questionId).push({
		'null': "null"
	});
}

//Gets all questions for a lecture
function getQuestions(lectureId, date, callback){
	var questions = []
	dbRef.child("lecture/" + lectureId + "/" + date + "questions").once("value", function(snapshot){
		var snap = snapshot;
		snapshot.forEach(function(childsnap){
			dbRef.child("questions" + childsnap.key).once("value", function(snap){
				questions.push(snap);
			});
		});
	}).then(function(){
		callback(questions);
	});
}