/**
 * Created by Martin Kostveit on 22.02.2017.
 *
 */
function init() {
	getAllProfessors();
	getAllStudents();
    getAllSubjects(getAllSubjectsCallback);
}


function createProfessor() {
	var user = document.getElementById("R_profID");
	var pass = document.getElementById("R_profPass");
	if(!user.value.includes("@ntnu.no")){
		user.value = user.value + "@ntnu.no";
	}
	if(user.value != "" || pass.value != "" || pass.value.length > 4){
	    firebase.auth().createUserWithEmailAndPassword(user.value, pass.value)
	    		.then(function(user) {
	    			updateProf(user);
	    			user.value = "";
	    			pass.value = "";
	    		});
	}else{
	    alert("Invalid information");
			user.value = "";
			pass.value = "";
	}
}

function updateProf(prof) {
	if (prof) {
		dbRef.child("users/professors/" + JSON.stringify(prof.uid)).set({
			username: prof.email
		}).then(function(){
			alert("Professor created!");
			document.getElementById("R_profID").value = "";
			document.getElementById("R_profPass").value = "";
		}
		);
	}
}

function getAllProfessors() {
	var professors = [];
	dbRef.child("users/professors").once('value').then(function (snapshot) {
		snapshot.forEach(function (childSnapshot) {
			professors.push(childSnapshot.val().username);
        })
    });
	console.log(professors);
}

function getAllStudents() {
    var students = [];
    dbRef.child("users/students").once('value').then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            students.push(childSnapshot.val().username);
        })
    });
    console.log(students);
}

function getAllSubjectsCallback(subjects) {
	console.log(subjects);
}

window.onload = function() {
	init();
};
