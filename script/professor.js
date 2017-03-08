console.log(sessionStorage.bruker);
console.log(sessionStorage.userType);

function init() {
	document.getElementById("afterSelectedSubject").style.display = "none";
	document.getElementById("date").value = new Date()
}

//Henter alle professor sinde subscriptions, altså sin fag som han har lagd
subjectListener(sessionStorage.bruker, "professors");

//Pop-up notification med brukernavn
getUserName(sessionStorage.bruker, "professors", getUserNamerCallback);

// logg professor ut
function logoutAction() {
	logout(sessionStorage.bruker, "professors");
}

//Lage et nytt fag under subjects og brukerens subscriptions
function addSubject() {
	fag = document.getElementById("newSubjectName")
	fagkode = document.getElementById("newSubjectCode")
	fagSemester = document.getElementById("newSubjectSemester")
	fagAr = new Date().getFullYear();

	if(fag.value != "" && fagkode.value != "" && fagSemester.value != "" && fagkode.value.includes("-") == true){
		subscriptionsId = fag.value + " " + fagAr + " " + fagSemester.value;
		console.log(subscriptionsId)
		//Legger til faget under "subjects"
		dbRef.ref("subjects/" + subscriptionsId).set({
			id: fagkode.value.toLowerCase(),
			professor: sessionStorage.bruker,
		})
		//Legger til faget i subscriptions til brukeren
		dbRef.ref("users/professors/" + sessionStorage.bruker + "/subscriptions").push({
			id: subscriptionsId
		})
		fag.value = ""
		fagkode.value = ""
		fagSemester.value = ""
	}
	else{
		alert("Invalid information")
	}
}

//getAllLecturesToASubject
/*
function getLecturesFromSubjectCallback(lectures){
	var lecturesTodayList = document.getElementById("lecturesToday")
	var upcomingLecturesList = document.getElementById("upcomingLectures")
	currentDate = new Date().toISOString().slice(0,10).replace(/-/g,"");
	year = currentDate.substr(0, 4)
	month = currentDate.substr(4, 2)
	day = currentDate.substr(6, 2)
	currentDate = year + "-" + month + "-" + day;
	for(var key in lectures){
		if(currentDate == key){
			//lecture is today
			var liElement = document.createElement("li")
			liElement.innerHTML = key
			lecturesTodayList.appendChild(liElement)
		}
		else if(compareDates(currentDate, key) == -1){
			//lecture is in the future
			var liElement = document.createElement("li")
			liElement.innerHTML = key
			upcomingLecturesList.appendChild(liElement)
		}
		else{
			console.log(key)
		}

	}
}
*/



// TODO(new function): deleteSubcjet()

function getUserNamerCallback(username) {
	navn = username.replace("@stud.ntnu.no", "");
	alertOfChange("Welcome, " + navn + "!");
}

function newLecture() {
	var day = document.getElementById("date").value;
	var currentDate = new Date();
	currentDate.setHours(0,0,0,0);
	var rom = document.getElementById("rom").value;
	var tidFra = document.getElementById("tidFra").value;
	var tidTil = document.getElementById("tidTil").value;
	var currentYear = new Date().getFullYear()
	var questionID = sessionStorage.currentSubject + " " + day;
	if(tidFra != "" && tidTil != ""){
		// create new lecture with the supplied info and add to database
		dbRef.ref("lectures/" + sessionStorage.currentSubject + "/" + day + "/").set({
			userCount: 0,
			banList: "",
			pace: 50,
			fra: tidFra,
			til: tidTil,
			rom: rom,
			questionID: questionID,
			}).then(function(){
				document.getElementById("createLecturePopUp").style.display="none";
				alertOfChange("Successfully created new lecture");
				getLecturesFromSubject(sessionStorage.currentSubject, getLecturesFromSubjectCallback)
				}
			)
	}
	else{
		alert("Invalid information!")
	}
}

function cancelCreateNewLecture() {
	document.getElementById("createLecturePopUp").style.display="none";
}

//When professor subject is clicked
function selectSubject(subjectName) {
	document.getElementById("beforeSelectedSubject").style.display = "none"
	document.getElementById("afterSelectedSubject").style.display = "block"
	document.getElementById("subjectTitleText").innerHTML = subjectName;
	document.getElementById("lecturesToday").innerHTML = ""
	document.getElementById("upcomingLectures").innerHTML = ""
	sessionStorage.currentSubject = subjectName
	getLecturesFromSubject(subjectName, getLecturesFromSubjectCallback)
	displayStudentsInSubject(subjectName)
}

function displayCreateLecture() {
	document.getElementById("createLecturePopUp").style.display="block";
}

//Gets all students subscribed to a subject
function getStudentsInSubject(subjectId, callback){
	dbRef.child("subjects/" + subjectId + "/students").once("value", function(students){
		callback(students)
	})
}

function displayStudentsInSubject(subjectId){
	var studInSubject = document.getElementById("studentsInSubject")
	while(studInSubject.firstChild){
		studInSubject.removeChild(studInSubject.firstChild)
	}
	
	getStudentsInSubject(subjectId, function(students) {
		students.forEach(function(student){
			var li = document.createElement("li")
			var text = document.createElement("h4")
			dbRef.child("users/students/" + student.key).once("value", function(stud){
					text.innerHTML = stud.username
			})
			var btnUp = document.createElement("button")
			btnUp.innerHTML = "Upgrade"
			var key = student.key
			btnUp.onclick = function(){
				upgradeToStudentAss(key, subjectId)
			}
		
			var btnDown = document.createElement("button")
			btnDown.innerHTML = "Downgrade"
			btnDown.onclick = function(){
				downgradeFromStudentAss(key, subjectId)
			}
			li.appendChild(text)
			li.appendChild(btnUp)
			li.appendChild(btnDown)
			studInSubject.appendChild(li)
		})
	})
}

function getStudentsFunc(){
	upgradeToStudentAss('"dOE3Nf6T8KY5iH252q5Ou1zR9083"', "Algdat 2017 Vår")
}

function getStudentFromSubject(studentId, subjectId, callback){
	dbRef.child("subjects/" + subjectId + "/students").once("value", function(students){
		var stud = null
		students.forEach(function(student){
			if(studentId == student.key){
				stud = student
			}
		})
		callback(stud)
	});
}

function upgradeToStudentAss(studentId, subjectId){
	getStudentFromSubject(studentId, subjectId, function(student) {
		if(student){
			student.ref.set({
				studass: true
			})
		}
		else{
			console.log("Student is not in subject")
		}
	});
}

function downgradeFromStudass(studentId, subjectId){
	getStudentFromSubject(studentId, subjectId, function(student) {
		if(student){
			student.ref.set({
				studass: false,
			})
		}
		else{
			console.log("Student is not in subject")
		}
	})
}

//kjetils piss
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

init();
