
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
    var resultat = []
    var elements = document.getElementById("subjectList").getElementsByTagName("li");
    console.log(elements)
    console.log(elements.length)
    return [];
}

function getAllSubjectsCallback(subjects){
    if(subjects.length > 0){
        console.log("subject>0");
        var fag = filterOutAlreadyUsedSubjects(subjects);
        if (fag.length<1) {
            document.getElementById("loader").innerHTML="There are no subjects to subscribe to.";
            return;
        }
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
    else {
        document.getElementById("loader").innerHTML="There are no subjects available.";
  }
}


function testAllerting(fag) {
  addSubscriptionToUser(sessionStorage.bruker, fag, "students")
}
