/**
 * Created by Martin Kostveit on 22.02.2017.
 */

function createProfessor() {
	var user = document.getElementById("R_profID").value
	var pass = document.getElementById("R_profPass").value
	if(!user.includes("@stud.ntnu.no")){
		user = user + "@stud.ntnu.no";
	}
	if(user != "" || pass != "" || pass.length > 4){
	    firebase.auth().createUserWithEmailAndPassword(user, pass).catch(
	        error => alert(error.message));
	}else{
	    window.location.reload();
	    alert("Invalid information");
	}
};

function updateProf(prof) {
    console.log(prof);
	if (prof) {
		firebase.database().ref("users/professors/" + JSON.stringify(prof.uid)).set({
			username: prof.email
		});
	}
}

window.onload = function() {
	firebase.auth().onAuthStateChanged(user => {
		updateProf(user);
	});
};