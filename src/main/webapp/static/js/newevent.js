async function newEvent(){
    let url = "http://localhost:8080/Project1/login";//or newrequest?

    let event = {
        description: document.getElementById('description').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        location: document.getElementById('location').value,
        cost: document.getElementById('cost').value,
        gradingformat: document.getElementById('gradingformat').value,
        passinggrade: document.getElementById('passinggrade').value,
        eventtype: document.getElementById('eventtype').value
    }

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