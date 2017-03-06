/**
 * Created by Mathias Lundteigen Mohus on 06/03.2017
 */

//Creates a new question in a lecture
function createQuestion(questionText, postedBy, questionID, date){
	dbRef.child("questions/" + questionID).push({
		questionText: questionText,
		postedBy: postedBy,
		upvoteCount: 0,
		isRecommended: false,
	})
}

//Gets all questions for a lecture
function getQuestions(lectureId, date, questionId, callback){

	dbRef.child("lecture/" + lectureId + "/" + date + "/" + questionId).once("value", function(snapshot){
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

//Updates the upvotes for the question
function upvoteQuestion(questionId, lectureId, userId){
	dbRef.child("questions/" + lectureId + "/" + questionId + "/upvotedB/" + userId).push({
		'null': "null"
	});
}

//Removes the upvote on a question
function removeUpvoteQuestion(questionId, lectureId, userId){
	dbRef.child("questions/" + lectureId + "/" + questionId + "/upvotedB/" + userId).remove();
}

//Set a listener for the lecture feed
function questionFeedListener(lectureId){
	var questionList = []
	dbRef.child("questions/" + lectureId).on("child_added", function(question){
		newQuestion(question);
	});
	dbRef.child("questions/" + lectureId).on("child_removed", function(question){
		deleteQuestionList(question);
	});
}

//Updates the question list for the lecture
function updateQuestion(questionList){
	var qList = document.getElementById("questionList")
	var qMain = document.createElement("VBOX")

	var quest = document.createElement("HBOX")
	var text = document.createElement("TEXTBOX")
	text.innerHTML = question.val().questionText + "\t Posted By: " + question.val().postedBy + "\t " + question.child("answers").once(function(ans){return ans.numChildren});

	quest.appendChild(text)
	qMain.appendChild(quest)
	var answers = document.createElement("VBOX")
	question.child("answers").forEach(function(answer){
		var ans = document.createElement("TEXTBOX")
		ans = answer.val().answerText + "\t Posted By: " + answer.val().answeredBy
		answers.append()
	});
}

function newQuestion(question){
	console.log(questions)
	var qList = document.getElementsByClassName("messageFeed")
	var qMain = document.createElement("VBOX")
	qMain.class = "message"
	var quest = document.createElement("HBOX")
	var text = document.createElement("TEXTBOX")
	var div = document.createElement("DIV")
	qMain.appendChild(div)
	text.innerHTML = question.val().questionText + "\t Posted By: " + question.val().postedBy + "\t " + question.child("answers").once(function(ans){return ans.numChildren});

	quest.appendChild(text)
	qMain.appendChild(quest)
	var answers = document.createElement("VBOX")
	question.child("answers").forEach(function(answer){
		var ans = document.createElement("TEXTBOX")
		ans = answer.val().answerText + "\t Posted By: " + answer.val().answeredBy
		answers.append()
	});

	qMain.appendChild(answers)
	qList.append(qMain)

}

function deleteQuestion(question){
	var qList = document.getElementById("questionList")
	var quest = document.getElementById(question.key)
	qList.removeChild(quest)
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
