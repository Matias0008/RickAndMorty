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
            <div class="col-xxl-4 col-lg-12 col-md-12 flex-grow-1 ">
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
            <div class="col-xxl-4 col-lg-12 col-md-12 flex-grow-1 ">
            <div class="card mb-3">
                <div class="row g-0" style="align-items: center;">

                        <div class="col-md-4" style="height: 250px;">
                            <img src="${c.image}" class="img-fluid rounded-start img-img" alt="...">
                        </div>

                        <div class="col-md-8">
                            <div class="card-body">
                                <section>
                                    <h2 class="card-title">${c.name}</h2>
                                    <div class="status d-flex align-items-center">
                                        <span class="section__icon" style="${styleStatus}">
                                        </span>

                                        <p style="color: white;">${capitalize(c.status)} - ${c.species}</p>

                                    </div>


                                </section>

                                <section>                              
                                    <p class="card-text">Last known location:</p>
                                    <p class="card-info">${c.location.name}</p>
                                </section>

                                <section class="cta">
                                    <p class="card-text">First seen in:</p>
                                    <p class="card-info" id="info">${firstSeen}</p>
                                </section>

                            </div>
                        </div>
                </div>
            </div>
    </div>
        `



    });

    document.getElementById('infoCharacter').innerHTML = html
}

const pagination = (info) => {

    let preDisabled = info.prev == null ? 'disabled' : ''
    let nextDisabled = info.next == null ? 'disabled' : ''
    let textoCount = info.count > 1 ? 'results' : 'result'

    let html = `<h1 style="color: #f4f6ff; margin: 10px;" id='count'>${info.count} ${textoCount}</h1>`
    html += `<a onclick="getData('${info.prev}')" id='prev'><button type="button" id='prev' class="btn btn-secondary btn-lg ${preDisabled}" style="margin-right: 15px;">Previous</button></a>`
    html += `<a onclick="getData('${info.next}')" id='next' <button type="button" class="btn btn-primary btn-lg ${nextDisabled}" id='next' >Next</button></a>`

    document.getElementById('buttons').innerHTML = html
}





getData(API);