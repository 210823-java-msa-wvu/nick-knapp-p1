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
//var rrEvent = null;

function start(){
    getCookies();
    supervisorButton();
    displayUserInfo();
    selectEvent();
}

function getCookies(){
    var cookies = document.cookie;
    console.log(cookies);
    window.userId = parseInt(getCook("user_id"));
    window.isSupervisor = getCook("supervisor");
}

function supervisorButton(){
    if (window.isSupervisor === "true"){

        document.getElementById("supervisors").style.visibility = "visible";
    } else {
        document.getElementById("supervisors").style.visibility = "hidden";
    }
}

async function displayUserInfo(){

    let url ='http://localhost:8080/Project1/users/' + getCook("user_id");
    let res = await fetch(url, {credentials: "include"})
    let data = await res.json()

    .then(data => {
        //print data to screen
        console.log(data);
        let a = "Welcome, " + data.firstname + " " + data.lastname;
        document.getElementById("welcome").innerHTML = a;
        let b = "Available Balance: $" + data.availableReimbursement;
        document.getElementById("amount").innerHTML = b;
    })
    .catch(err => console.log(err));

}
/*
async function displayUserInfo(){
    const myInfo = getUserInfo();
    return myInfo;
}

async function getUserInfo(){

    let url ='http://localhost:8080/Project1/users/' + getCook("user_id");

    let res = await fetch(url, {credentials: "include"});
    //return resJson = await res.json()
       .then((resJson) => {

        }).catch((error) => {
            console.log(error);
        });
}*/

async function favTutorial() {//dropdown list; https://www.javatpoint.com/how-to-create-dropdown-list-using-javascript
    var mylist = document.getElementById("events");
    document.getElementById("favourite").value = mylist.options[mylist.selectedIndex].text;
    let thisEvent = mylist.options[mylist.selectedIndex].value;
    //window.myEvent = thisEvent;
    window.eventId = parseInt(thisEvent);
    let myEventName = mylist.options[mylist.selectedIndex].text;
    //console.log("my event name: " + myEventName)


    //fetch event data, print event data for this event to screen
    let url ='http://localhost:8080/Project1/events';
    let res = await fetch(url);
    let resJson = await res.json()
        .then((resJson) => {
            // This is where we will do our DOM manipulation

            let dataSection = document.getElementById('data');
            dataSection.innerHTML = "";//clear contents of previously selected event

            // Create an unordered list element
            let abilities = document.createElement('ul');
            dataSection.innerHTML += 'Event Info<br>';
            dataSection.appendChild(abilities);

            //var options = ["1", "2", "3", "4", "5"];
            //var options = resJson.description;//put event descriptions into a list
            //let events = [];
            for(let j = 0; j < resJson.length; j++){
                if (window.eventId == resJson[j].event_id){
                    let x = resJson[j]
                    //console.log(x);
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
            }).catch((error) => { console.log(error); });
}

//https://www.tabnine.com/academy/javascript/how-to-set-cookies-javascript/



//once user logs in, get the user's subordinates' requests from the database
 //if nonzero number of requests, display message: "you have active requests"
 //and print request info to screen, allow input: approve/deny/request more info from requester and/or subordinate
 //if request more info, send notification to appropriate user(s) about status update
/*async function loadNewRequests(){//do this on page load.
//CHECK FOR USER ID (FROM COOKIE(?))
//USE USER ID TO GET SUBORDINATE'S REQUESTS IF ANY
//IF NONZERO AMOUNT OF SUBORDINATE'S REQUESTS
//      DISPLAY NOTIFICATION AND PRINT REIMBURSEMENT REQUESTS (RRS) TO WEBPAGE
//      DISPLAY RADIO BUTTON THAT ALLOWS SUPERVISOR TO APPROVE, DENY, OR REQUEST MORE INFO FROM EMPLOYEE, SUPERVISOR, DEPT HEAD, ETC.

    //get user id
    //let userid = ;

    //if user is supervisor, (parse out of cookies)
    if (getCook("isSupervisor") === "true"){


    //get user id out of cookies
    let userid = getCook("user_id");

    let url = "http://localhost:8080/Project1/loadrequests/" + userid;
    //url += userid;

 let res = await fetch(url, {credentials: "include"})//produces 500 error
    let data = await res.json()

    .then(data => {
        console.log(data);
        let resJson = data;
        //printing active RRs to webpage (assume similar to printing events)
        let dataSection = document.getElementById('data2');
                   dataSection.innerHTML = "";//clear contents of previously selected event

                   // Create an unordered list element
                   let abilities = document.createElement('ul');
                   dataSection.innerHTML += 'Request Info<br>';
                   dataSection.appendChild(abilities);

                    //var options = ["1", "2", "3", "4", "5"];
                    //var options = resJson.description;//put event descriptions into a list

                    for(let j = 0; j < resJson.length; j++){

                            let x = resJson[j]
                            //console.log(x);
                            let myData = [x.userId, x.eventId, x.justification, x.overAvailable, x.status];
                            let myDataLabels = ["User ID: ", "Event ID: ", "Justification: ", "Is Over Available Funds?: ", "Status: "];
                            //print data to screen
                            //populateData(resJson[j]);
                            let k = 0;
                            for (let element of myData){
                                let abli = document.createElement('li');
                                abli.innerHTML = myDataLabels[k] + element;
                                abilities.appendChild(abli);
                                k ++;
                            }
                            //insert forms here
                            //      DISPLAY RADIO BUTTON THAT ALLOWS SUPERVISOR TO APPROVE, DENY, OR REQUEST MORE INFO FROM EMPLOYEE, SUPERVISOR, DEPT HEAD, ETC.
                           *//* createRadioElement("approve", false);
                            createRadioElement("deny", false);
                            createRadioElement("request more info from", false);*//*

                            //https://stackoverflow.com/questions/9275972/creating-dropdown-dynamically-javascript

                            //let select = document.getElementById("data2");
                            let myForm = document.createElement("form");

                            let options = ["approve", "deny", "more info"]
                            for(let i = 0; i < options.length; i++) {
                                            let opt = options[i];
                                            let el = document.createElement("option");
                                            el.textContent = opt;
                                            el.value = opt;
                                            //select.appendChild(el);
                                            dataSection.appendChild(el);




                            ///create a form

                            //create a form, https://stackoverflow.com/questions/3297143/dynamically-create-a-html-form-with-javascript
                            var f = document.createElement("form");
                            f.setAttribute('method',"post");
                            f.setAttribute('action',"/Project1/submitRReview");//submit reimburseemtn request review

                            //create input element
                            var i = document.createElement("input");
                            i.type = "text";
                            i.name = "comments";
                            i.id = "comments" + j;//j should auto convert to string

                            //create a checkbox
                            *//*var c = document.createElement("input");
                            c.type = "checkbox";
                            c.id = "checkbox1";
                            c.name = "check1";*//*

                            //create a button
                            var s = document.createElement("input");
                            s.type = "submit";
                            s.value = "Submit";
                            //function should not be necessary

                            // add all elements to the form
                            f.appendChild(i);
                            //f.appendChild(c);
                            f.appendChild(s);

                            // add the form inside the body
                            //$("body").append(f);   //using jQuery or
                            //document.getElementsByTagName('body')[0].appendChild(f); //pure javascript
                            dataSection.appendChild(f);



                            //doesn't work
                            *//*var dropdown = document.getElementById("data2");
                            var opt = document.createElement("option");
                            opt.text = 'approve';
                            opt.value = 'approve';
                            dropdown.options.add(opt);
                            var opt2 = document.createElement("option");
                                                        opt2.text = 'deny';
                                                        opt2.value = 'deny';
                                                        dropdown.options.add(opt2);
                            var opt3 = document.createElement("option");
                                                        opt3.text = 'request more information';
                                                        opt3.value = 'request more information';
                                                        dropdown.options.add(opt);*//*
                            let input = document.createElement("input");//https://stackoverflow.com/questions/5656392/how-to-create-input-type-text-dynamically
                            input.type = "text";
                            input.className = "css-class-name"; // set the CSS class
                            dataSection.appendChild(input); // put it into the DOM




                    }


        //for each active RR,
        //      radio button: approve, deny, request more info from [employee, employee's supervisor, ...]
        //createRadioElement("approve", false);
        //createRadioElement("deny", false);
        //createRadioElement("request more info from", false);
        //      if checked, add new radio buttons for employee, and employee's supervisor
        //          and create a textbox for any feedback

        //          var input = document.createElement("input");//https://stackoverflow.com/questions/5656392/how-to-create-input-type-text-dynamically
        //            input.type = "text";
        //            input.className = "css-class-name"; // set the CSS class
        //            container.appendChild(input); // put it into the DOM
        //

        //alternative to radio buttons: dropdown



    })
    .catch(err => console.log(err));

    }
}*/

function createRadioElement(name, checked) {//https://stackoverflow.com/questions/118693/how-do-you-dynamically-create-a-radio-button-in-javascript-that-works-in-all-bro
    var radioHtml = '<input type="radio" name="' + name + '"';
    if ( checked ) {
        radioHtml += ' checked="checked"';
    }
    radioHtml += '/>';

    var radioFragment = document.createElement('div');
    radioFragment.innerHTML = radioHtml;

    return radioFragment.firstChild;
}


//document uploading
//https://masteringjs.io/tutorials/fundamentals/upload-file
//var input = document.querySelector('input[type="file"]');
//var file = input.files[0];
//file instanceof File; // true
//file instanceof Blob; // true

//async function loadMyRequests(){
//}

async function selectEvent(){//event dropdown/select event



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
    let res = await fetch(url, {credentials: "include"});//500 error
    let resJson = await res.json()
   .then((resJson) => {
        console.log(resJson);
        console.log(typeof resJson)

        //add events to dropdown
        var select = document.getElementById("events");
            //var options = ["1", "2", "3", "4", "5"];
            //var options = resJson.description;//put event descriptions into a list
            let options = [];
            let eventIDs = []
            for(let j = 0; j < resJson.length; j++){
                //console.log(resJson[j].event_id);
                options[j] = resJson[j].description;
                eventIDs[j] = resJson[j].event_id;
            }
            //let options = resJson.description;
            console.log(options);



            for(var i = 0; i < options.length; i++) {
                var opt = options[i];
                var el = document.createElement("option");
                el.textContent = opt;
                el.value = eventIDs[i];
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
/*function myFunction() {
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

}*/

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


async function submitRR(){
//to do
//
//INPUT VALIDATION
//      make sure user has selected an event
//

    //validate input
    //JS form validation: https://www.w3schools.com/js/js_validation.asp
    /*let x = document.forms["myForm"]["fname"].value;
      if (x == "") {
        alert("Name must be filled out");
        return false;
      }*/

    //Get event ID (user selects event from dropdown)
    //Get data from forms
    //Send post request



     /*let request = {

                //eventname: document.getElementById('eventname').value,
                //eventname: rrEvent,
                userId: 7, //get from cookie
                eventId: 1, //should be event id//myEvent.event_id, //get id from event name (rrEvent)
                urgent: true, //check date of event, compare to current date, if less than 2 weeks set true
                status: "Needs direct supervisor approval",
                justification: "login then s r",
                projectedReimbursement: 2,//get from event
                amountReimbursed: 0,
                overAvailable: false,//compare to user's available funds
                overJustification: "N/A",
                gradeReceived:"N/A",
                workTimeMissed: 1

                //cost: document.getElementById('cost').value, NOT NEEDED
                //missedworktime: document.getElementById('missedworktime').value
            }*/
        /*

        	user_id integer not null,//serverside: get user id from cookie
        	event_id integer not null,
        	is_urgent boolean not null,//serverside: determine
        	status varchar not null,//set serverside
        	cost: get serverside
        	projected_reimbursment money not null,//set serverside
        	amount_reimbursed money not null,//set serverside
        	is_over_available boolean not null,//set serverside
        	is_over_justification varchar not null,//set serverside
        	grade_received varchar not null,//set serverside

        	work_time_missed_hrs numeric not null,

        */

        //let myEvent = await mainFunction(rrEvent);//get event data using event name/description
            //need to write functions for isUrgent and isOverAvailable

            //cost: document.getElementById('cost').value, NOT NEEDED
                    //missedworktime: document.getElementById('missedworktime').value
        //eventname: document.getElementById('eventname').value,
                //eventname: rrEvent,

    let userID = parseInt(getCook("user_id"));

    let url = "http://localhost:8080/Project1/newrequest";

    let request = {
        userId: userID,
        eventId: window.eventId, //should be event id//myEvent.event_id, //get id from event name (rrEvent)
        urgent: false, //check date of event, compare to current date, if less than 2 weeks set true
        status: "Needs direct supervisor approval",
        justification: document.getElementById('justification').value,
        projectedReimbursement: 0,//parseInt(myEvent.cost),//get from event
        amountReimbursed: 0,
        overAvailable: false,//compare to user's available funds
        overJustification: "N/A",
        gradeReceived:"N/A",
        workTimeMissed: parseInt(document.getElementById('missedworktime').value),
        comment: "no comment",
        commenterId: userID
    }

    let res = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(request),
        credentials: "include"
    });
    //let resJson = await res.text()
    let resJson = await res.json()
    .then(resJson => {
        alert("Reimbursement request ID# " + resJson.re_id + " has successfully been created.");
        //console.log("rr submit success");
        //console.log(res);

    })
    .catch(error => {
        console.log(error);
    })
}

async function mainFunction(eventName){
    const result = await getEventData(eventName);
    return result;
}

async function getEventData(eventName){
let url = "http://localhost:8080/Project1/eventname/" + eventName;


 let res = await fetch(url, {credentials: "include"});
    return resJson = await res.json();


}


//window.onload = addEvent;//get events as soon as page loads

/*function populateData(res){

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


        *//*for (let element of parsedData){
            let abli = document.createElement('li');
            abli.innerHTML = element;
            abilities.appendChild(abli);
        }*//*
}*/
async function toNewEventPage(){

    let url = "http://localhost:8080/Project1/toneweventpage/0";

    let res = await fetch(url, {

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


function getCook(cookiename){
  // Get name followed by anything except a semicolon
  var cookiestring=RegExp(cookiename+"=[^;]+").exec(document.cookie);
  // Return everything after the equal sign, or an empty string if the cookie name not found
  return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
}

/* https://stackoverflow.com/questions/23641531/get-a-cookie-value-javascript
function getCookie(cookieName) {
            var name = cookieName + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i].trim();
                if ((c.indexOf(i)) == (all the options listed above)) {
                    alert("found");
                }

            }
            return "undefined";
        }
*/

async function logout(){
    let url ='http://localhost:8080/Project1/logout';
    let res = await fetch(url);
}