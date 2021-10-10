
var cookies = document.cookie;
console.log(cookies)

//on load, get the user's past reimbursement requests and print them to the webpage
async function getMyRRs(){
    let url ='http://localhost:8080/Project1/viewmypastrequests';
    let res = await fetch(url, {credentials: "include"});
    let resJson = await res.json()
        .then(async (resJson) => {
            // This is where we will do our DOM manipulation
           let dataSection = document.getElementById('data');

           // Create an unordered list element
           let abilities = document.createElement('ul');
           dataSection.innerHTML += 'My Past Reimbursement Requests<br>';
           dataSection.appendChild(abilities);
           //console.log(resJson);
           //console.log(resJson[0]);
           for(let q = 0; q<resJson.length;q++){
                //console.log(resJson[0]);
                let w = resJson[q];
                let eventName = await mainFunction(w.eventId);
                //let eventName = await getEventNameById(w.eventId);
                //let eventName = getEventNameById(w.eventId);
                console.log("event name : " + eventName);// object Promise
                console.log(typeof eventName);//object
                let wdata = [w.amountReimbursed, eventName, w.gradeReceived, w.isOverJustification, w.justification,
                w.overAvailable, w.projectedReimbursement, w.status, w.urgent, w.userId, w.workTimeMissed];
                let wlabels = ["amount reimbursed: ", "event name: ", "grade Received: ", "justification for going over allowable funds: ",
                "Justification: ", "did you need more than your available funds? ", "projected reimbursement: ", "status: ",
                "Urgent?", "Requester ID: ", "work time missed: "];
                let r = 0;
                                    for (let element of wdata){
                                        let abli = document.createElement('li');
                                        abli.innerHTML = wlabels[r] + element;
                                        abilities.appendChild(abli);
                                        r ++;
                                    }

           }


        }).catch((error) => {console.log(error);});
}
async function mainFunction(eventId){
    const result = await getEventNameById(eventId);
    return result
}

async function getEventNameById(eventId){
    let url ='http://localhost:8080/Project1/geteventbyid/' + eventId;
    let res = await fetch(url, {credentials: "include"});
    return resJson = await res.json()
        /*.then((resJson) => {
            // This is where we will do our DOM manipulation
            console.log(resJson);



            return resJson;

        }).catch((error) => {console.log(error);});*/

}

function capitalize(str) {
    if (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    } else {
        return '';
    }
}



//////first add an event listener for page load
//https://stackoverflow.com/questions/51275730/populate-html-table-with-json-data
/*
document.addEventListener( "DOMContentLoaded", get_json_data, false ); // get_json_data is the function name that will fire on page load

        //this function is in the event listener and will execute on page load
        function get_json_data(){
            // Relative URL of external json file
            var json_url = 'example.json';

            //Build the XMLHttpRequest (aka AJAX Request)
            xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {//when a good response is given do this

                    var data = JSON.parse(this.responseText); // convert the response to a json object
                    append_json(data);// pass the json object to the append_json function
                }
            }
            //set the request destination and type
            xmlhttp.open("POST", json_url, true);
            //set required headers for the request
            xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            // send the request
            xmlhttp.send(); // when the request completes it will execute the code in onreadystatechange section
        }

        //this function appends the json data to the table 'gable'
        function append_json(data){
            var table = document.getElementById('gable');
            data.forEach(function(object) {
                var tr = document.createElement('tr');
                tr.innerHTML = '<td>' + object.COUNTRY + '</td>' +
                '<td>' + object.LoC + '</td>' +
                '<td>' + object.BALANCE + '</td>' +
                '<td>' + object.DATE + '</td>';
                table.appendChild(tr);
            });
        }*/

async function logout(){
    let url ='http://localhost:8080/Project1/logout';
    let res = await fetch(url);

}