function checkIfProfessorExist(username){
	professorUsernames = [];
	db = firebase.database().ref();
	db.child("users/professors").once("value").then(function(snapshot){
		var object = snapshot.val();
		for (var key in object){
			professorUsernames.push(object[key].email)
		}
	})
	if(professorUsernames.indexOf(username) != -1){
		return true;
	}
	else{
		return false;
	}
};

function onLogin(user, pass){
	if (user != "" || pass != ""){
		alert("Invalid information");
		window.location.reload();
	}
	else if(pass.length < 4){
		alert("Password must be longer than 4 characters!")
		window.location.reload();
	}
	else{
		firebase.auth().signInWithEmailAndPassword(this.user, this.pass).catch(
		error => console.log(error.message));
	}
}


function onLoginAction() {
		var user = document.getElementById("user").value;
	  var pass = document.getElementById("pass").value;
		var professorRadio = document.getElementById("r2");

		if(professorRadio.checked){
			if(checkIfProfessorExist(user)){
				onLogin(user, pass);
			}
			else{
				alert("You are not an professor!")
				window.location.reload();
			}
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
	  var student2 = document.getElementById("radio1");
	  var dbRef = firebase.database().ref();
	  if(user){
	    if(student1.checked || student2.checked){
	      dbRef.child("users/students/" + user.uid).set({
	        username: user.email
	      }).then(window.location.href = "../html/main.html");
	    }
	    else{
	      dbRef.child("users/professors/" + user.uid).set({
	        username: user.email
	      }).then(window.location.href = "../html/main.html");
	    }
	    }
	    else{
	    console.log("not logged in");
	  }
};


//setter opp struktur for databasen -- Skal ikke kjøres med mindre databasen trenger struktur!
function databaseStructure() {
  console.log("kjører");
  var lecture = "subjects/algdat/lecture1";
  var questions = "messages/questions";
  var answer = "messages/answers";

  firebase.database().ref().child(lecture).set({
    navn: "random",
    id: "kult",
    currentUsers: 100,
		pace: 50,
  })
  firebase.database().ref().child(questions).set({
    question: "Hvor kul er kjetil",
  })
  firebase.database().ref().child(answer).set({
    answer: "martin er kjempe teit",
  })

};

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
