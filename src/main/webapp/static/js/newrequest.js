async function newRequest(){
    let url = "http://localhost:8080/Project1/newrequest";

    let request = {
        eventname: document.getElementById('eventname').value,
        justification: document.getElementById('justification').value,
        cost: document.getElementById('cost').value,
        missedworktime: document.getElementById('missedworktime').value
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