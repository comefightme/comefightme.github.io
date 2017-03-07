function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

// Get a reference to the database service
var database = firebase.database();

var count = 1;
    function setColor(btn, color) {
        var property = document.getElementById(btn);
        if (count == 0) {
            property.style.backgroundColor = "#FFFFFF"
            count = 1;        
        }
        else {
            property.style.backgroundColor = "#7FFF00"
            count = 0;
        }
    }
	
$(document).ready(function () {
	$("#submit").click(function () {
		database.ref().push($("#feedback").val());
	});
});





//authentication

var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified;
var provider = new firebase.auth.GoogleAuthProvider();
function toggleSignIn() {
  if(user) {
	  // user is signed in, sign out
	  firebase.auth().signOut().then(function() {
		  // Sign-out successful.
		  console.log("Sign out successful");
	  }, function(error) {
		  // An error happened.
		  console.log("Sign out error");
	  });
  } else {
	  firebase.auth().signInWithRedirect(provider);
  }
}
var once = 0;
$(document).ready(function () {
  once += 34802;
  $("#auth").click(function () {
	  toggleSignIn();
  });
  if(user){
	  $("#auth").text("Sign Out");
	  user = firebase.auth().currentUser;
  } else if(once < 1){
	  firebase.auth().signInWithRedirect(provider);
	  user = firebase.auth().currentUser;
	  $("body").text(once);
	  $("#auth").text("Sign in");
  }
  firebase.auth().onAuthStateChanged(function(User) {
	  if (User) {
		  // User is signed in.
		  $("#auth").text("Sign Out");
		  user = firebase.auth().currentUser;
		  user.providerData.forEach(function (profile) {
			  console.log("Sign-in provider: "+profile.providerId);
			  console.log("  Provider-specific UID: "+profile.uid);
			  console.log("  Name: "+profile.displayName);
			  console.log("  Email: "+profile.email);
			  console.log("  Photo URL: "+profile.photoURL);
		  });
	  } else {
		  // No user is signed in.
		  firebase.auth().signInWithRedirect(provider);
		  user = firebase.auth().currentUser;
		  $("#auth").text("Sign in");
	  }
  });
});
var kdata = new Firebase(); 


$('#messageInput').on('keypress', function(e) {
  if (e.keyCode == 13) {
    sendMessage(e);
  }
});
$('#btnSendMessage').on('click', function(e) {
  sendMessage(e);
});

function sendMessage() {

  var name = $('#nameInput').val();
  var text = $('#messageInput').val();

  if (name == '' || text == '') {
    return false;
  }

  saveNickName(name);
  kdata.push({
    name: name,
    text: text
  });
  $('#messageInput').val('');

}

function saveNickName(nickname) {
  localStorage.setItem('nickname', nickname)
}

function loadNickName() {
  var nickname = localStorage.getItem('nickname');
  if (nickname) {
    $('#nameInput').val(nickname);
  }
}


kdata.on('child_added', function(snapshot) {
  var message = snapshot.val();
  $('<div/>').text(message.text).prepend($('<em/>').text(message.name + ': ')).prependTo($('#messagesDiv'));
});

$(function() {

  loadNickName();

});