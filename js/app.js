let npag = 0;

const marvel = {
  render: (pag) => {
    const ts = '1';
    const api = 'e79c7dec82736a547b2894c491821b67';
    const hash = '1a09b1ae4aec506aefb3baf1dc5078bb';
    const imgs = '100';
    let pagina = pag;
    let urlAPI = 'https://gateway.marvel.com:443/v1/public/characters?limit=' + imgs + '&ts=' + ts + '&apikey=' + api + '&hash=' + hash + '&offset=' + pagina + '00';
    const container = document.querySelector('#marvel-row');
    const n_page = document.querySelector('#n_page');



/* ------------------Variables contenedoras------------------------------- */


    let contentHTML = '';
    let nPage = '';
    
  /* ---------------------Recorrido Json------------------------------------------------- */

    fetch(urlAPI)
      .then(res => res.json())
      .then((json) => {

        for (const hero of json.data.results) {
          //console.log(hero);
          let urlHero = hero.urls[0].url;
          contentHTML += `
              <div class="col-sm-6 col-md-4 col-lg-3 col-xl-2 d-flex">
                <a href="${urlHero}" target="_blank">
                  <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}" class="img-thumbnail">
                  <h3 class="title">${hero.name}</h3>
                  <label class="mb-5 justify-content-center"><input type="checkbox" class="check" id="${hero.name}" value="first_checkbox"><i class="far fa-heart"></i></label>
                </a>
              </div>
                    `;
        }
        container.innerHTML = contentHTML;

        //Mostramos el numero de pagina en la que se encuentra
        nPage += `
          <li class="page-item">
            <a class="page-link" href="" ">
              ${npag}
            </a>
          </li>
        `
        n_page.innerHTML = nPage;
      });
  }
};

marvel.render(npag);



/* ----------------------Botones---------------------------------- */



//Boton Next page
function nextPage(){
  if(npag<14){
    npag++;
    marvel.render(npag);
  }else{
    alert("Sorry, no more super heros!");
  }
}

//Boton Previous page
function previousPage(){
  if(npag>0){
    npag--;
    marvel.render(npag);
  }else{
    alert("Sorry, this is the first page");
  }
}




/* ---------------------------Favoritos---------------------------------------------- */


//Favoritos
let checkboxes = document.getElementsByClassName('check');
let alertas = document.querySelector('.container');
let notificacion = document.getElementsByClassName('alert');
let alertContent = '';
let cont_favorites;
let arrId = [];

function favoritos(){
  
  for (var x=0; x < checkboxes.length; x++) {
    if (checkboxes[x].checked) {
      cont_favorites = cont_favorites + 1;
      arrId.push(checkboxes[x].id);
    }
  }

  if(arrId.length >0){
    console.log("Hay por lo menos un elemento");
    alertContent+=`
    <div class="alert alert-dark mt-1 alert-dismissible fade show" role="alert">
       <b>Your favourites Super Hero's are:</b><br> ${arrId}

       </div>
    `;

  }else{
    console.log("No hay elementos");
    alertContent+=`
    <div class="alert alert-warning alert-dismissible fade show mt-1" role="alert">
       <b>No favourite Super Hero!</b>

       </div>
    `;
  }


  alertas.innerHTML = alertContent;
}


