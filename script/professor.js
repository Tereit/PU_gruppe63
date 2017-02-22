/*
var random = sessionStorage.bruker
var type = sessionStorage.userType
console.log(random)
console.log(type)
*/
console.log(sessionStorage.bruker)


function addSubject() {
    var liElement = document.createElement("li");
    input = document.getElementById("newSubjectName").value;
    liElement.innerHTML = input
    liElement.onclick="chooseSubject("+this.innerHTML+")";
    document.getElementById("subjectList").appendChild(liElement);
    /*TODO(make server handle new subject)*/
    createSubject(input, sessionStorage.bruker)
}


function chooseSubject(subjectName) {
    console.log(subjectName);
}

getSubjects();
