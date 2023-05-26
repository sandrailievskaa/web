// API RESPONSE
let artistData;

let artistId = new URLSearchParams(window.location.search);
artistId = artistId.get('id');

// Get Artist profile data
let request = new XMLHttpRequest();
    request.open('GET', `https://api.npoint.io/45461e330dcfb5171c4e?id=${artistId}`);

    request.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){

            artistData = JSON.parse(this.response);

            loadData();

        }
    }

request.send(); 


// Create HTML for the album slider
function loadData() {

    let slider = document.getElementById("gallery-slider");

    // Cover
    let artistBanner = document.getElementById("artists-banner");
    artistBanner.style.backgroundImage = `url('${artistData.coverImage}')`;

    let artistName = document.getElementById("artist-name");
    artistName.innerText = artistData.artistName;

    let artistAvatar = document.getElementById("artist-avatar");
    artistAvatar.style.backgroundImage = `url('${artistData.artistAvatar}')`;

    // About
    let artistDetailsName = document.getElementById("artist-details-name");
    artistDetailsName.innerHTML = artistData.artistName;

    let artistDetails = document.getElementById("artist-details");
    artistDetails.innerText = artistData.artistAbout;

    // list albums
    for (let i = 0; i < artistData.albumAlbums.length; i++) {
        let album = document.createElement("a");
        album.href = `artist-music.html?albumId=${artistData.albumAlbums[i].albumId}`;
        album.classList.add("album-image");
        album.style.backgroundImage = 'url('+ artistData.albumAlbums[i].albumCover +')';

        slider.append(album);

    }

    // Gallery
    let galleryHoler = document.getElementById('gallery-holder');

    artistData.artistGallery.forEach(element => {
        let galleryImage = document.createElement('div');
        galleryImage.classList.add("gallery-image");
        galleryImage.style.backgroundImage = `url('${element}')`;
        galleryImage.setAttribute('data-bs-toggle', 'modal');
        galleryImage.setAttribute('data-bs-target', '#exampleModal');
        galleryImage.addEventListener('click', function() {
            let selectedImage = document.getElementById("modal-image");
            selectedImage.src = element;
        });
        galleryHoler.append(galleryImage);
    });


    // After html is created, initialize the slider
    initSlider()
}


function initSlider() {
    $('.slick-carousel-albums').slick({
        prevArrow: $('.albums-arrow-left'),
        nextArrow: $('.albums-arrow-right'),
        mobileFirst: true,
        responsive: [
            {
            breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    infinite: true,
                }
            },
            {
            breakpoint: 900,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                }
            },
            {
            breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                }
            }
        ]
        });
}

