var lat = JSON.parse(localStorage.getItem("latitude")) || [];
var long = JSON.parse(localStorage.getItem("longitude")) || [];
var ind = JSON.parse(localStorage.getItem("indice")) || 0;

var ul = document.getElementById('lista__id');
console.log(ul)

lat.forEach( el => {
    ul.innerHTML += `<li class="li__class" id="li__class">${el}</li> `
});

long.forEach( el => {
    ul.innerHTML += `<li class="li__class" id="li__class">${el}</li> `
});

function mostraPosicao(posicao){
    console.log(posicao.coords.latitude)
    console.log(posicao.coords.longitude)    
    lat[ind] = posicao.coords.latitude;
    long[ind] = posicao.coords.longitude;
    ul.innerHTML += `<li class="li__class" id="li__class">${lat[ind]} </li> `
    ul.innerHTML += `<li class="li__class" id="li__class">${long[ind]} </li> `    
    ind++;
    localStorage.setItem("latitude", JSON.stringify(lat))
    localStorage.setItem("longitude", JSON.stringify(long))
    localStorage.setItem("indice", JSON.stringify(ind))    
}

function error(){
    alert("Posição não encontrada");
}

const options = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 3600000,
}

const watchID = navigator.geolocation.
watchPosition(mostraPosicao,error, options);

var corpo = document.getElementById('corpo');
var botao = document.getElementById('button__id');
botao.addEventListener('click', evento => { 
    //window.location.replace('./index.html')
    corpo.innerHTML = `<button onClick="window.location.reload()">Reiniciar</button> <div id="map"></div>`
    mostra();

})







function mostra(){

var lat = JSON.parse(localStorage.getItem("latitude")) || [];
var long = JSON.parse(localStorage.getItem("longitude")) || [];

const map = L.map('map' ).setView([lat[0],long[0]],16) 
const layer  =L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 19,
	ext: 'png'
});

layer.addTo(map)

const marker= L.marker([lat[0],long[0]])
marker.addTo(map) 

for(var i=0 ; i<lat.length ; i++){
	const marker2 = L.marker([lat[i], long[i]])
	marker2.addTo(map)
}
}