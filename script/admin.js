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
        addToList(professors, "allProfessors", "professors");
    });
}

function getAllStudents() {
    var students = [];
    dbRef.child("users/students").once('value').then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            students.push(childSnapshot.val().username);
        })
        addToList(students, "allStudents", "students");
    });
    console.log(students);
}

function getAllSubjectsCallback(subjects) {
	console.log(subjects);
	addToList(subjects, "allSubjects", "subjects")
}
function addToList(type, printTolist, referenceInDB) {
    var allList = document.getElementById(printTolist);
    for(var i=0; i<type.length; i++) {
        var liElement = document.createElement("li");
        this.deleteButton = document.createElement("button");
        this.deleteButton.innerHTML="delete";
        this.deleteButton.value=type[i];
        this.deleteButton.onclick=function () {
            deleteElement(this.value, referenceInDB);
        };
        liElement.innerHTML=type[i];
        liElement.appendChild(this.deleteButton);
        allList.appendChild(liElement);
    }
}

function deleteElement(element, referenceInDB) {
	console.log(element, referenceInDB);
	//TODO(new function): delete subject
}

window.onload = function() {
	init();
};
