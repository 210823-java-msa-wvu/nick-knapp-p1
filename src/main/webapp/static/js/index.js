//get cookies
//check if there is a previous failed login,  if so, print a message
var cookies = document.cookie;
//console.log("login cookies")
console.log(cookies);
if (cookies != null){// or ""?
    if (getCook("loginStatus") === "failed"){
        alert("invalid login credentials.  please try again.")
    }
}


async function login() {

    let url = "http://localhost:8080/Project1/static/index.html";

    //JS forms validation: https://www.w3schools.com/js/js_validation.asp


    let user = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    }

    //console.log(user);

    let res = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user),
        credentials: "include"
    });

    let resJson = await res.json()
    .then(res => {
        console.log(res);
        console.log(typeof res);
        /*if (res == "-1"){
        //clear forms
        document.getElementById("username").reset();
        document.getElementById("password").reset();
        //error message
        alert("invalid login credentials");*/


    })
    .catch(error => {
        console.log(error);
    })

}

function getCook(cookiename)
  {
  // Get name followed by anything except a semicolon
  var cookiestring=RegExp(cookiename+"=[^;]+").exec(document.cookie);
  // Return everything after the equal sign, or an empty string if the cookie name not found
  return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
  }