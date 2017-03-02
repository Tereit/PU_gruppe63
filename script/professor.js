console.log(sessionStorage.bruker);
console.log(sessionStorage.userType);

function init() {
}

//Henter alle professor sinde subscriptions, altså sin fag som han har lagd
subjectListener(sessionStorage.bruker, "professors");

//Pop-up notification med brukernavn
getUserName(sessionStorage.bruker, "professors", getUserNamerCallback);

//Firebase database variabel
dbRef = firebase.database();


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

	if(fag.value != "" || fagkode.value != "" || fagSemester.value != "" || fagkode.value.includes("-") == true){
		subscriptionsId = fagkode.value.toLowerCase() + " " + fagAr + " " + fagSemester.value;
		console.log(subscriptionsId)
		//Legger til faget under "subjects"
		dbRef.ref("subjects/" + fag.value).set({
			id: fagkode.value,
			year: fagAr
		})
		dbRef.ref("subjects/" + fag.value + "/" + fagAr + "/").set({
			semester: fagSemester
		})
		dbRef.ref("subjects/" + fag.value + "/" + fagAr + "/" + fagSemester.value).set({
			professor: sessionStorage.bruker
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

// TODO(new function): deleteSubcjet()

function getUserNamerCallback(username) {
	navn = username.replace("@stud.ntnu.no", "");
	alertOfChange("Welcome, " + navn + "!");
}

function newLecture() {
	//var subject = getSubject();
	//var day = getDate();

	// create new lecture with the supplied info and add to database
	/*
	dbRef.child("lectures/" + subject).set({
		date : day
	});
	*/
	document.getElementById("createLecturePopUp").style.display="none";
    alertOfChange("Successfully created new lecture");
}

function getSubject() {
	// get the correct subject code and semester
	var subject = document.getElementById("subjectName").value;
	var code = document.getElementById("subjectCode").value;
	var semester = document.getElementById("semester").value;

	return "nothing";
}

function getDate() {
	// TODO: get date from create lecture form

	// if no date supplied from form use current date
	return new Date();
}

function selectSubject(subjectName) {
	document.getElementById("currentSubject").style.display="block";
	document.getElementById("currentSubjectName").innerHTML=subjectName;
	console.log(subjectName);
}

function displayCreateLecture() {
	document.getElementById("createLecturePopUp").style.display="block";
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
