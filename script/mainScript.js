/**
 * Created by Martin Kostveit on 13.02.2017.
 */

function init() {
    scrollEvent();
}

//addListenerToPace(sessionStorage.userType);
//Firebase dbRef
var dbRef = firebase.database().ref();

//martin: makes the scroll effect of the topContainer
var text = document.getElementById("lecturifyText");
var topContainer = document.getElementById("topContainer");
var upperMainRect = document.getElementById("upperMain").getBoundingClientRect();

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
        dbRef.child("users/" + type + "/" + uid + "/subscriptions").off(); //TODO(Code clean-up): make list of listeners and detatch all.
        window.location.href = "../html/index.html";
    }, function(error){
        console.log(error.message);
        alertOfChange("Something wrong happened");
    });
}

//Listener for pace TODO(Code clean-up): add to correct subject.
/*function addListenerToPace(type){
  dbRef.child("subjects/subject/lecture/pace").on("value", function(tall){ //TODO(Code clean-up): make list of listeners and detatch all.
    var pace = tall.val();
    if(type == "professor"){
      var professorPace = document.getElementById("professorPace");
      professorPace.innerHTML = pace;
    }
    else if(type == "student"){
      var studentPace = document.getElementById("studentPace");
      studentPace.innerHTML = pace
    }
    else{
      alertOfChange("Invalid userType for pace listener");
    }
  })
}*/

//Add subject to user profile
//Subject skal inneholde fag + " " + år + " " + semester
function addSubscriptionToUser(uid, type, subject){
    dbRef.child("users/" + type + "/" + uid + "/subscriptions").push({
        id: subject
    })
}

//Hente alle fag som bruker følger
//type skal være en string professor eller student. bruk sessionStorage


function getAllSubjects(callback){
  var subjects = [];
  dbRef.child("subjects").once("value", function(snapshot){
    var object = snapshot.val();
    for (var key in object){
      subjects.push(key);
    }
  }).then(function(){
    callback(subjects);
  })
}

//Get username of user
function getUserName(uid, type, callback){
    console.log("type: "+type);
    dbRef.child("users/" + type + "/" + uid + "/username").once("value", function(name){
        if(name.val()){
            callback(name.val())
        }
    })
}

function changeToLecture(type) {
  document.getElementById("lectureFeed").style.display="block";
  document.getElementById("subjectName").innerHTML = sessionStorage.currentSubject
}


function exitLecture() {
    document.getElementById("lectureFeed").style.display="none";
}

//Listener for upcoming and lectures today
function getLecturesFromSubject(subject, callback){
  //fetching lectures from database
  firebase.database().ref("lectures/" + subject).once("value", function(snapshot){
    callback(snapshot.val())
  })
}

//getAllLecturesToASubject
function getLecturesFromSubjectCallback(lectures){
	var lecturesTodayList = document.getElementById("lecturesToday");
	var upcomingLecturesList = document.getElementById("upcomingLectures");
	upcomingLecturesList.innerHTML="";
	var currentDate = new Date().toISOString().slice(0,10).replace(/-/g,"");
	var year = currentDate.substr(0, 4);
	var month = currentDate.substr(4, 2);
	var day = currentDate.substr(6, 2);
	currentDate = year + "-" + month + "-" + day;
	for(var key in lectures){
		if(currentDate == key){
			//lecture is today
			var liElement = document.createElement("li");
			liElement.innerHTML = key;
			var goToLectureBtn = document.createElement("button");
			goToLectureBtn.class="goToLectureBtn";
			goToLectureBtn.onclick=function () {
			    changeToLecture(); //TODO(fix parameters): get parameters of the lecture
            };
			liElement.appendChild(goToLectureBtn);
			lecturesTodayList.appendChild(liElement);
		}
		else if(compareDates(currentDate, key) == -1){
			//lecture is in the future
			var liElement = document.createElement("li");
			liElement.innerHTML = key
			upcomingLecturesList.appendChild(liElement)
		}
		else{
			console.log(key)
		}

	}
}


//Listener for fag
function subjectListener(uid, type){
    console.log("kjører")
    var liste = document.getElementById("subjectList");
    dbRef.child("users/" + type + "/" + uid + "/subscriptions").on("value", function(snapshot){
        document.getElementById("loader").style.display="none";
        var currentSubjects = [];
        liste.innerHTML = "";
        var object = snapshot.val();
        for (var key in object){
            currentSubjects.push(object[key].id);
        }
        if(currentSubjects.length > 0){
            for(var i = 0; i < currentSubjects.length; i++){
                var liElement = document.createElement("li");
                liElement.innerHTML = currentSubjects[i];
                if(type=="professors") {
                    liElement.onclick=function () {
                        selectSubject(this.innerHTML);
                    };
                } else if(type=="students") {
                    liElement.onclick=function () {
                        selectSubject(this.innerHTML);
                    };
                    //console.log("students subject onclick goes here");
                }
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
	//var dbRef = firebase.database().dbRef();
	var subjectList = [];
	dbRef.child("users/" + type + "/" + userId + "/subscriptions").once("value", function(snapshot){
		snapshot.forEach(function(childsnap){
			subjectList.push(childsnap.val().id);
		});
	}).then(function(){
		callback(subjectList);
	});
}


//Brukes av både professor og student
//Sammenligner to dato-objecter
//Retur: -1 one er før to, 0 hvis de er like, 1 hvis en er etter to
function compareDates(one, two){
	date1 = new Date(one)
	date2 = new Date(two)
	if(date1 < date2){
    return -1;
  }
  else if(date1 > date2){
    return 1;
  }
  else{
    return 0;
  }
}


//Gets a list of the subjects that the user has not subscribed to
/*function getNotSubscribedSubjects(userId, type, callback){
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
*/

function displayDropDown() {
    var dropDownContent = document.getElementById("dropDownContent");
    if(dropDownContent.style.display=="none")
        dropDownContent.style.display="block";
    else
        dropDownContent.style.display="none";
    if(document.getElementById("lecturifyText").innerHTML=="☰")
        topContainer.style.width="15vw";
    else
        scrollEvent();
}

//always at bottom.
window.onLoad = function() {
	init();
};
