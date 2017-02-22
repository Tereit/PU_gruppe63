
console.log(sessionStorage.bruker)

getAllSubjects(getAllSubjectsCallback)
subjectListener(sessionStorage.bruker)
//LISTENER FOR FAG SOM BRUKER HAR SUBCRIBED TIL
function subjectListener(uid){
    var liste = document.getElementById("subjectList");
    ref = firebase.database().ref();
    ref.child("users/students/" + uid + "/subscriptions").on("value", function(snapshot){
        var fag = []
        document.getElementById("subscribeLoader").style.display="none";
        var object = snapshot.val()
        for (var key in object){
            fag.push(object[key].id)
        }
        if(fag.length > 1){
            for(var i = 0; i < fag.length; i++){
                var liElement = document.createElement("li")
                liElement.innerHTML = fag[i]
                liste.appendChild(liElement)
            }
        } else {
            alertOfChange("You have no subscription to be loaded.");
            document.getElementById("subscribeLoader").innerHTML="You have no subscriptions to be loaded.";
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
            alertOfChange("There are no subjects to subscribe to.")
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
        alertOfChange("There are no subjects available.");
        document.getElementById("loader").innerHTML="There are no subjects available.";
  }
}


//martin: alerts the user of a change with the messag; message.
function alertOfChange(message) {
    var topContainer = document.getElementById("topContainer");
    topContainer.style.backgroundColor="#0f0";
    topContainer.style.width="100vw";
    var newDiv = document.createElement("a");
    newDiv.innerHTML=message;
    topContainer.appendChild(newDiv);
    setTimeout(function() {topContainer.style.backgroundColor="#999999";
        topContainer.removeChild(topContainer.lastChild)
        scrollEvent()}, 2000);
}

function testAllerting(fag) {
    //TODO(move this up and use this. instead of fag)
    addSubscriptionToUser(sessionStorage.bruker, fag, "students")
    //TODO(alert og change if this is successful)
}
