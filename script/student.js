//console.log(sessionStorage.bruker);

currentSubjects = [];

function init() {
    subjectListener(sessionStorage.bruker, "students");
    getUserName(sessionStorage.bruker, "students", getUserNameCallback);
}

function getUserNameCallback(username) {
	alertOfChange("Welcome, "+username);
}







window.onload = function () {
	init();
};
