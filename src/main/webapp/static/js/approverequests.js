//take user ID (supervisor)
//get subordinate requests
//for each request
//      print to screen
//      approve/deny/other

//idea: use dropdown for all active requests, similar to event selection on R request page
//      this way, we only need one set of radio buttons and one textbox for input

async function loadNewRequests(){//do this on page load.
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
        //add events to dropdown
                    var select = document.getElementById("RRs");

                    let options = [];
                    for(let j = 0; j < resJson.length; j++){
                        //console.log(resJson[j].event_id);
                        options[j] = resJson[j].userId;
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
}

async function favTutorial() {//dropdown list; https://www.javatpoint.com/how-to-create-dropdown-list-using-javascript
    var mylist = document.getElementById("RRs");
    document.getElementById("favourite").value = mylist.options[mylist.selectedIndex].text;
    let thisRR = mylist.options[mylist.selectedIndex].text;
    myRR = thisRR;

    //fetch event data, print event data for this event to screen
    let url ='http://localhost:8080/Project1/myRRs';//getting subordinate requests
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

function favTutorialC() {//dropdown list; https://www.javatpoint.com/how-to-create-dropdown-list-using-javascript
    var mylist = document.getElementById("approvaldropdown");
    document.getElementById("favouriteC").value = mylist.options[mylist.selectedIndex].text;
    let thisRR = mylist.options[mylist.selectedIndex].text;
    myStatus = thisRR;
}