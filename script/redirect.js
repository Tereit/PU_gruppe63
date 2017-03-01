function checkLoginStatus() {
	if(!firebase.auth().currentUser) {
		window.location = "index.html";
	}
}
checkLoginStatus();