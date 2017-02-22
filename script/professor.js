/*
var random = sessionStorage.bruker
var type = sessionStorage.userType
console.log(random)
console.log(type)
*/
console.log(sessionStorage.bruker)


function addSubject() {
    var liElement = document.createElement("li");
    input = document.getElementById("newSubjectName").value;
    liElement.innerHTML = input
    liElement.onclick="chooseSubject("+this.innerHTML+")";
    document.getElementById("subjectList").appendChild(liElement);
    /*TODO(make server handle new subject)*/
    createSubject(input, sessionStorage.bruker)
}

function getSubjects(){
  console.log("kjører")
  var liste = document.getElementById("subjectList");
  var fag = []
  ref.child("users/professors/" + sessionStorage.bruker + "/subscriptions").once("value").then(function(snapshot){
    object = snapshot.val()
    for (var key in object){
      fag.push(object[key].id)
    }
    for(var i=0; i < fag.length; i++){
      var liElement = document.createElement("li");
      liElement.innerHTML = fag[i];
      liste.appendChild(liElement)
    }
  })
}

function chooseSubject(subjectName) {
    console.log(subjectName);
}

getSubjects();
