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

function addSubject() {
    var liElement = document.createElement("li");
    input = document.getElementById("newSubjectName").value;
    liElement.innerHTML = input
    liElement.onclick="chooseSubject("+this.innerHTML+")";
    /*TODO(make server handle new subject)*/
    ref.child("subjects/" + input).set({
        id: input
    })
    ref.child("users/professors/" + sessionStorage.bruker + "/subscriptions").push({
        id: input
    })
}

//TODO(new function): deleteSubcjet()


function getUserNamerCallback(username){
  navn = username.replace("@stud.ntnu.no", "")
  alertOfChange("Welcome, " + navn + "!")
}


