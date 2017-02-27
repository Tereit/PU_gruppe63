/**
 * Created by Martin Kostveit on 13.02.2017.
 */

function init() {
    scrollEvent();
}
//'use strict';
addListenerToPace(sessionStorage.userType)
//Firebase ref
var ref = firebase.database().ref(); //TODO(Code clean-up): refactor; change name (databasRef).


//martin: makes the scroll effect of the topContainer
var text = document.getElementById("lecturifyText");
var topContainer = document.getElementById("topContainer");
var upperMainRect = document.getElementById("upperMain").getBoundingClientRect();
//document.getElementById("upperMain").style.boxShadow="0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19)";
function scrollEvent() {
    window.addEventListener('scroll', function(){
        var distanceY = window.pageYOffset;
        if (distanceY > 100 && distanceY+200 < upperMainRect.bottom) {
            topContainer.style.width = "3.5em";
            text.innerHTML="☰";
        } else if(distanceY+200 > upperMainRect.bottom) {
            document.getElementById("lowerMain").style.boxShadow="0 0 15px 10px rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19)";
            document.getElementById("upperMain").style.boxShadow="0 12px 15px 0 rgba(0,0,0,0),0 17px 50px 0 rgba(0,0,0,0)";
        } else if(distanceY<100){
            topContainer.style.width = 100-(distanceY*0.9)+"%";
            text.innerHTML="Lecturify";
            document.getElementById("lowerMain").style.boxShadow="0 0 15px 10px rgba(0,0,0,0),0 17px 50px 0 rgba(0,0,0,0)";
            document.getElementById("upperMain").style.boxShadow="0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19)";
        }
    });
}

//Logg ut bruker
function logout(uid, type){
  firebase.auth().signOut().then(function(){
    ref.child("users/" + type + "/" + uid + "/subscriptions").off() //TODO(Code clean-up): make list of listeners and detatch all.
    window.location.href = "../html/index.html";
  }, function(error){
    console.log(error.message)
    alertOfChange("Something wrong happened")
  });
}

//Listener for pace TODO(Code clean-up): add to correct subject.
function addListenerToPace(type){
  firebase.database().ref("subjects/subject/lecture/pace").on("value", function(tall){ //TODO(Code clean-up): make list of listeners and detatch all.
    pace = tall.val()
    if(type == "professor"){
      professorPace = document.getElementById("professorPace")
      professorPace.innerHTML = pace
    }
    else if(type == "student"){
      studentPace = document.getElementById("studentPace")
      studentPace.innerHTML = pace
    }
    else{
      alert("Invalid userType for pace listener")
    }
  })
}

//Add subject to user profile
function addSubscriptionToUser(uid, subject, type){
    console.log("kjører")
    ref.child("users/" + type + "/" + uid + "/subscriptions").push({
        id: subject
    })
}

//Hente alle fag som bruker følger
//type skal være en string professor eller student. bruk sessionStorage


function getAllSubjects(callback){
  subjects = []
  ref.child("subjects").once("value", function(snapshot){
    object = snapshot.val()
    for (var key in object){
      subjects.push(key)
    }
  }).then(function(){
    callback(subjects);
  })
}

//Get username of user
function getUserName(uid, type, callback){
  ref.child("users/" + type + "/" + uid + "/username").once("value", function(name){
    if(name.val()){
      callback(name.val())
    }
  })
}

function changeToLecture() {
    document.getElementById("lectureFeed").style.display="block";
}
function exitLecture() {
    document.getElementById("lectureFeed").style.display="none";
}


//Listener for fag
function subjectListener(uid, type){
    var liste = document.getElementById("subjectList");
    //ref = firebase.database().ref(); //TODO(After code clean-up): This variable was in student, not in professor.
    ref.child("users/" + type + "/" + uid + "/subscriptions").on("value", function(snapshot){
        document.getElementById("loader").style.display="none";
        var currentSubjects = [];
        liste.innerHTML = "";
        var object = snapshot.val();
        for (var key in object){
            currentSubjects.push(object[key].id)
        }
        if(currentSubjects.length > 0){
            for(var i = 0; i < currentSubjects.length; i++){
                var liElement = document.createElement("li");
                liElement.innerHTML = currentSubjects[i];
                liste.appendChild(liElement)
            }
        } else {
            alertOfChange("You have no subscription to be loaded.");
        }
    })
}

function alertOfChange(message) {
    var topContainer = document.getElementById("topContainer");
    topContainer.style.backgroundColor="#0f0";
    topContainer.style.width="100vw";
    var newDiv = document.createElement("a");
    newDiv.innerHTML= message;
    topContainer.appendChild(newDiv);
    setTimeout(function() {topContainer.style.backgroundColor="#999999";
        topContainer.removeChild(topContainer.lastChild);
        scrollEvent()}, 2000);
}

//Gets a list of the subjects that the user has subscribed to
function getSubscribedSubjects(userId, type, callback){
	var dbRef = firebase.database().ref();
	var subjectList = [];
	dbRef.child("users/" + type + "/" + userId + "/subscriptions").once("value", function(snapshot){
		snapshot.forEach(function(childsnap){
			subjectList.push(childsnap.val().id);
		});
	}).then(function(){
		callback(subjectList);
	});
}

//Gets a list of the subjects that the user has not subscribed to
function getNotSubscribedSubjects(userId, type, callback){
	getSubscribedSubjects(userId, type, function(subjects){
		getAllSubjects(function(allSubjects){
			var notSubscribedSubjects = [];
			for(var u = 0; u < allSubjects.length; u++){
				var samme = true;
				for(var i = 0; i < subjects.length; i++){
					if(subjects[i] == allSubjects[u]){
						samme = false;
					}
				}
				if(samme){
					notSubscribedSubjects.push(allSubjects[u]);
				}
			}
			callback(notSubscribedSubjects);
		});
	});
}


//always at bottom.
window.onLoad = function() {
	init();
};
