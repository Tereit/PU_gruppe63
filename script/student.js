
console.log(sessionStorage.bruker)

getAllSubjects(getAllSubjectsCallback)
getSubscribedSubjects(sessionStorage.bruker, "student", getSubscribedSubjectsCallback)

function getAllSubjectsCallback(fag){
  var liste = document.getElementById("allSubjects");
  console.log(fag.length)
  for(var i=0; i < fag.length;i++){
    var liElement = document.createElement("li");
    liElement.innerHTML = fag[i];
    liste.appendChild(liElement);
  }
}


function getSubscribedSubjectsCallback(fag){
  var liste = document.getElementById("subjectList");
  for(var i=0; i < fag.length;i++){
    var liElement = document.createElement("li");
    liElement.innerHTML = fag[i];
    liste.appendChild(liElement);
  }
}
