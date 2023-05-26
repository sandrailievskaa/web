// Toggle view
let gridView = document.getElementById("grid-view");

let tableView = document.getElementById("table-view");
tableView.style.display = "none";

let gridViewIcon = document.getElementById("grid-icon");
gridViewIcon.style.color = "#de1a60";

let tableViewIcon = document.getElementById("table-icon");

function toggleArtistsView(view) {
    if (view == true) {

        gridView.style.display = "initial";
        gridViewIcon.style.color = "#de1a60";

        tableView.style.display = "none";
        tableViewIcon.style.color = "white";

    } 
    else {

        tableView.style.display = "table";
        tableViewIcon.style.color = "#de1a60";

        gridView.style.display = "none";
        gridViewIcon.style.color = "white";
    }
} 


// Get artist list

let artistList;

let request = new XMLHttpRequest();
    request.open('GET', `https://api.npoint.io/898702162c79b97d40ef`);

    request.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){

            artistList = JSON.parse(this.response);
            
            loadData();
            loadTable();
        }
    }

request.send();

// Create html ( GRID )
function loadData() {

    console.log(artistList)

    let artistsGridHolder = document.getElementById("grid-view");

    artistList.forEach(element => {

        let artist = document.createElement('a');
        artist.classList.add('grid-box');
        artist.href = `artist-profile.html?id=${element.artistId}`;
        artist.innerHTML = 
        `<img class="grid-image" src="${element.artistImage}">

        <p class="grid-title">${element.artistName}</p>
        <p class="grid-subtitle">${element.artistJobTitle}</p>

        <i class="fab fa-twitter grid-social-media-icon"></i>
        <i class="fab fa-instagram grid-social-media-icon"></i>
        <i class="fab fa-facebook-f grid-social-media-icon"></i>

        <div class="overlay">
            <div class="overlay-content">

            </div>
        </div>`
        
        artistsGridHolder.append(artist);
    });

}

function loadTable() {

    artistList.forEach(function(element, index) {

        // create row
        let row = tableView.insertRow(0);

        // column 1
        let colOne = row.insertCell(0);
        colOne.innerText = index + 1;

        // column 2
        let colTwo = row.insertCell(1);
        colTwo.innerHTML = `<img src="${element.artistImage}" class="artist-image" />`;

        // column 3
        let colThree = row.insertCell(2);
        colThree.innerText = element.artistName;

        // column 4
        let colFour = row.insertCell(3);
        colFour.innerText = element.lastAlbum;

        // column 5
        let colFive = row.insertCell(4);
        colFive.innerText = element.artistViews;

        // column 6
        let colSix = row.insertCell(5);
        colSix.innerHTML = 
        `<i class="fas fa-plus add-to-list-icon icon-pink"></i>
        <p class="text-add">add to list</p>`;

        // column 7
        colSeven = row.insertCell(6);
        colSeven.innerHTML =
        `<i class="fab fa-twitter add-to-list-icon"></i>
        <i class="fab fa-instagram add-to-list-icon"></i>
        <i class="fab fa-facebook-f add-to-list-icon"></i>`;

        tableView.append(row); //

    })

}