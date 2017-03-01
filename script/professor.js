console.log(sessionStorage.bruker);
console.log(sessionStorage.userType);


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
	subscriptionsId = fag.value + " " + fagkode.value;
	console.log(subscriptionsId)
	//Legger til faget under "subjects"
	dbRef.ref("subjects/" + fag.value).set({
		id: fagkode.value
	})
	//Legger til faget i subscriptions til brukeren
	dbRef.ref("users/professors/" + sessionStorage.bruker + "/subscriptions").push({
		id: subscriptionsId
	})

	fag.value = ""
	fagkode.value = ""

}

// TODO(new function): deleteSubcjet()

function getUserNamerCallback(username) {
	navn = username.replace("@stud.ntnu.no", "");
	alertOfChange("Welcome, " + navn + "!");
}

function newLecture() {
	var subject = getSubject();
	var day = getDate();

	// create new lecture with the supplied info and add to database
	dbRef.child("lectures/" + subject).set({
		date : day
	});
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

function returnSubjectList() {
	var subjectList =document.getElementById("subjectList").childNodes;
    console.log(subjectList[0]);
}