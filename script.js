var json = require('movies.json');

var exempel = "Hej Daniel";
window.onload = function() {
//when the document is finished loading, replace everything
//between the <a ...> </a> tags with the value of splitText
document.getElementById("func").innerHTML=exempel;
}