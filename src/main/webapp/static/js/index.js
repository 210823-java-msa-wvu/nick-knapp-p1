<<<<<<< HEAD
=======
function start(){

    let cookies = document.cookie;

    console.log(cookies);
    console.log(typeof cookies);


    //get cookies
    //check if there is a previous failed login,  if so, print a message
    if (cookies != null){// or ""?
    console.log(getCook("loginStatus"));
            console.log(typeof getCook("loginStatus"));
        if (getCook("loginStatus") === "failed"){

            alert("invalid login credentials.  please try again.");
        }
    }


}


>>>>>>> nick_knapp
async function login() {

    let url = "http://localhost:8080/Project1/static/index.html";

<<<<<<< HEAD
=======
    //JS forms validation: https://www.w3schools.com/js/js_validation.asp


>>>>>>> nick_knapp
    let user = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    }

<<<<<<< HEAD
    console.log(user);
=======
    //console.log(user);
>>>>>>> nick_knapp

    let res = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
<<<<<<< HEAD
        body: JSON.stringify(user)
=======
        body: JSON.stringify(user),
        credentials: "include"
>>>>>>> nick_knapp
    });

    let resJson = await res.json()
    .then(res => {
<<<<<<< HEAD
        console.log(res);
=======
        debugger;
        console.log(res);
        console.log(typeof res);
        /*if (res == "-1"){
        //clear forms
        document.getElementById("username").reset();
        document.getElementById("password").reset();
        //error message
        alert("invalid login credentials");*/


>>>>>>> nick_knapp
    })
    .catch(error => {
        console.log(error);
    })

<<<<<<< HEAD
}
=======
}

function getCook(cookiename)
  {
  // Get name followed by anything except a semicolon
  var cookiestring=RegExp(cookiename+"=[^;]+").exec(document.cookie);
  // Return everything after the equal sign, or an empty string if the cookie name not found
  return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
  }
>>>>>>> nick_knapp
