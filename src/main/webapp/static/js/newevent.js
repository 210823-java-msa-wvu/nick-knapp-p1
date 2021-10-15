//var EventType = null;
//var gradingFormat = null;

function favTutorial() {//dropdown list; https://www.javatpoint.com/how-to-create-dropdown-list-using-javascript
    let mylist = document.getElementById("eventtype");
    document.getElementById("favourite").value = mylist.options[mylist.selectedIndex].text;
    window.EventType = mylist.options[mylist.selectedIndex].text;

}
function favTutorialG() {//dropdown list; https://www.javatpoint.com/how-to-create-dropdown-list-using-javascript
    let mylist = document.getElementById("gradingformat");
    document.getElementById("favouriteG").value = mylist.options[mylist.selectedIndex].text;
    window.gradingFormat = mylist.options[mylist.selectedIndex].text;

}
async function newEvent(){
    //let url = "http://localhost:8080/Project1/static/newevent.html";
    //let url = "http://localhost:8080/Project1/newevent";
     let url = "http://localhost:8080/Project1/events";

    let event = {
        description: document.getElementById('description').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        location: document.getElementById('location').value,
        cost: document.getElementById('cost').value,
        gradingFormat: window.gradingFormat,//from dropdown
        passingGrade: document.getElementById('passinggrade').value,
        eventType: window.EventType//from dropdown
    }
    console.log(event);
    /**
    event_id serial primary key,
    	description varchar not null,--is now unique
    	event_date date not null,
    	event_time time not null,
    	event_location varchar not null,
    	event_cost money not null,
    	grading_format integer not null,
    	passing_grade varchar not null,
    	event_type varchar not null
    */

    console.log(event);

    let res = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(event),
        credentials: "include"
    });

    let resJson = await res.json()
    .then(resJson => {
        alert("Successfully created new event ID# " + resJson.event_id);
    })
    .catch(error => {
        console.log(error);
    })
}