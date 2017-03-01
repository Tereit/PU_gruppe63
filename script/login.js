function checkIfProfessorExist(user, pass){
	isProfessor = false
	 db = firebase.database().ref();
	 db.child("users/professors").once("value").then(function(snapshot){
		for (var key in snapshot.val()){
			if(user == snapshot.val()[key].username){
				isProfessor = true
				sessionStorage.userType = "professor";
			}
		}
		if(isProfessor){
			onLogin(user, pass)
		}
		else{
			alert("You are not registered as a professor!")
		}
	})
};

function onLogin(user, pass){
		firebase.auth().signInWithEmailAndPassword(user, pass).catch(
		error => alert(error.message));
}

function setSessionStorage(){
	var student1 = document.getElementById("r1");
	if(student1.checked){
		sessionStorage.userType = "student";
	}
	else{
		sessionStorage.userType = "professor";
	}
}

function checkAdmin(user, pass, callbackFailed, callbackSucsess){
	console.log("kjører checkAdmin")
	found = false
	firebase.database().ref("users/admin").once("value", function(snapshot){
		object = snapshot.val()
		for (var key in object){
			console.log(user)
			console.log(object[key].username)
			if(user == object[key].username){
				console.log("Admin found!")
				found = true
				sessionStorage.userType = "admin"
				callbackSucsess(user, pass)
			}
		}
		if(found == false){
			console.log("fant ingen admin")
			callbackFailed(user, pass)
		}
	})
}

function adminSucsessCallback(user, pass){
	console.log("admin logget inn")
	firebase.auth().signInWithEmailAndPassword(user, pass).catch(
		error => alert(error.message)
	)
}

function adminFailedCallback(user, pass){
	console.log("admin ikke funnet")
	if(sessionStorage.userType == "professor"){
		if(!user.includes("ntnu.no")){
			user = user + "@ntnu.no";
		}
		checkIfProfessorExist(user, pass)
	}
	else{
		if(!user.includes("stud.ntnu.no")){
			user = user + "@stud.ntnu.no";
		}
		onLogin(user, pass);
	}
}

function onLoginAction() {
		setSessionStorage()
		var user = document.getElementById("user").value;
	  var pass = document.getElementById("pass").value;
		if (user == "" || pass == ""){
			alert("Invalid information");
			window.location.reload();
		}
		else if(pass.length < 6){
			alert("Password must be longer than 4 characters!")
			window.location.reload();
		}
		else{
			if(!user.includes("stud.ntnu.no")){
				user = user + "@stud.ntnu.no";
			}
			checkAdmin(user, pass, adminFailedCallback, adminSucsessCallback)
		}
};

function onRegister() {
	setSessionStorage();
	var user = document.getElementById("R_user").value
	var pass = document.getElementById("R_pass").value
	if(user != "" || pass != "" || pass.length > 4){

		if(sessionStorage.userType == "professor"){
			if(!user.includes("ntnu.no")){
				user = user + "@ntnu.no";
			}
		}
		else{
			if(!user.includes("stud.ntnu.no")){
				user = user + "@stud.ntnu.no";
			}
		}

		firebase.auth().createUserWithEmailAndPassword(user, pass).catch(
		error => alert(error.message));
  	}else{
		window.location.reload();
		alert("Invalid information");
  	}
};

function updateUser(user) {
	  var dbRef = firebase.database().ref();
	    if(sessionStorage.userType == "student"){
	      dbRef.child("users/students/" + sessionStorage.bruker).update({
	        username: user.email
	      }).then(window.location.href = "../html/student.html");
	    }
			else if(sessionStorage.userType == "admin"){
				window.location.href = "../html/admin.html";
			}
	    else{
	      dbRef.child("users/professors/" + sessionStorage.bruker).update({
	        username: user.email
	      }).then(window.location.href = "../html/professor.html");
	    }
}


function solveSessionStorage(user){
	firebase.database().ref("users").once("value").then(function(snapshot){
		brukere = snapshot.val()
		for (var key in brukere){
			bruk = brukere[key]
			if(key == "professors"){
				for(k in bruk){
					if(k == sessionStorage.bruker){
						sessionStorage.userType = "professor"
					}
				}
			}
			else if (key == "students"){
				for(k in bruk){
					if(k == sessionStorage.bruker){
						sessionStorage.userType = "student"
					}
				}
			}
			else{
					console.log("invalid information")
			}
		}
		console.log(sessionStorage.userType)
		updateUser(user)
	})
}

window.onload = function() {
	  this.btnLogin = document.getElementById("btnLogin");
    this.R_btnLogin = document.getElementById("R_btnLogin");
		sessionStorage.userType = "student";
    this.btnLogin.addEventListener("click", onLoginAction);
    this.R_btnLogin.addEventListener("click", onRegister);
    // SJEKKER OM BRUKER TILSTANDEN HAR ENDRET SEG
    // Hvis du gitt ut av nettsiden uten å logge ut, kommer du automatisk inn
    firebase.auth().onAuthStateChanged(user => {
			if(user){
				sessionStorage.bruker = JSON.stringify(user.uid)
				solveSessionStorage(user)
			}else{
				console.log("not logged in")
			}
    });
}
