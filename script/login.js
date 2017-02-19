function checkIfProfessorExist(user, pass){
	 db = firebase.database().ref();
	 db.child("users/professors").once("value").then(function(snapshot){
		console.log(snapshot.val())
		for (var key in snapshot.val()){
			console.log(snapshot.val()[key].username)
			if(user == snapshot.val()[key].username){
				console.log("true professor!");
				onLogin(user, pass);
			}
		}
	})
};

function onLogin(user, pass){
	console.log(user)
	console.log(pass)
	if (user == "" || pass == ""){
		alert("Invalid information");
		window.location.reload();
	}
	else if(pass.length < 4){
		alert("Password must be longer than 4 characters!")
		window.location.reload();
	}
	else{
		console.log("DU ER LOGGET INN")
		firebase.auth().signInWithEmailAndPassword(user, pass).catch(
		error => alert(error.message));
	}
}


function onLoginAction() {
		var user = document.getElementById("user").value;
	  var pass = document.getElementById("pass").value;
		var professorRadio = document.getElementById("r2");
		if(!user.includes("@stud.ntnu.no")){
			user = user + "@stud.ntnu.no";
		}
		if(professorRadio.checked){
			checkIfProfessorExist(user, pass)
		}
		else{
			onLogin(user, pass);
		}
};

function onRegister() {
		var user = document.getElementById("R_user").value
	  var pass = document.getElementById("R_pass").value
		if(!user.includes("@stud.ntnu.no")){
			user = user + "@stud.ntnu.no";
		}
	  if(user != "" || pass != "" || pass.length > 4){
	    firebase.auth().createUserWithEmailAndPassword(this.user, this.pass).catch(
	      error => alert(error.message));
	  }else{
			window.location.reload();
	    alert("Invalid information");
	  }
};

function updateUser(user) {
	  var student1 = document.getElementById("r1");
	  var dbRef = firebase.database().ref();
	  if(user){
			sessionStorage.bruker = JSON.stringify(user.uid);
	    if(student1.checked){
				sessionStorage.userType = "student"
	      dbRef.child("users/students/" + user.uid).set({
	        username: user.email
	      }).then(window.location.href = "../html/main.html");
	    }
	    else{
				sessionStorage.userType = "professor"
	      dbRef.child("users/professors/" + user.uid).set({
	        username: user.email
	      }).then(window.location.href = "../html/professorMain.html");
	    }
	    }
	    else{
	    console.log("not logged in");
	  }
}


window.onload = function() {
	  this.btnLogin = document.getElementById("btnLogin");
    this.R_btnLogin = document.getElementById("R_btnLogin");

    this.btnLogin.addEventListener("click", onLoginAction);
    this.R_btnLogin.addEventListener("click", onRegister);
    // SJEKKER OM BRUKER TILSTANDEN HAR ENDRET SEG
    // Hvis du gitt ut av nettsiden uten å logge inn, kommer du automatisk inn
    firebase.auth().onAuthStateChanged(user => {
      updateUser(user);
    });
}
