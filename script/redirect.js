function checkLoginStatus() {
	firebase.auth().onAuthStateChanged(user => {
		if(user){
			// do nothing
		}else{
			console.log("not logged in");
			window.location = "index.html";
		}
	});
}
checkLoginStatus();