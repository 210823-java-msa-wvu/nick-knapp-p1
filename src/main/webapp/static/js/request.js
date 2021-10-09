 //request.js
 //Functionalities/features/buttons
 //     1. view past requests button
 //     2. select event button
 //     3. submit request button
 //     4. upload a file

 //once user logs in, get the user's subordinates' requests from the database
 //if nonzero number of requests, display message: "you have active requests"
 //and print request info to screen, allow input: approve/deny/request more info from requester and/or subordinate
 //if request more info, send notification to appropriate user(s) about status update

//***********************************************************************************************************************

//CHECK FOR USER ID (FROM COOKIE(?))
//USE USER ID TO GET SUBORDINATE'S REQUESTS IF ANY
//IF NONZERO AMOUNT OF SUBORDINATE'S REQUESTS
//      DISPLAY NOTIFICATION AND PRINT REIMBURSEMENT REQUESTS (RRS) TO WEBPAGE
//      DISPLAY RADIO BUTTON THAT ALLOWS SUPERVISOR TO APPROVE, DENY, OR REQUEST MORE INFO FROM EMPLOYEE, SUPERVISOR, DEPT HEAD, ETC.


//Possibly use to verify whether user has subordinates with new requests
// var isAuth = ('{{ user.isauthenticated}}');
//    if (isAuth) true;
//
//    document.getElementById("menuProfile").style.display="block";
//    document.getElementById("showProfile").style.display="none";

function favTutorial() {//dropdown list; https://www.javatpoint.com/how-to-create-dropdown-list-using-javascript
var mylist = document.getElementById("myList");
document.getElementById("favourite").value = mylist.options[mylist.selectedIndex].text;
}

//https://www.tabnine.com/academy/javascript/how-to-set-cookies-javascript/
var cookies = document.cookie;
console.log(cookies)

async function loadNewRequests(){//do this on page load.

    //get user id
    //let userid = ;

    let url = "http://localhost:8080/Project1/loadrequests";
    //url += userid;

 let res = await fetch(url)
    let data = await res.json()

    .then(data => {
        console.log(data);
        populateData(data);
    })
    .catch(err => console.log(err));
}



//document uploading
//https://masteringjs.io/tutorials/fundamentals/upload-file
//var input = document.querySelector('input[type="file"]');
//var file = input.files[0];
//file instanceof File; // true
//file instanceof Blob; // true

//async function loadMyRequests(){
//}

async function addEvent(){//event dropdown/select event

/*var select = document.getElementById("selectNumber");
    var options = ["1", "2", "3", "4", "5"];

    for(var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }*/

let url ='http://localhost:8080/Project1/events';



    let res = await fetch(url);
    let resJson = await res.json()
    .then((res) => {
        console.log(res);
    }).catch((error) => {
        console.log(error);
    });

    // // traditional
    // try {
    //     let result = await res.json();
    //     console.log(result);
    // } catch (error) {
    //     console.log(error)
    // }

}

//dropdown with events
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

async function loadEvents(){
    let url = "http://localhost:8080/Project1/events";

   let res = await fetch(url)
       let data = await res.json()

       .then(data => {
           console.log(data);
           populateData(data);
       })
       .catch(err => console.log(err));

}

//upload files
//https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
/*const formData = new FormData();
const photos = document.querySelector('input[type="file"][multiple]');

formData.append('title', 'My Vegas Vacation');
for (let i = 0; i < photos.files.length; i++) {
  formData.append(`photos_${i}`, photos.files[i]);
}

fetch('https://example.com/posts', {
  method: 'POST',
  body: formData,
})
.then(response => response.json())
.then(result => {
  console.log('Success:', result);
})
.catch(error => {
  console.error('Error:', error);
});*/


async function newRequest(){



    let url = "http://localhost:8080/Project1/";

    let request = {
        eventname: document.getElementById('eventname').value,
        justification: document.getElementById('justification').value,
        cost: document.getElementById('cost').value,
        missedworktime: document.getElementById('missedworktime').value
        //also need to send event id back; properties need to create Java object
    }

    console.log(request);

    let res = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(request)
    });

    let resJson = await res.json()
    .then(res => {
        console.log(res);
    })
    .catch(error => {
        console.log(error);
    })
}

//window.onload = addEvent;//get events as soon as page loads