
console.log(sessionStorage.bruker)

getAllSubjects(getAllSubjectsCallback)
getSubscribedSubjects(sessionStorage.bruker, "student", getSubscribedSubjectsCallback)

function getAllSubjectsCallback(fag){
	var liste = document.getElementById("allSubjects");
	var loader = document.getElementById("loader");
	
	while(liste.firstChild){
		liste.removeChild(liste.firstChild);
	}
	liste.appendChild(loader);
	loader.style.display="none";
	for(var i=0; i < fag.length;i++){
		var liElement = document.createElement("li");
		liElement.innerHTML = fag[i];
		liElement.onclick=function () {
			console.log("fett");
		};
		liste.appendChild(liElement);
	}
}


function getSubscribedSubjectsCallback(fag){
  var liste = document.getElementById("subjectList");
  //document.getElementById("subscribeLoader").style.display="none";
  for(var i=0; i < fag.length;i++){
    var liElement = document.createElement("li");
    liElement.innerHTML = fag[i];
    liste.appendChild(liElement);
  }
}
