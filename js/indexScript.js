/* CSS magic only */

function sendVal(val) { 
    var myUrl="./application.html"+"?"+"val="+val; 
    window.location.assign(myUrl);
 }

 function goApp(){
    window.location.assign("./application.html");
 }

 function goRoute(){
    window.location.assign("./findRoute.html");
 }