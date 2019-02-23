document.addEventListener('DOMContentLoaded', appStart)

const sounds = {
    97: "boom",
    115: "clap",
    100: "hihat",
    102: "kick",
    103: "openhat",
    104: "ride",
    106: "snare",
    107: "tink",
    108: "tom"
}

let channel = []
let isRecording = false
let recStart = null

let channel1 = []
let channel2 = []
let channel3 = []
let channel4 = []

let isRecording1 = false
let isRecording2 = false
let isRecording3 = false
let isRecording4 = false

let recStart1 = null
let recStart2 = null
let recStart3 = null
let recStart4 = null

function appStart() {
    window.addEventListener('keypress', playSound)
    document.querySelector('#rec').addEventListener('click',
        (e) => {
            isRecording = !isRecording
            recStart = Date.now()
            e.target.style.background = isRecording ? '#F44336' : '#fff'
            e.target.style.color = isRecording ? '#fff' : '#555'
            e.target.innerHTML = isRecording ? 'Stop' : 'Rec'
        })

    document.querySelector('#track1').addEventListener('click',
        (e) => {
            isRecording1 = !isRecording1
            recStart1 = Date.now()
            e.target.innerHTML = isRecording1 ? 'Stop' : 'Rec'
        })
    document.querySelector('#track2').addEventListener('click',
        (e) => {
            isRecording2 = !isRecording2
            recStart2 = Date.now()
            e.target.innerHTML = isRecording2 ? 'Stop' : 'Rec'
        })
    document.querySelector('#track3').addEventListener('click',
        (e) => {
            isRecording3 = !isRecording3
            recStart3 = Date.now()
            e.target.innerHTML = isRecording3 ? 'Stop' : 'Rec'
        })
    document.querySelector('#track4').addEventListener('click',
        (e) => {
            isRecording4 = !isRecording4
            recStart4 = Date.now()
            e.target.innerHTML = isRecording4 ? 'Stop' : 'Rec'
        })


    document.querySelector('#play').addEventListener('click', function () {
        playMusic(channel);
    })
    document.querySelector('#playTrack1').addEventListener('click', function () {
        playMusic(channel1);
    })
    document.querySelector('#playTrack2').addEventListener('click', function () {
        playMusic(channel2);
    })
    document.querySelector('#playTrack3').addEventListener('click', function () {
        playMusic(channel3);
    })
    document.querySelector('#playTrack4').addEventListener('click', function () {
        playMusic(channel4);
    })
}

function playMusic(ch) {
    ch.forEach(sound => {
        setTimeout(
            () => {
                audioDOM = document.querySelector(`#${sound.sound}`)
                audioDOM.currentTime = 0
                audioDOM.play()
            }
            , sound.time
        )
    })
}

const circles = document.querySelectorAll(".circle-sound");

function playSound(e) {
    console.log(`klawisz: ${e.keyCode}`)
    // pobranie nazwy dźwięku
    let soundName = sounds[e.keyCode];
    document.querySelector("[data-num=" + soundName + "]").classList.add("anim");
    setTimeout(function () {
        document.querySelector("[data-num=" + soundName + "]").classList.remove("anim");
    }, 200);
    // pobranie uchwytu do <audio>
    audioDOM = document.querySelector(`#${soundName}`)
    // odtworzenie dźwięku
    audioDOM.currentTime = 0
    audioDOM.play()

    // zapisanie dźwięku w tablicy
    if (isRecording) {
        channel.push({
            sound: soundName,
            time: Date.now() - recStart
        })
        console.log(channel1)
    }

    if (isRecording1) {
        channel1.push({
            sound: soundName,
            time: Date.now() - recStart1
        })
        console.log(channel1)
    }

    if (isRecording2) {
        channel2.push({
            sound: soundName,
            time: Date.now() - recStart2
        })
        console.log(channel2)
    }

    if (isRecording3) {
        channel3.push({
            sound: soundName,
            time: Date.now() - recStart3
        })
        console.log(channel3)
    }

    if (isRecording4) {
        channel4.push({
            sound: soundName,
            time: Date.now() - recStart4
        })
        console.log(channel4)
    }
}

// usuwanie zawartości ścieżek
let resets = document.querySelectorAll(".reset-btn");
let channels = [channel, channel1, channel2, channel3, channel4];

for (let i = 0; i < resets.length; i++) {
    resets[i].addEventListener('click', function () {
        channels[i].length = 0;
    })
}

// odtworzenie wszystkich kanałów
let playAll = document.querySelector('#playAll');
playAll.addEventListener('click', function () {
    playMusic(channel);
    playMusic(channel1);
    playMusic(channel2);
    playMusic(channel3);
    playMusic(channel4);
})
