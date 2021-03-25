let allTeams = [];
let editId;

function getHtmlTeams(teams){
    return teams.map(team => {
        return  `<tr>
                    <td> ${team.members}</td>
                    <td> ${team.name}</td>
                    <td> ${team.url} </td>
                    <td> 
                        <a href= "#" class = "remove-btn" data-id = "${team.id}"> &#10006; </a> 
                        <a href = "#"  class = "edit-btn" data-id = "${team.id}"> &#9998; </a>
                        </td>
                 </tr>`
                
    }).join("");
}
function showTeams(teams){	
    const html = getHtmlTeams(teams);

    const allTeamsHtml = document.querySelector("tbody");
    allTeamsHtml.innerHTML = html;
}

function loadTeams() {
    fetch ("http://localhost:3000/teams-json")
        .then(response => response.json())
        .then(teams => {
            allTeams = teams;
            showTeams(allTeams)
        });
}
loadTeams();

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
            if(status.success){
                window.location.reload();
            } 
        });
}

function updateTeam(team) {
    console.warn("team:" , );
    fetch ( "http://localhost:3000/teams-json/update", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
          },
        body: JSON.stringify({
            id: editId,
            members: team.members,
            name: team.name,
            url: team.url
          })
    })
        .then(response => response.json())
        .then(status => {
            if(status.success){
                window.location.reload();
            } 
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

    console.warn(team, editId);

    if(editId) {
        team.id = editId;
        updateTeam(team);
    } else {
        addTeam(team);
    };
}

function removeTeam(id){
    fetch("http://localhost:3000/teams-json/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id:id})
    })
        .then(response => response.json())
        .then(status => {
            if(status.success){
                loadTeams();
            }
        });
}

document.querySelector('table tbody').addEventListener("click", e => {
    if(e.target.matches("a.remove-btn") ) {
        const id = e.target.getAttribute('data-id');
        removeTeam(id);
    } else if(e.target.matches("a.edit-btn") ){
        document.getElementById("saveBtn").innerText = "Update";

        const id = e.target.getAttribute('data-id');
        const editTeam = allTeams.find(team => team.id === id);
        setValues(editTeam);
        editId = id;
        console.log(editId);
    }
});

function setValues(team) {
     console.warn('edit', team);
     document.querySelector("input[name = members]").value = team.members;
     document.querySelector("input[name = namep]").value = team.name;
     document.querySelector("input[name = url]").value = team.url;

}




	