function Lecturify() {
    
};

Lecturify.prototype.speedUp = function(ref) {
	console.log(ref);
    ref.transaction(function(tall){
    	console.log(tall);
        if(tall) {
        	console.log(tall);
        	tall.val().pace++;
        }
        //tall.val().pace++;
        //return tall;
    });
};

Lecturify.prototype.slowDown = function(ref) {
    firebase.database().ref(ref).transaction(function(tall){
        if(tall){
            tall--;
        }
        //return tall;
    });
};