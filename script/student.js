console.log(sessionStorage.bruker);
console.log(sessionStorage.userType);
getAllSubjects(getAllSubjectsCallbackFilter)


currentSubjects = [];

function init() {
    subjectListener(sessionStorage.bruker, "students");
    getUserName(sessionStorage.bruker, "students", getUserNameCallback);
}

function getUserNameCallback(username) {
	alertOfChange("Welcome, "+username);
}

function getAllSubjectsCallbackFilter(subjects){
    console.log(subjects)
    firebase.database().ref("users/students/" + sessionStorage.bruker + "/subscriptions").once("value", function(snapshot){
    object = snapshot.val()
    fag = []
    for (var key in object){
      fag.push(object[key].id)
    }
    console.log(fag)
    for(var i = 0; i < fag.length; i++){
      for(var k = 0; k < subjects.length; k++){
        if (fag[i] == subjects[k]){
          subjects.splice(subjects.indexOf(subjects[k]), 1)
        }
      }
    }
    displayFilteredSubjects(subjects)
  })
}

function displayFilteredSubjects(subjects){
  liste = document.getElementById("allSubjectsList")

  for(var i = 0; i < subjects.length; i++){
    liElement = document.createElement("li")
    liElement.innerHTML = subjects[i]
    liElement.addEventListener("click", function(value){
      alert(value)
    })
    liste.appendChild(liElement)
  }
}

//TABBAR
function openCity(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}



window.onload = function () {
	init();
};
