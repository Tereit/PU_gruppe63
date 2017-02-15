function Lecturify() {
    
};

Lecturify.prototype.speedUp = function(ref) {
    firebase.database().ref(ref).transaction(function(tall){
        if(tall){
            tall++;
        }
        return tall;
    })
};

Lecturify.prototype.slowDown = function(ref) {
    firebase.database().ref(ref).transaction(function(tall){
        if(tall){
            tall--;
        }
        return tall;
    })
};