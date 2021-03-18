let allTeams = [];

function getHtmlTeams(teams){
    return teams.map(team => {
        return  `<tr>
                    <td> ${team.members}</td>
                    <td> ${team.name}</td>
                    <td> ${team.url} </td>
                    <td> 
                        <a href= "#" class = "remove-btn" data-id = "${team.id}"> &#10006; </a> 
                        <a href = "#"  class = "edit-btn"> &#9998; </a>
                        </td>
                 </tr>`
                
    }).join("");
}

function showTeams(teams){	
    const html = getHtmlTeams(teams);

    const allTeamsHtml = document.querySelector("tbody");
    allTeamsHtml.innerHTML = html;
}

fetch ("http://localhost:3000/teams-json")
    .then(response => response.json())
    .then(teams => {
        allTeams = teams;
        showTeams(allTeams)
});

function addTeam(team) {
    console.warn("team:" , );
    fetch ( "http://localhost:3000/teams-json/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
          },
        body:JSON.stringify(team)
    })
        .then(response => response.json())
        .then(status => {
            console.warn("saved", status);
        });
}

function saveTeam() {
    const members = document.querySelector("input[name = members]").value;
    const name = document.querySelector("input[name = namep]").value;
    const url = document.querySelector("input[name = url]").value;

    const team = {
        name: name,
        members: members,
        url: url
    };
    addTeam(team);
}

function removeTeam(id){
    fetch("http://localhost:3000/teams-json/delete", {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ id })
});
}


document.querySelector('table tbody').addEventListener("click", e => {
    if(e.target.matches("a.remove-btn") ) {
        const id = e.target.getAttribute('data-id');
        removeTeam(id);
    }
})

	