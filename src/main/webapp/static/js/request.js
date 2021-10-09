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

async function favTutorial() {//dropdown list; https://www.javatpoint.com/how-to-create-dropdown-list-using-javascript
var mylist = document.getElementById("events");
document.getElementById("favourite").value = mylist.options[mylist.selectedIndex].text;
let thisEvent = mylist.options[mylist.selectedIndex].text;
//fetch event data, print event data for this event to screen
let url ='http://localhost:8080/Project1/events';


   /* console.log("printing json descriptions (?)")
    let response = await fetch(url);//do I need to have 'credentials: 'include' for cookies? https://stackoverflow.com/questions/34558264/fetch-api-with-cookie
    .then ((response) => {
        response.json().then((jsonResponse) => {
        console.log(jsonResponse)
      })
      // assuming your json object is wrapped in an array
      response.json().then(i => i.forEach(i => console.log(i.description)))
    })*/
    let res = await fetch(url);
    let resJson = await res.json()
   .then((resJson) => {


   // This is where we will do our DOM manipulation
           let dataSection = document.getElementById('data');

           // Create a new element
           //let nameTag = document.createElement('h3');

           // Create an unordered list element
               let abilities = document.createElement('ul');
               dataSection.innerHTML += 'Event Info<br>';
               dataSection.appendChild(abilities);

                console.log(res.description)
                console.log(res.cost)
                console.log(res.date)


           /*for (let element of parsedData){
               let abli = document.createElement('li');
               abli.innerHTML = element;
               abilities.appendChild(abli);
           }*/

            //var options = ["1", "2", "3", "4", "5"];
            //var options = resJson.description;//put event descriptions into a list
            let events = [];
            for(let j = 0; j < resJson.length; j++){
                if (thisEvent == resJson[j].description){
                    let x = resJson[j]
                    console.log(x);
                    let myData = [x.description, [x.date.month, x.date.dayOfMonth, x.date.year ], [x.time.hour, x.time.minute], x.location, x.cost, x.eventType, x.gradingFormat, x.passingGrade];
                    let myDataLabels = ["Event Name: ", "Event Date: ", "Event Time: ", "Event Location: ", "Event Cost ($): ", "Event Type: ", "Event Grading Format: ", "Passing Grade: "]
                    //print data to screen
                    //populateData(resJson[j]);
                    let k = 0;
                    for (let element of myData){
                        let abli = document.createElement('li');
                        abli.innerHTML = myDataLabels[k] + element;
                        abilities.appendChild(abli);
                        k ++;
                    }



                }
            }
            }).catch((error) => {
                      console.log(error);
                  });
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



let url ='http://localhost:8080/Project1/events';


   /* console.log("printing json descriptions (?)")
    let response = await fetch(url);//do I need to have 'credentials: 'include' for cookies? https://stackoverflow.com/questions/34558264/fetch-api-with-cookie
    .then ((response) => {
        response.json().then((jsonResponse) => {
        console.log(jsonResponse)
      })
      // assuming your json object is wrapped in an array
      response.json().then(i => i.forEach(i => console.log(i.description)))
    })*/
    let res = await fetch(url);
    let resJson = await res.json()
   .then((resJson) => {
        console.log(resJson);
        console.log(typeof resJson)

        //add events to dropdown
        var select = document.getElementById("events");
            //var options = ["1", "2", "3", "4", "5"];
            //var options = resJson.description;//put event descriptions into a list
            let options = [];
            for(let j = 0; j < resJson.length; j++){
                options[j] = resJson[j].description;
            }
            //let options = resJson.description;
            console.log(options);


            for(var i = 0; i < options.length; i++) {
                var opt = options[i];
                var el = document.createElement("option");
                el.textContent = opt;
                el.value = opt;
                select.appendChild(el);
            }
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

function populateData(res){

    // This is where we will do our DOM manipulation
        let dataSection = document.getElementById('data');

        // Create a new element
        //let nameTag = document.createElement('h3');

        // Create an unordered list element
            let abilities = document.createElement('ul');
            dataSection.innerHTML += 'Event Info<br>';
            dataSection.appendChild(abilities);

             console.log(res.description)
             console.log(res.cost)
             console.log(res.date)


        /*for (let element of parsedData){
            let abli = document.createElement('li');
            abli.innerHTML = element;
            abilities.appendChild(abli);
        }*/
}