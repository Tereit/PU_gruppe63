/**
 * Created by Mathias Lundteigen Mohus on 06/03.2017
 */

//Creates a new question in a lecture
function createQuestion(questionText, postedBy, lectureId, date){
	dbRef.child("questions/" + lectureId).push({
		'questionText': questionText,
		'postedBy': postedBy,
		'upvoteCount': 0,
		'isRecommended': false
	})
}

//Gets all questions for a lecture
function getQuestions(lectureId, date, callback){
	
	dbRef.child("lecture/" + lectureId + "/" + date + "questions").once("value", function(snapshot){
		dbRef.child("questions/" + lectureId).once("value", function(childsnap){
			callback(childsnap)
		})
	});
}

//Get a specific question
function getQuestion(questionId, lectureId, callback){
	dbRef.child("questions/" + lectureId + questionId).once("value", function(snapshot){
		snapshot.forEach(function(childsnap){
			callback(snapshot);
		});
	});
}

//Answer a specific question
function answerQuestion(questionId, lectureId, answerText, answeredBy){
	getQuestion(questionId, lectureId, function(question){
		question.child("answers").push({
			'answerText': answerText,
			'answeredBy': answeredBy,
			'upvoteCount': 0,
			'isRecommended': false
		});
	});
}

//Gets all answers for a question
function getAnswers(questionId, lectureId, callback){
	getQuestion(questionId, lectureId, function(question){
		question.child("answers").once("value", function(snapshot){
			callback(snapshot);
		});
	});
}

//Gets a specific answer
function getAnswer(questionId, lectureId, answerId, callback){
	getQuestion(questionId, lectureId, function(question){
		question.child("answers" + answerId).once("value", function(snapshot){
			callback(snapshot);
		});
	});
}