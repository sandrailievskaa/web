let homeData;

// home data
let request = new XMLHttpRequest();
    request.open('GET', `https://api.npoint.io/993aa9d644e837acf644`);

    request.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){

            homeData = JSON.parse(this.response);

            loadData();

        }
    }

request.send(); 


function loadData() {

    let homeBanner = document.getElementsByClassName("carousel-inner")[0];

    homeData.banner_images.forEach((element, index) => {
        homeBanner.innerHTML += `
            <div class="carousel-item ${index == 0 ? 'active' : ''} ">
                <div class="d-block w-100 home-carousel-img" style="background-image: url('${element.image}')"></div>

                <div class="carousel-caption">
                  <h5>${element.label}</h5>
                </div>
            </div>
        `
    });

}