console.log(sessionStorage.bruker);
console.log(sessionStorage.userType);
console.log(sessionStorage.currentSubject)



function init() {
    document.getElementById("afterSelected").style.display = "none";
    subjectListener(sessionStorage.bruker, "students");
    getUserName(sessionStorage.bruker, "students", getUserNameCallback);
    getAllSubjects(getAllSubjectsCallbackFilter)
}

function getUserNameCallback(username) {
	alertOfChange("Welcome, "+username);
}

//When subject item under MY SUBJECTS is clicked
function selectSubject(subjectName){
    document.getElementById("beforeSelected").style.display = "none";
    document.getElementById("afterSelected").style.display = "block";
    sessionStorage.currentSubject = subjectName;
    getLecturesFromSubject(subjectName, getLecturesFromSubjectCallback);
}

function getAllSubjectsCallbackFilter(subjects){
    console.log(subjects);
    firebase.database().ref("users/students/" + sessionStorage.bruker + "/subscriptions").once("value", function(snapshot){
    var object = snapshot.val();
    var fag = [];
    for (var key in object){
      fag.push(object[key].id);
    }
    for(var i = 0; i < fag.length; i++){
        for(var k = 0; k < subjects.length; k++){
            if (fag[i] == subjects[k]){
                subjects.splice(subjects.indexOf(subjects[k]), 1);
            }
        }
    }
    displayFilteredSubjects(subjects)
    })
}

function displayFilteredSubjects(subjects){
    var liste = document.getElementById("allSubjectsList");
    for(var i = 0; i < subjects.length; i++){
        var liElement = document.createElement("li");
        liElement.innerHTML = subjects[i];
        liElement.onclick = function() {
            listSelectedItem(this.innerHTML);
            liste.removeChild(this);
        };
    liste.appendChild(liElement)
    }
}

//All subject selected item function
function listSelectedItem(element){
    addSubscriptionToUser(sessionStorage.bruker, "students", element)
}

function createQuestionAction(){
    var now = new Date();
    var time = (now.getMonth()+1) + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes();
    var question = document.getElementById("questionText").value;
    createQuestion(question, sessionStorage.bruker, sessionStorage.questionID, time);
}



function openTab(evt, cityName) {
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

function sortBy(event, sortby) {
    console.log(event+" "+sortby);
}


window.onload = function () {
	init();
};
