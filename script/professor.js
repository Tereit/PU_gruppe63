/*
var random = sessionStorage.bruker
var type = sessionStorage.userType
console.log(random)
console.log(type)
*/
console.log(sessionStorage.bruker);
sessionStorage.currentSubjects = []
subjectListener(sessionStorage.bruker)
getUserName(sessionStorage.bruker, "professors", getUserNamerCallback)

ref = firebase.database().ref()
//Listener for fag
function subjectListener(uid){
    var liste = document.getElementById("subjectList");
    ref.child("users/professors/" + uid + "/subscriptions").on("value", function(snapshot){
        document.getElementById("loader").style.display="none";
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
        }
    })
}

//logg professor ut
function logoutAction(){
  logout(sessionStorage.bruker, "professors")
}


function addSubject() {
    var liElement = document.createElement("li");
    input = document.getElementById("newSubjectName").value;
    liElement.innerHTML = input
    liElement.onclick="chooseSubject("+this.innerHTML+")";
    /*TODO(make server handle new subject)*/
    createSubject(input, sessionStorage.bruker)
}


//LAger nytt fag og legger til subscriptions til professor bruker
function createSubject(subject, uid){
  ref.child("subjects/" + subject).set({
    id: subject
  })
  ref.child("users/professors/" + uid + "/subscriptions").push({
    id: subject
  })
}

function getUserNamerCallback(username){
  navn = username.replace("@stud.ntnu.no", "")
  alertOfChange("Welcome, " + navn + "!")
}


function chooseSubject(subjectName) {
    console.log(subjectName);
}

function alertOfChange(message) {
    var topContainer = document.getElementById("topContainer");
    topContainer.style.backgroundColor="#0f0";
    topContainer.style.width="100vw";
    var newDiv = document.createElement("a");
    newDiv.innerHTML= message;
    topContainer.appendChild(newDiv);
    setTimeout(function() {topContainer.style.backgroundColor="#999999";
        topContainer.removeChild(topContainer.lastChild)
        scrollEvent()}, 2000);
}

function alertOnLogin() {
    window.onload(function () {
        console.log("eid");
    })
}
