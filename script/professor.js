console.log(sessionStorage.bruker);
console.log(sessionStorage.userType);
sessionStorage.currentSubjects = []
subjectListener(sessionStorage.bruker)
getUserName(sessionStorage.bruker, "professors", getUserNamerCallback)

ref = firebase.database().ref()


//logg professor ut
function logoutAction(){
  logout(sessionStorage.bruker, "professors")
}

//TODO(Code clean-up): merge with createSubject(), should stay in professor.
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
//TODO(new function): deleteSubcjet()


function getUserNamerCallback(username){
  navn = username.replace("@stud.ntnu.no", "")
  alertOfChange("Welcome, " + navn + "!")
}

//TODO(Code clean-up): move to main
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