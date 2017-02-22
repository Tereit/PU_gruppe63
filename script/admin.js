/**
 * Created by Martin Kostveit on 22.02.2017.
 */

function createProfessor() {
    
}

function onRegister() {
    setSessionStorage();
    var user = document.getElementById("R_user").value
    var pass = document.getElementById("R_pass").value
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