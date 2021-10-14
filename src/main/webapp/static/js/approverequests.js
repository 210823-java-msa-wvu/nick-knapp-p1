//take user ID (supervisor)
//get subordinate requests
//for each request
//      print to screen
//      approve/deny/other

//idea: use dropdown for all active requests, similar to event selection on R request page
//      this way, we only need one set of radio buttons and one textbox for input

async function loadNewRequests(){//loading options into dropdown




    let url = "http://localhost:8080/Project1/loadrequests/" + getCook("user_id");
    //url += userid;

    let res = await fetch(url, {credentials: "include"})//produces 500 error
    let data = await res.json()

    .then( async (data) => {
        console.log(data);
        let resJson = data;
        //add RRs to dropdown
                    var select = document.getElementById("RRs");

                    let users = [];
                    let events = [];
                    let reIds = [];
                    let options = [];
                    for(let j = 0; j < resJson.length; j++){
                        //console.log(resJson[j].event_id);
                        users[j] = resJson[j].userId;
                        events[j] = resJson[j].eventId;
                        reIds[j] = resJson[j].re_id;

                         let name = "a string";
                         let event = "another string";

                        let q = await mainFunctionU(users[j])
                        .then(q => {
                            //console.log("user: " + q.firstname + " " + q.lastname);
                            name = q.firstname + " " + q.lastname;
                        }).catch(err => console.log(err));
                        let w = await mainFunctionE(events[j])
                        .then(w => {
                        //console.log(q);
                        /*for (qi of q){
                        console.log("qi");
                            console.log(qi);
                            if(qi.userId == users[j]){
                                name = qi.firstname + " " + qi.lastname;
                            }
                        }*/
                        //console.log("w: " + w)//undefined
                        event = w;
                        /*for (wi of w){
                        console.log("wi");
                        console.log(wi);
                            if(wi.event_id == events[j]){
                                event = wi.description;
                            }
                        }*/
                        //options[j] = name + ", " + event;

                        }).catch(err => console.log(err));

                        //let a = getUserInfo(users[j]).firstName + " " + getUserInfo(users[j]).lastName;
                        //getUserInfo(users[j]);
                        //let b = getEventInfo(events[j]).description;
                        options[j] = name + ", " + event;

                        //let options[j] = window.userName; //+ "," + b;
                        //console.log(options[j]);
                    }
                    //let options = resJson.description;
                    //console.log(options);

                    //get user names and event names from IDs




                    for(var i = 0; i < options.length; i++) {

                        var el = document.createElement("option");
                        el.textContent = options[i];
                        el.value = reIds[i];//set to reimbursement ID.
                        select.appendChild(el);
                    }

    }).catch(err => console.log(err));
}

async function favTutorial() {//dropdown list; https://www.javatpoint.com/how-to-create-dropdown-list-using-javascript
    var mylist = document.getElementById("RRs");
    document.getElementById("favourite").value = mylist.options[mylist.selectedIndex].text;
    let thisRR = mylist.options[mylist.selectedIndex].value;//set value to re_id
    console.log(thisRR);
    //console.log(typeof thisRR);//string
    //myRR = thisRR;

    //fetch event data, print event data for this event to screen
    //let reId = null;//for now
    let url ='http://localhost:8080/Project1/myRR/'+ thisRR;//getting subordinate request data
    let res = await fetch(url);
    let resJson = await res.json()
        .then((resJson) => {

        console.log(resJson);
            // This is where we will do our DOM manipulation
           let dataSection = document.getElementById('data');
           dataSection.innerHTML = "";//clear contents of previously selected event

           // Create an unordered list element
           let abilities = document.createElement('ul');
           dataSection.innerHTML += 'reimburseement request details<br>';
           dataSection.appendChild(abilities);

            //var options = ["1", "2", "3", "4", "5"];
            //var options = resJson.description;//put event descriptions into a list

            for(let j = 0; j < resJson.length; j++){
                if (thisRR == resJson[j].re_id){
                    let x = resJson[j]
                    console.log(x);
                   let myData = [x.re_id];//[x.description, [x.date.month, x.date.dayOfMonth, x.date.year ], [x.time.hour, x.time.minute], x.location, x.cost, x.eventType, x.gradingFormat, x.passingGrade];
                   let myDataLabels = ["Reimbursement Request ID: "];//["Event Name: ", "Event Date: ", "Event Time: ", "Event Location: ", "Event Cost ($): ", "Event Type: ", "Event Grading Format: ", "Passing Grade: "]
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

async function mainFunctionU(Id){
    const result = await getUserInfo(Id);
    return result;
}

async function getUserInfo(Id){
let url = "http://localhost:8080/Project1/users/" + Id;
let res = await fetch(url, {credentials: "include"});
return resJson = await res.json();
}

async function mainFunctionE(eventId){
    const resultE = await getEventName(eventId);
    return resultE;
}

async function getEventName(eventId){//gets event name only, not other properties of event
let url = "http://localhost:8080/Project1/events/" + eventId;


 let res = await fetch(url, {credentials: "include"});
    return resJson = await res.json();


}
/*
async function getUserInfo(Id){//Id is string

    let url ='http://localhost:8080/Project1/users/' + getCook("user_id");
    let res = await fetch(url, {credentials: "include"})
    let data = await res.json()

    .then(data => {
        //print data to screen
        console.log(data);
        window.userName = data.firstname + " " + data.lastname;

    })
    .catch(err => console.log(err));

}*/

function favTutorialC() {//dropdown list; https://www.javatpoint.com/how-to-create-dropdown-list-using-javascript
    var mylist = document.getElementById("approvaldropdown");
    document.getElementById("favouriteC").value = mylist.options[mylist.selectedIndex].text;
    window.myApproval = mylist.options[mylist.selectedIndex].text;
    //myStatus = thisRR;
}

function getCook(cookiename){
  // Get name followed by anything except a semicolon
  var cookiestring=RegExp(cookiename+"=[^;]+").exec(document.cookie);
  // Return everything after the equal sign, or an empty string if the cookie name not found
  return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
}