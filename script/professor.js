console.log(sessionStorage.bruker);
console.log(sessionStorage.userType);
<<<<<<< HEAD
sessionStorage.currentSubjects = []
subjectListener(sessionStorage.bruker, professor)
getUserName(sessionStorage.bruker, "professors", getUserNamerCallback)
=======
sessionStorage.currentSubjects = [];
subjectListener(sessionStorage.bruker);
getUserName(sessionStorage.bruker, "professors", getUserNamerCallback);
>>>>>>> 3c3d594e49777b36233b30884b9dd0872f430489

// logg professor ut
function logoutAction() {
	logout(sessionStorage.bruker, "professors");
}

function addSubject() {
	var liElement = document.createElement("li");
	var input = document.getElementById("newSubjectName").value;
	liElement.innerHTML = input;
	liElement.onclick = "chooseSubject(" + this.innerHTML + ")";
	/* TODO(make server handle new subject) */
	dbRef.child("subjects/" + input).set({
		id : input
	});
	dbRef.child("users/professors/" + sessionStorage.bruker + "/subscriptions")
			.push({
				id : input
			});
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