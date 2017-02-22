
console.log(sessionStorage.bruker)

getAllSubjects(getAllSubjectsCallback)
subjectListener(sessionStorage.bruker)
//LISTENER FOR FAG SOM BRUKER HAR SUBCRIBED TIL
function subjectListener(uid){
  var liste = document.getElementById("subjectList");
  ref = firebase.database().ref();
  ref.child("users/students/" + uid + "/subscriptions").on("value", function(snapshot){
    fag = []
    liste.innerHTML = "";
    object = snapshot.val()
    for (var key in object){
      fag.push(object[key].id)
    }
    if(fag.length > 1){
      for(var i = 0; i < fag.length; i++){
        var liElement = document.createElement("li")
        liElement.innerHTML = fag[i]
        liste.appendChild(liElement)
      }
    }
  })
}

function filterOutAlreadyUsedSubjects(fag){
  resultat = []
  var elements = document.getElementById("subjectList").getElementsByTagName("li");
  console.log(elements)
  console.log(elements.length)
}

function getAllSubjectsCallback(subjects){
  console.log("kjører")
  if(subjects.length > 0){
    fag = filterOutAlreadyUsedSubjects(subjects);
    var liste = document.getElementById("allSubjects");
    document.getElementById("loader").style.display="none";
    for(var i=0; i < fag.length;i++){
      var liElement = document.createElement("li");
      liElement.innerHTML = fag[i];
      liElement.onclick=function () {
          testAllerting(this.innerHTML);
      };
      liste.appendChild(liElement);
    }
  }
  else{
    console.log("NO INFO")
  }
}


function testAllerting(fag) {
  addSubscriptionToUser(sessionStorage.bruker, fag, "students")
}
