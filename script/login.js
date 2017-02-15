onLogin = function() {
	this.user = document.getElementById("user").value;
	  this.pass = document.getElementById("pass").value;
	  var professor = document.getElementById("r2");
	  firebase.auth().signInWithEmailAndPassword(this.user, this.pass).catch(
	    error => console.log(error.message));
};

onRegister = function() {
	this.user = document.getElementById("R_user").value;
	  this.pass = document.getElementById("R_pass").value;
	  if(this.user != "" && this.pass != ""){
	    firebase.auth().createUserWithEmailAndPassword(this.user, this.pass).catch(
	      error => console.log(error.message));
	  }else{
	    alert("Invalid information");
	  }
};

updateUser = function(user) {
	  var student1 = document.getElementById("r1");
	  var student2 = document.getElementById("radio1");
	  var dbRef = firebase.database().ref();
	  if(user){
	    if(student1.checked || student2.checked){
	      dbRef.child("users/students/" + user.uid).set({
	        email: user.email
	      }).then(window.location.href = "../html/main.html");
	    }
	    else{
	      dbRef.child("users/professors/" + user.uid).set({
	        email: user.email
	      }).then(window.location.href = "../html/main.html");
	    }
	    }
	    else{
	    console.log("not logged in");
	  }
};

//setter opp struktur for databasen
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

    this.btnLogin.addEventListener("click", this.onLogin);
    this.R_btnLogin.addEventListener("click", this.onRegister);
    // SJEKKER OM BRUKER TILSTANDEN HAR ENDRET SEG
    // Hvis du gitt ut av nettsiden uten å logge inn, kommer du automatisk inn
    firebase.auth().onAuthStateChanged(user => {
      updateUser(user);
    });
}
