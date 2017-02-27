
console.log(sessionStorage.bruker)

currentSubjects = []

subjectListener(sessionStorage.bruker)
getUserName(sessionStorage.bruker, "students", getUserName)
getAllSubjects(getAllSubjectsCallback)
//LISTENER FOR FAG SOM BRUKER HAR SUBCRIBED TIL TODO(Code clean-up): merge and move to main
function subjectListener(uid){
    var liste = document.getElementById("subjectList");
    ref = firebase.database().ref();
    ref.child("users/students/" + uid + "/subscriptions").on("value", function(snapshot){
        //Martin: Lager error. Orker ikke å fikse nå
        //document.getElementById("subscribeLoader").style.display="none";
        currentSubjects = []
        liste.innerHTML = ""
        var object = snapshot.val()
        for (var key in object){
            currentSubjects.push(object[key].id)
        }
        if(currentSubjects.length > 0){
            for(var i = 0; i < currentSubjects.length; i++){
                var liElement = document.createElement("li")
                liElement.innerHTML = currentSubjects[i]
                liste.appendChild(liElement)
            }
        } else {
            alertOfChange("You have no subscription to be loaded.");
            //document.getElementById("subscribeLoader").innerHTML="You have no subscriptions to be loaded.";
        }
    })
}
//TODO(Code clean-up):move to main
function getUserName(username){
  navn = username.replace("@stud.ntnu.no", "")
  alertOfChange("Welcome, " + navn + "!")
}
//TODO(Code clean-up): refactor; button can call directly
function handleLogout(){
  logout(sessionStorage.bruker, "students")
}
//TODO(performance): improve performance
function filterOutAlreadyUsedSubjects(subjects){
  for (var i = 0; i < currentSubjects.length; i++){
    for(var k = 0; k < subjects.length; k++){
      if(currentSubjects[i] == subjects[k]){
        subjects.splice(k, 1)
      }
    }
  }
  return subjects;
}
//TODO(Code clean-up): refactor; change name(getAvailableSubjects).
function getAllSubjectsCallback(subjects){
	var liste = document.getElementById("allSubjects");
	var loader = document.getElementById("loader");
	loader.style.display="none";
	liste.innerHTML = "";
	liste.appendChild(loader);
    if(subjects.length > 0){
        var fag = filterOutAlreadyUsedSubjects(subjects);
        if (fag.length<1) {
            alertOfChange("There are no subjects to subscribe to.")
            document.getElementById("loader").innerHTML="There are no subjects to subscribe to.";
            return;
        }
        var liste = document.getElementById("allSubjects");
        
        for(var i=0; i < fag.length;i++){
        	
            var liElement = document.createElement("li");
            liElement.innerHTML = fag[i];
            liElement.onclick=function () {
                testAllerting(this.innerHTML);
            };
            liste.appendChild(liElement);
        }
    }
    else {
        alertOfChange("There are no subjects available.");
        document.getElementById("loader").innerHTML="There are no subjects available.";
  }
}


//martin: alerts the user of a change with the messag; message. TODO(Code clean-up): move to main
function alertOfChange(message) {
    var topContainer = document.getElementById("topContainer");
    topContainer.style.backgroundColor="#0f0";
    topContainer.style.width="100vw";
    var newDiv = document.createElement("a");
    newDiv.innerHTML=message;
    topContainer.appendChild(newDiv);
    setTimeout(function() {topContainer.style.backgroundColor="#999999";
        topContainer.removeChild(topContainer.lastChild)
        scrollEvent()}, 2000);
}
//TODO(Code clean-up): refactor; change name.
function testAllerting(fag) {
    //TODO(move this up and use this. instead of fag)
    liste = document.getElementById("allSubjects")
    addSubscriptionToUser(sessionStorage.bruker, fag, "students")
    items = liste.childNodes;
    for(var i = 0; i < items.length; i++){
      if(items[i].innerHTML == fag){
        liste.removeChild(items[i])
      }
    }
    //TODO(alert og change if this is successful)
}

function paceController(button) {
	var dbRef = firebase.database().ref("subjects/subject/lecture/pace");
	dbRef.transaction(function(tall) {
		if(tall) {
			if(button == "f") {
				tall = tall - 1;
			} else if(button == "s") {
				tall = tall + 1;
			}
		}
		//console.log(tall);
		return tall;
	});
	//TODO(continue): call function in main, that displays pace.
}

//Function for a student to unsubscribe from a subject
function unsubscribeFromSubject(studentId, subjectId){
    var dbRef = firebase.database().ref();
    if(studentId && subjectId){
        dbRef.child("users/students/" + studentId + "/subscriptions").once("value", function(snapshot){
            snapshot.forEach(function(childsnap){
                if(childsnap.val().subjectId == subjectId){
                    dbRef.child("users/students/" + studentId + "/subscriptions/" + childsnap.key).remove();
                }
            })
        });
    }
}
