function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

// Get a reference to the database service
var database = firebase.database();


$(document).ready(function () {
	$("#submit").click(function () {
		database.ref().push($("input[type='text']").val());
	});
});