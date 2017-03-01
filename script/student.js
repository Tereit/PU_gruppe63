
console.log(sessionStorage.bruker)

currentSubjects = []

subjectListener(sessionStorage.bruker)
getUserName(sessionStorage.bruker, "students", getUserName)
getAllSubjects(function(subjects){getAvailableSubjects(subjects)})

//LISTENER FOR FAG SOM BRUKER HAR SUBCRIBED TIL TODO(Code clean-up): merge and move to main
function subjectListener(uid){
    var liste = document.getElementById("subjectList");
    dbRef.child("users/students/" + uid + "/subscriptions").on("value", function(snapshot){
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

function getAvailableSubjects(subjects){
	var liste = document.getElementById("allSubjects");
	var loader = document.getElementById("loader");
	loader.style.display="none";
	liste.innerHTML = "";
	liste.appendChild(loader);
    if(subjects.length > 0){
        var fag = filterOutAlreadyUsedSubjects(subjects);
        if (fag.length<1) {
            alertOfChange("There are no subjects to subscribe to.");
            return;
        }
        var liste = document.getElementById("allSubjects");
        for(var i=0; i < fag.length;i++){
            var liElement = document.createElement("li");
            liElement.innerHTML = fag[i];
            liElement.onclick=function () {
                selectSubscription(this.innerHTML);
            };
            liste.appendChild(liElement);
        }
    } else {
        alertOfChange("There are no subjects available.");
  }
}

function selectSubscription(fag) {
    var liste = document.getElementById("allSubjects");
    addSubscriptionToUser(sessionStorage.bruker, fag, "students");
    var items = liste.childNodes;
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

//Returns a list of subjects based on a search text
function search(searchText, subjects){
	var newList = [];
	for(var u = 0; u < subjects.length; u++){
		for(var i = 0, len = searchText.length; i < len; i++){
			if(subjects[u].charAt(i) == searchText.charAt(i)){
				if(i == len - 1){
					newList.push(subjects[u]);
				}
			}
			else{
				break;
			}
		}
	}
	return newList;
}

//Updates the possible subjects to subscribe to 
function updateSearchSubjectList(searchText){
	if(searchText != ""){
		getNotSubscribedSubjects(sessionStorage.bruker, "students", function(notSubscribed){
			console.log("Not subscribed: " + notSubscribed)
			searchList = search(searchText, notSubscribed);
			console.log("Search: " + searchList)
			getAvailableSubjects(searchList);
		});
	}
	else{
		getAllSubjects(function(subjects){
			getAvailableSubjects(subjects)
		});
	}
}



