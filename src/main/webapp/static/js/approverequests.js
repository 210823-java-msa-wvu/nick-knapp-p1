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
    console.log(thisRR);//object
    window.RRid = thisRR;
    //console.log(typeof thisRR);//string
    //myRR = thisRR;

    //fetch event data, print event data for this event to screen
    //let reId = null;//for now
    let url ='http://localhost:8080/Project1/myRR/'+ thisRR;//getting subordinate request data
    let res = await fetch(url, {credentials: "include"});
    let resJson = await res.json()
        .then((resJson) => {

        console.log(resJson);
        console.log(typeof resJson);//object
        //console.log(resJson[0]);//undefined
        console.log(resJson.re_id);
            // This is where we will do our DOM manipulation
           let dataSection = document.getElementById('data');
           const div = document.getElementById("data");

           div.style.color = "orange";

           dataSection.innerHTML = "";//clear contents of previously selected event


           // Create an unordered list element
           let abilities = document.createElement('ul');
           dataSection.innerHTML += 'reimburseement request details<br>';
           dataSection.appendChild(abilities);

            //var options = ["1", "2", "3", "4", "5"];
            //var options = resJson.description;//put event descriptions into a list

            //for(let j = 0; j < resJson.length; j++){
            //console.log(resJson[j]);
            //console.log(resJson[j].re_id);
                //if (thisRR == resJson.re_id){
                    //console.log("executing loop to print RR data");
                    let x = resJson;
                    //console.log("X: ");
                    //console.log(x);
                   let myData = [x.re_id, x.userId, x.eventId, x.urgent, x.status, x.amountReimbursed, x.comment,
                   x.commenterId, x.gradeReceived, x.justification, x.overAvailable, x.overJustification,
                   x.projectedReimbursement, x.workTimeMissed];//[x.description, [x.date.month, x.date.dayOfMonth, x.date.year ], [x.time.hour, x.time.minute], x.location, x.cost, x.eventType, x.gradingFormat, x.passingGrade];
                   let myDataLabels = ["Reimbursement Request ID: ", "Requester ID: ", "Event ID: ", "Is the event within 2 weeks? ",
                   "Status: ", "Amount Reimbursed: $", "Most recent comment: ", "Commenter ID: ", "Grade Received",
                   "Justification: ", "Is the request over their available amount? ", "Justification for granting additional funds: ",
                   "Amount to be Reimbursed: $", "Time off work requested (hours): "];//["Event Name: ", "Event Date: ", "Event Time: ", "Event Location: ", "Event Cost ($): ", "Event Type: ", "Event Grading Format: ", "Passing Grade: "]
                    //print data to screen
                    //populateData(resJson[j]);
                    console.log("myData: ");
                    console.log(myData);

                    //document.getElementById("container2").innerHTML = "";//doesn't append elements
                    /*let qq = document.getElementById("container2");
                    if (qq.firstChild != null){
                        while(qq.firstChild != null){

                                                qq.removeChild(qq.firstChild);
                                            }
                    }*/

                    //let div2 = document.querySelector('.container2');
                    for (let k=0; k < myData.length; k++){
                        /*let str = myDataLabels[k] + String(myData[k]);
                        let p = document.createElement('p');
                        p.textContent = str;
                        div2.appendChild(p);*/




                        let abli = document.createElement('li');
                        let str = myDataLabels[k] + String(myData[k]);
                        //console.log(str);
                        //console.log(typeof str);
                        abli.innerHTML = str;
                        abilities.appendChild(abli);

                    }
                    /*let k = 0;
                    for (let element of myData){
                        console.log(element);
                        let abli = document.createElement('li');
                        abli.innerHTML = myDataLabels[k] + element;
                        abilities.appendChild(abli);
                        k ++;
                    }*/



                //}
            //}
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

async function mainFunctionR(){
    const resultR = await getRRInfo();
    return resultR;
}

async function getRRInfo(){
let reId = window.RRid;//get from dropdown
    let url = "http://localhost:8080/Project1/updateRRstatus/" + String(reId);

    let res = await fetch(url, {
                    method: "GET",

                    credentials: "include"
                    });
        //console.log("in here440");
        return resJson = await res.json()

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

//approval status dropdown
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

async function updateRRStatus(){
   /* reId = window.RRid;//get from dropdown
    let url = "http://localhost:8080/Project1/updateRRstatus/" + reId;

    let res = await fetch(url, {
                    method: "GET",

                    credentials: "include"
                    });
        console.log("in here441");
        let resJson = await res.json()
            .then(async (resJson) => {


            console.log("in here442");
                let y = resJson;
                console.log(y);*/

    let y = await mainFunctionR();
    console.log("here9000909");
    //.then( async (y) =>{
    //let mm = document.getElementById("approvaldropdown").value;
    let mm = window.myApproval;
    let newStatus = "";
    if (mm == "Approve"){
        if (y.status == "Needs direct supervisor approval"){
            newStatus = "Needs department head approval";
        } else if (y.status == "Needs department head approval"){
            newStatus = "Needs benefits coordinator approval";
        } else if (y.status == "Needs benefits coordinator approval"){
            newStatus = "Approved for Reimbursement";
        }
        //update to next level of authority
    } else if (mm == "Deny"){
        newStatus = "Denied";
    } else if (mm == "More Information (specify from who in comments)"){
        newStatus = "More Information Please";
    }

    let request = {
        re_id: y.re_id,
        userId:y.userId,
        eventId: y.eventId,
        urgent: y.eventId,
        status: newStatus,
        amountReimbursed: y.amountReimbursed,
        comment: document.getElementById("comments").value,
        commenterId: getCook("user_id"),
        gradeReceived: y.gradeReceived,
        justification: y.justification,
        overAvailable: y.overAvailable,
        overJustification: y.overJustification,
        projectedReimbursement: y.projectedReimbursement,
        workTimeMissed: y.workTimeMissed
    }

    console.log("before resp");
    console.log(request);
//let reId = window.RRid;//get from dropdown
    let url = "http://localhost:8080/Project1/updateRRstatus/" + y.re_id;
    let resp = await fetch(url, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(request),
                credentials: "include"
                });
    let respJson = resp.json()
        .then(respJson => {
        console.log(respJson);
            alert("RR ID " + respJson.re_id + "has successfully been updated with comment " + respJson.comment);

        }).catch(error => {console.log(error); })
        //}).catch(error => {console.log(error); })
}