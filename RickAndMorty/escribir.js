const maquina = document.getElementById('maquina-escribir');

const maquinaEscribir = (text= '', tiempo=200, label='') => {
    let arr = text.split('');
    label.innerHTML = '';
    let cont = 0

    let escribir = setInterval(function(){
        label.innerHTML += arr[cont]
        cont++

        if (cont == arr.length) {
            clearInterval(escribir)
        }
    }, tiempo)

}
 
maquinaEscribir("Hecho por: Matias Delgado", 150, maquina)
