fetch ( "persons.json")
.then(response => response.json())
.then( function(persons) {
    console.warn("done",persons);
    showAllMembers(persons);
});

function showAllMembers(persons){	
    let allTeams = persons.map( person => {
        return `<td> ${person.members}</td>,
                <td> ${person.projectName}</td>,
                <td> ${person.projectUrl} </td>`
    })
    let allTeamsHtml = document.querySelector(".members td");
    console.log(allTeamsHtml);
    allTeamsHtml.innerHTML = allTeams.join(" ")
   
}
showAllMembers(allMembersHtml);	