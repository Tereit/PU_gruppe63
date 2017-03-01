
console.log(sessionStorage.bruker)

currentSubjects = []

subjectListener(sessionStorage.bruker)
getUserName(sessionStorage.bruker, "students", getUserName)
getAllSubjects(function(subjects){getAvailableSubjects(subjects)})


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
