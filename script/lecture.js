/**
 * Created by Mathias Lundteigen Mohus on 06/03.2017
 */

//Creates a new question in a lecture
function createQuestion(questionText, postedBy, lectureId, date){
	dbRef.child("lectures/" + lectureId + "/" + date + "/questions").push({
		'questionText': questionText,
		'postedBy': postedBy,
		'upvoteCount': 0,
		'isRecommended': false
	})
}

//Gets all questions for a lecture
function getQuestions(lectureId, date, callback){
	dbRef.child("lecture/" + lectureId + "/" + date + "questions").once("value", function(snapshot){
		snapshot.forEach(function(childsnap){
			callback(snapshot);
		});
	});
}

//Get a specific question
function getQuestion(questionId, lectureId, date, callback){
	dbRef.child("lecture/" + lectureId + "/" + date + "questions/" + questionId).once("value", function(snapshot){
		snapshot.forEach(function(childsnap){
			callback(snapshot);
		});
	});
}

//Answer a specific question
function answerQuestion(questionId, lectureId, date, answerText, answeredBy){
	getQuestion(questionId, lectureId, date, function(question){
		question.child("answers").push({
			'answerText': answerText,
			'answeredBy': answeredBy,
			'upvoteCount': 0,
			'isRecommended': false
		})
	});
}

//Gets all answers for a question
function getQuestions(questionId ,lectureId, date, callback){
	dbRef.child("lecture/" + lectureId + "/" + date + "/question/" + questionId + "/answers").once("value", function(snapshot){
		snapshot.forEach(function(childsnap){
			callback(snapshot);
		});
	});
}