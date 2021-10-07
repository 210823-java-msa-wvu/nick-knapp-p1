 ///request.js
 //Functionalities/features/buttons
 //     1. view past requests button
 //     2. select event button
 //     3. submit request button
 //     4. upload a file



 //once user logs in, get the user's subordinates' requests from the database
 //if nonzero number of requests, display message: "you have active requests"
 //and print request info to screen, allow input: approve/deny/request more info from requester and/or subordinate
 //if request more info, send notification to appropriate user(s) about status update


//Possibly use to verify whether user has subordinates with new requests
// var isAuth = ('{{ user.isauthenticated}}');
//    if (isAuth) true;
//
//    document.getElementById("menuProfile").style.display="block";
//    document.getElementById("showProfile").style.display="none";

//https://www.tabnine.com/academy/javascript/how-to-set-cookies-javascript/
let cookies = document.cookie;
console.log(cookies)

async function loadNewRequests(){

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

 var select = document.getElementById("selectNumber");
    var options = ["1", "2", "3", "4", "5"];

    for(var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }

//document uploading
//https://masteringjs.io/tutorials/fundamentals/upload-file
const input = document.querySelector('input[type="file"]');
const file = input.files[0];

file instanceof File; // true
file instanceof Blob; // true

async function loadMyRequests(){
}

async function addEvent(){
let url ='http://localhost:8080/LibraryServlet/authors';

    let author = {
        firstName: document.getElementById('authorFirst').value,
        lastName: document.getElementById('authorLast').value
    }

    let res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(author),
        headers: {
            'Content-Type': 'application/json'
        }
    });
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