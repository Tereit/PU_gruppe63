/**
 * Created by Martin Kostveit on 22.02.2017.
 */

function createProfessor() {
	var user = document.getElementById("R_profID")
	var pass = document.getElementById("R_profPass")
	if(!user.value.includes("@ntnu.no")){
		user.value = user.value + "@ntnu.no";
	}
	if(user.value != "" || pass.value != "" || pass.value.length > 4){
	    firebase.auth().createUserWithEmailAndPassword(user.value, pass.value).catch(
	        error => alert(error.message));
	}else{
	    alert("Invalid information");
			user.value = "";
			pass.value = "";
	}
};

function updateProf(prof) {
	if (prof) {
		firebase.database().ref("users/professors/" + JSON.stringify(prof.uid)).set({
			username: prof.email
		}).then(function(){
			alert("Professor created!");
			var user = document.getElementById("R_profID").value = "";
			var pass = document.getElementById("R_profPass").value = "";
		}
		);
	}
}

window.onload = function() {
	firebase.auth().onAuthStateChanged(user => {
		updateProf(user);
	});
};
