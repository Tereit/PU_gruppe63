
console.log(sessionStorage.bruker)

function getSubscribedSubjects(){
  var liste = document.getElementById("subjectList");
  var fag = []
  ref.child("users/students/" + sessionStorage.bruker + "/subscriptions").once("value").then(function(snapshot){
    object = snapshot.val()
    for (var key in object){
    fag.push(object[key].fag)
    }
    for (var i = 0; i < fag.length; i++){
      var liElement = document.createElement("li");
      liElement.innerHTML = fag[i];
      liste.appendChild(liElement)
    }
  })
}

getSubscribedSubjects();
