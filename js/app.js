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
let tiempo;


function favoritos(){

//recorremos el array para verificar checkboxes, si hay, almacena el id en el array
for(const checkbox in checkboxes){
  if(checkboxes[checkbox].checked){
    arrId.push(checkboxes[checkbox].id)
  }
}

//ordenamos el array
arrId = arrId.sort();

//si hay elementos duplicados los eliminamos
for(let i =0; i < arrId.length; i++){
  if(arrId[i+1] === arrId[i]){
    arrId.splice(i, 1);
  }
}

//mostramos las alertas de los favoritos
  if(arrId.length >0){
    alert_yes();
  }else{
    alert_no();
  }

//funcion alerta si existen superheroes favoritos
function alert_yes(){
  alertContent=`
  <div class="fixed-bottom alert alert-success mt-1 alert-dismissible fade show" role="alert">
     <b>Favourites Super Hero's:</b>
     <br> ${arrId}
     <br> <em>Please, before going to another page, save your Favourite Hero</em>
  </div>
  `
  ;
}

//funcion alerta si no existen superheroes
  function alert_no(){
    alertContent=`
    <div class="fixed-bottom alert alert-primary alert-dismissible fade show mt-1" role="alert">
       <b>No favourite SuperHero saved!</b> </br>
       <em>Please, before going to another page, save your Favourite Hero</em>
    </div>
    `;
  }
//Insertamos el HTML de las alertas
  alertas.innerHTML = alertContent;


//Funcion borrado de Alertas a 2,5 segundos.
  function borradoAlerta() {
    tiempo = setTimeout(alert_blank, 2500);
  }

  function alert_blank(){
    alertContent=`
    <div class="fixed-bottom"></div>
    `;
  alertas.innerHTML = alertContent;
  }

  borradoAlerta();


}


/* ---------------------------Buscar---------------------------------------------- */


let valor;
let nombreBuscado;
let urlA = 'https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=e79c7dec82736a547b2894c491821b67&hash=1a09b1ae4aec506aefb3baf1dc5078bb';


function searchHero(){
  let urlQueryParameters = new URLSearchParams(window.location.search),
  queryParameterName = urlQueryParameters.get("search"),
  search = document.getElementById("search").value;




  
  fetch(urlA)
      .then(res => res.json())
      .then((json) => {
        for (let hero of json.data.results) {
          console.log(hero.name);
        
        }
      })


}

