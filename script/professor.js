/*
var random = sessionStorage.bruker
var type = sessionStorage.userType
console.log(random)
console.log(type)
*/
function addSubject() {
    var liElement = document.createElement("li");
    liElement.innerHTML=document.getElementById("newSubjectName").value;
    document.getElementById("subjectList").appendChild(liElement);
    /*TODO(make server handle new subject)*/
}