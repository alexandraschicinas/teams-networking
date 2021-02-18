fetch ( "persons.json")
.then(restonse => restonse.json())
.then( response => console.log(response));

function showPersons() {
    
}