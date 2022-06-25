
//init the map
let markers = [];
var myMap = new L.Map('map', {
    key: 'web.MntDH2dqY0P1q7ZVqduLVClHEFp97wXfiMGiLgxT',
    maptype: 'dreamy',
    poi: true,
    traffic: false,
    center: [36.2968,59.6061], //mashhad
    zoom: 13,
}).on('click', (e) => {
    //adding the marker to map
    if (markers.length > 0) {
        markers.forEach((mark) => {
            mark.remove();
        })
    }

    document.getElementById("lat").value = e.latlng.lat;
    document.getElementById("lng").value = e.latlng.lng;

    var marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(myMap);
    markers.push(marker);
    goWeather();
});

function convertToCelous(temp){
    return (temp-273).toFixed(1);
}

async function goWeather(){
    if(markers.length<1){
        alert("frist select your location");
        return;
    }

    var lat=document.getElementById("lat").value;
    var lng=document.getElementById("lng").value;
    var apiKey='d61b15818e5bddf61b0e56ed1e13c8c8'
    var weatherResult= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}`);
    var weatherJson= await weatherResult.json();

    // create elements for weather output
    var weatherInfo=document.createElement('ul');
    var location=document.createElement('li');
    var temporary=document.createElement('li');
    var description=document.createElement('li');
    var wind=document.createElement('li');

    // fill the element innerHtml
    location.innerText=`موقیعت : ${weatherJson.sys.country}-${weatherJson.name}`;
    description.innerText=`آسمان : ${(weatherJson.weather[0].description)}`;
    temporary.innerText=`دما : ${convertToCelous(weatherJson.main.temp)} سانتیگراد`;
    wind.innerText=`سرعت باد : ${((weatherJson.wind.speed)).toFixed(2)} کیلومتر/ساعت`;
    
    // add li elements to ul
    weatherInfo.appendChild(location);
    weatherInfo.appendChild(description);
    weatherInfo.appendChild(temporary);
    weatherInfo.appendChild(wind);
    document.getElementById('weather').innerHTML='';
    document.getElementById('weather').appendChild(weatherInfo);
}



