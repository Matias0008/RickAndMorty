const API = 'https://rickandmortyapi.com/api/character/'

document.addEventListener('keypress', (event) => {
  var name = event.key;
  var code = event.code;
  // Alert the key name and key code on keydown
  if (name == 'Enter') {
    event.preventDefault();
    document.getElementById('search-button').click();
  }
}, false);


const getData = (apiURL) => {
    return fetch(apiURL)
    .then( response => response.json())
    .then ( json => { printData(json), pagination(json.info) } )
    .catch(error => {
        mostrar_error()
    })
}


const mostrar_error = () => {
    document.getElementById('prev').remove()
    document.getElementById('next').remove()
    let contador = document.getElementById('titlew-count');
    contador.innerHTML = '';


    let a_buscar = document.getElementById('search').value;
    let html = `
    <div class="container-char__item">

                <div class="container-char__info" style="justify-content: center;">
                    <div class="info">
                        <h2 class="info-nombre" style="margin-bottom: 10px;">Error</h2>
                        <div class="status__info">
                            <div class="acavaelstatus" style=""></div>
                            <p class="status__infotxt"></p>
                        </div>
                    </div>

                    <div class="info">
                        <p class='card-info'>La busqueda ${a_buscar} no arrojo ningun resultado.</p>
                    </div>



                </div>

        </div>  `
    
    document.getElementById('infoCharacter').innerHTML = html
}

function buscar() {

    let a_buscar = document.getElementById('search').value;
    console.log(a_buscar)
    let API = `https://rickandmortyapi.com/api/character/?name=${a_buscar}`;


    getData(API)
}

function capitalize(word) {
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
}



const printData = (data) => {
    let html = '';
    let styleStatus = '';
    let firstSeen = '';

    
    data.results.forEach(c => {
        
        if (c.status == 'Alive') {
            styleStatus = 'height: 0.5rem; width: 0.5rem; margin-right: 0.375rem; background: rgb(85, 204, 68); border-radius: 50%;'
        } if (c.status == 'Dead') {
            styleStatus = 'height: 0.5rem; width: 0.5rem; margin-right: 0.375rem; background: rgb(214, 61, 46);; border-radius: 50%;'
        } if (capitalize(c.status) == 'Unknown' ) {
            styleStatus = 'height: 0.5rem; width: 0.5rem; margin-right: 0.375rem; background: rgb(255, 255, 0);; border-radius: 50%;'
        }

        firstSeen = capitalize(c.episode[0].slice(32).replace('/', ' '))


        html += `
            <div class="container-char__item">

                <div class="container-char__img">
                    <img src="${c.image}" alt="" class="item-img">
                </div>

                <div class="container-char__info">
                    <div class="info">
                        <h3 class="info-nombre">${c.name}</h3>
                        <div class="status__info">
                            <div class="acavaelstatus" style="${styleStatus}"></div>
                            <p class="status__infotxt">${capitalize(c.status)} - ${c.species}</p>
                        </div>
                    </div>

                    <div class="info">
                        <p class='card-info'>Last known location:</p>
                        <p>${capitalize(c.location.name)}</p>
                    </div>

                    <div class="info">
                        <p class='card-info'>First seen in:</p>
                        <p>${firstSeen}</p>
                    </div>

                </div>

            </div>  
        `



    });

    document.getElementById('infoCharacter').innerHTML = html
}

const pagination = (info) => {
    
    
    
    let preDisabled = info.prev == null ? 'disabled' : ''
    let aDisabled = info.prev == null ? 'pointer-events: none;' : ''
    
    let nextDisabled = info.next == null ? 'disabled' : ''
    let aNext = info.next == null ? 'pointer-events: none;' : ''
    let textoCount = info.count > 1 ? 'results' : 'result'
   
    let html = '';
    html += `<a onclick="getData('${info.prev}')" style="${aDisabled}" id='prev'><button type="button" id='prev' class="btn btn-secondary btn-lg ${preDisabled}" style="margin-right: 15px;">Previous</button></a>`
    html += `<a onclick="getData('${info.next}')" style="${aNext}" id='next' <button type="button" class="btn btn-primary btn-lg ${nextDisabled}" id='next' >Next</button></a>`

    document.getElementById('navegation').innerHTML = html

    let contador = '';
    contador += `<h1 class="navegation__title display-5" style="text-align: center;">Characters: ${info.count} ${textoCount}</h1>`

    document.getElementById('titlew-count').innerHTML = contador
}





getData(API);