/* CSS magic only */

function sendVal(val) {
    var myUrl="./application.html"+"?"+"val="+val;
    window.location.assign(myUrl);
 }

 var ChangePage = function(){
    window.location.href="./findRoute.html";

 }

//  document.getElementById('button1').addEventListener("click", ChangePage);
$('#button1').click(function(e){
    window.location.href="./application.html"
})

$('#button2').click(function(e){
    window.location.href="./findRoute.html"
})
