const API = 'https://rickandmortyapi.com/api/character/'



const getData = (apiURL) => {
    return fetch(apiURL)
    .then( response => response.json())
    .then ( json => { printData(json), pagination(json.info) } )
    .catch(error => {
        mostrar_error()
    })
}

const mostrar_error = () => {
    document.getElementById('count').remove();
    document.getElementById('prev').remove();
    document.getElementById('next').remove();
    let html = `
            <div class="col-xxl-4 col-lg-12 col-md-12 flex-grow-1 justify-content-center align-items-center">
            <div class="card mb-3">
                <div class="row g-0" style="align-items: center;">

                        <div class="col-md-12">
                            <div class="card-body">
                                <section>
                                    <h2 class="card-title text-center">Error</h2>
                                    <div class="status d-flex align-items-center justify-content-center">

                                        <p class="text-center" style="color: white;">¡No se encontraron resultados para su busqueda!</p>

                                    </div>


                                </section>



                            </div>
                        </div>
                </div>
            </div>
    </div>
        `
    
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
        <div class="col-xxl-4 col-md-12 col-lg-6 flex-grow-1">
            <div class="card h-100" style="width: 400px;">

                <div class="imagen text-center">
                    <img src="${c.image}" class="card-img-top" alt="..." style="max-width: 250px; border-radius: 50%; margin: 20px; box-shadow: #060410 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;">
                </div>

                <div class="card-body">
            
                    <section class='sec-arriba'>
                        <h2 class="card-title">${c.name}</h2>
                        <div class="status d-flex align-items-center">
                            <span class="section__icon" style="${styleStatus}">
                            </span>

                            <p style="color: white;">${capitalize(c.status)} - ${c.species}</p>

                        </div>
                    </section>

                    <section>                              
                            <p class="card-text">Last known location:</p>
                            <p class="card-info">${capitalize(c.location.name)}</p>
                    </section>

                </div>

                <div class="card-footer">
                        <p class="card-text">First seen in:</p>
                        <p class='card-info'>${firstSeen}</p>
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

    let html = `<h1 style="color: #f4f6ff;" id='count' >${info.count} ${textoCount}</h1>`
    html += `<a onclick="getData('${info.prev}')" style="${aDisabled}" id='prev'><button type="button" id='prev' class="btn btn-secondary btn-lg ${preDisabled}" style="margin-right: 15px;">Previous</button></a>`
    html += `<a onclick="getData('${info.next}')" style="${aNext}" id='next' <button type="button" class="btn btn-primary btn-lg ${nextDisabled}" id='next' >Next</button></a>`

    document.getElementById('buttons').innerHTML = html
}





getData(API);