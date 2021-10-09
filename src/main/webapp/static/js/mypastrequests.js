//function getData(){
    let url = "http://localhost:8080/Project1/mypastrequests";

        //JS forms validation: https://www.w3schools.com/js/js_validation.asp


//        let user = {
//            username: document.getElementById('username').value,
//            password: document.getElementById('password').value
//        }

        //console.log(user);

        let res = await fetch(url, {
            method: "GET",
            //headers: {"Content-Type": "application/json"},
            //body: JSON.stringify(user),
            credentials: "include"




        let data = await res.json()
        .then(res => {
            console.log(res);
            console.log(data);
            //populateData(data)//print data to webpage
        })
        .catch(error => {
            console.log(error);
        })
//}


function populateData(res) {//res = response (JSON)
    //print JSON data to HTML table
    //      https://www.geeksforgeeks.org/how-to-convert-json-data-to-a-html-table-using-javascript-jquery/
    console.log(res);

    // This is where we will do our DOM manipulation
    let dataSection = document.getElementById('data');

    // Create a new element
    let nameTag = document.createElement('h3');

    // Add text to the inner html of the new element
    // <h3>innerHtml</h3>
    nameTag.innerHTML = capitalize(res.name);

    // Append this new element to the section element (adding it as a child node in the DOM)
    dataSection.appendChild(nameTag);


    // Now we'll use the same process for the Abilities
    let abilitiesArray = res.abilities;
    console.log(abilitiesArray);

    /**
     * <ul>
     *    <li>"Ability Name"</li>
     *    <li>"Ability Name"</li>
     *    <li>"Ability Name"</li>
     * </ul>
     */

    // Create an unordered list element
    let abilities = document.createElement('ul');
    dataSection.innerHTML += 'Abilities<br>';
    dataSection.appendChild(abilities);

    // Iterate over the abilities array and create 'li' elements
    for (let ability of abilitiesArray) { // for-of -> iterate over the elements inside the array
        let abli = document.createElement('li');
        abli.innerHTML = capitalize(ability.ability.name);
        abilities.appendChild(abli);
    }

    // TODO - add sprites to the rendered page and capitalize words.
    let spritesObject = res.sprites;
    console.log(spritesObject);

    for (let sprite in spritesObject) {// for-in loop -> iterate over the indexes of the array (0...1....2...n)

        if (typeof spritesObject[sprite] == 'string') {
            let spriteImg = document.createElement('img');
            //spriteImg.setAttribute('src', spritesObject[sprite]);
            spriteImg.src = spritesObject[sprite];
            dataSection.appendChild(spriteImg);
        }

    }
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
        }