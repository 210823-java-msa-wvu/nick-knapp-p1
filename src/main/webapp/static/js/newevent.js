async function newEvent(){
    let url = "http://localhost:8080/Project1/newevent";//or newrequest?

    let event = {
        description: document.getElementById('description').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        location: document.getElementById('location').value,
        cost: document.getElementById('cost').value,
        gradingformat: document.getElementById('gradingformat').value,//dropdown
        passinggrade: document.getElementById('passinggrade').value,
        eventtype: document.getElementById('eventtype').value//dropdown
    }
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
        body: JSON.stringify(event)
    });

    let resJson = await res.json()
    .then(res => {
        console.log(res);
    })
    .catch(error => {
        console.log(error);
    })
}