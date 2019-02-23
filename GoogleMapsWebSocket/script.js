let uluru, map, marker
let ws
let players = {}
// losowy nick dla użytkownika
let nick = Math.random() * 1000000;

// losowy kolor ikony użytkownika
function RandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function initMap() {
    uluru = { lat: -25.363, lng: 131.044 };
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: uluru,
        keyboardShortcuts: false
    });
    marker = new google.maps.Marker({
        position: uluru,
        map: map,
        animation: google.maps.Animation.DROP,
        icon: 'https://via.placeholder.com/20/' + RandomColor()
    });
    getLocalization()
    startWebSocket()
    addKeyboardEvents()
}

function addKeyboardEvents() {
    window.addEventListener('keydown', poruszMarkerem)
}
function poruszMarkerem(ev) {
    let lat = marker.getPosition().lat()
    let lng = marker.getPosition().lng()
    let iconn = marker.icon;

    switch (ev.code) {
        case 'ArrowUp':
            lat += 0.1
            break;
        case 'ArrowDown':
            lat -= 0.1
            break;
        case 'ArrowLeft':
            lng -= 0.1
            break;
        case 'ArrowRight':
            lng += 0.1
            break;
    }
    let position = {
        lat,
        lng
    }
    let wsData = {
        lat: lat,
        lng: lng,
        id: nick,
        icon: iconn
    }

    marker.setPosition(position)
    ws.send(JSON.stringify(wsData))
}
// połączenie z serwerem WebSocket
function startWebSocket() {
    let url = 'ws://91.121.6.192:8010';
    ws = new WebSocket(url)
    ws.addEventListener('open', onWSOpen)
    ws.addEventListener('message', onWSMessage)
}

function onWSOpen(data) {
    console.log(data);
}
function onWSMessage(e) {
    // filtrowanie wiadomości - odróżnienie ich od komunikatów o położeniu na mapie przez dodanie identyfikatora 'msgchatnumberx7y5io2' do każdej wiadomości
    if (e.data.substring(0, 20) == 'msgchatnumberx7y5io2') {
        console.log(e.data);
        output.innerHTML += '<div class=\"msgtext\">' + e.data.substring(20) + '</div>';
    } else {
        let data = JSON.parse(e.data)

        if (!players['user' + data.id]) {
            players['user' + data.id] = new google.maps.Marker({
                position: { lat: data.lat, lng: data.lng },
                map: map,
                icon: data.icon
            })
        } else {
            players['user' + data.id].setPosition({
                lat: data.lat,
                lng: data.lng
            })
        }
    }
}

function getLocalization() {
    navigator.geolocation.getCurrentPosition(geoOk, geoFail)
}

function geoOk(data) {
    let coords = {
        lat: data.coords.latitude,
        lng: data.coords.longitude
    }
    map.setCenter(coords)
    marker.setPosition(coords)
    console.log("geoOK")
}

function geoFail(err) {
    console.log(err)
}

//chat między użytkownikami

let input = document.querySelector("#chat-input");
let output = document.querySelector("#chat-output");
let sendMsg = document.querySelector("#send-msg");

// wysyłanie wiadomości z identyfikatorem
sendMsg.addEventListener('click', function () {
    if (!input.value == "") {
        ws.send('msgchatnumberx7y5io2' + input.value);
        input.value = '';
    }
})