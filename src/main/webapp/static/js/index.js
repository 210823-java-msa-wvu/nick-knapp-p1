async function login() {

    let url = "http://localhost:8080/Project1/static/index.html";

    let user = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    }

    console.log(user);

    let res = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(user)
    });

    let resJson = await res.json()
    .then(res => {
        console.log(res);
    })
    .catch(error => {
        console.log(error);
    })

}