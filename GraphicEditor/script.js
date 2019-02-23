let file = document.querySelector("#grafika");
let canvas = document.querySelector("#canvas1");
let btnRun1j = document.querySelector("#run1");
let btnRun2n = document.querySelector("#run2");
let btnRun3k = document.querySelector("#run3");
let btnRun4neg = document.querySelector("#run4");

let ctx = canvas.getContext('2d');
let img = new Image();

var staticImgData;

img.src = "WP_20170702_012.jpg";
img.addEventListener('load', (e) => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    staticImgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
})


let jBtn = document.querySelector("#jasnoscid");
let nBtn = document.querySelector("#nasycenieid");
let kBtn = document.querySelector("#kontrastid");
let jAfter = document.querySelector("#jAfter");
let nAfter = document.querySelector("#nAfter");
let kAfter = document.querySelector("#kAfter");

// JASNOŚĆ

jBtn.addEventListener('input', (e) => {
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    jAfter.style.left = (parseFloat(jBtn.value) * 19) + 'px';
    console.log(imageData)
    for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i] = staticImgData.data[i] + (((255 - staticImgData.data[i]) / 10) * parseFloat(jBtn.value))

        imageData.data[i + 1] = staticImgData.data[i + 1] + (((255 - staticImgData.data[i + 1]) / 10) * parseFloat(jBtn.value))

        imageData.data[i + 2] = staticImgData.data[i + 2] + (((255 - staticImgData.data[i + 2]) / 10) * parseFloat(jBtn.value))
    }
    ctx.putImageData(imageData, 0, 0)
})

// NEGATYW:

btnRun4neg.addEventListener('click', (e) => {
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    console.log(imageData)
    for (let i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i] = 255 - imageData.data[i]
        imageData.data[i + 1] = 255 - imageData.data[i + 1]
        imageData.data[i + 2] = 255 - imageData.data[i + 2]
    }
    ctx.putImageData(imageData, 0, 0)
})

// NASYCENIE

nBtn.addEventListener('input', (e) => {
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    nAfter.style.left = (parseFloat(nBtn.value) * 19) + 'px';
    console.log(imageData);
    for (let i = 0; i < imageData.data.length; i += 4) {

        let max = Math.max(imageData.data[i], imageData.data[i + 1], imageData.data[i + 2]);
        if (max == imageData.data[i]) {
            imageData.data[i] = staticImgData.data[i] + (((255 - staticImgData.data[i]) / 10) * parseFloat(nBtn.value));
        } else if (max == imageData.data[i + 1]) {
            imageData.data[i + 1] = staticImgData.data[i + 1] + (((255 - staticImgData.data[i + 1]) / 10) * parseFloat(nBtn.value));
        } else {
            imageData.data[i + 2] = staticImgData.data[i + 2] + (((255 - staticImgData.data[i + 2]) / 10) * parseFloat(nBtn.value));
        }
    }
    ctx.putImageData(imageData, 0, 0)
})

// KONTRAST

kBtn.addEventListener('input', (e) => {
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    kAfter.style.left = (parseFloat(kBtn.value) * 19) + 'px';
    console.log(imageData)
    for (let i = 0; i < imageData.data.length; i += 4) {
        let max2 = Math.max(imageData.data[i], imageData.data[i + 1], imageData.data[i + 2]);
        if (max2 == imageData.data[i]) {
            imageData.data[i] = staticImgData.data[i] + (((255 - staticImgData.data[i]) / 10) * parseFloat(kBtn.value));
            imageData.data[i + 1] = staticImgData.data[i + 1] - (((staticImgData.data[i + 1]) / 10) * parseFloat(kBtn.value));
            imageData.data[i + 2] = staticImgData.data[i + 2] - (((staticImgData.data[i + 2]) / 10) * parseFloat(kBtn.value));
        } else if (max2 == imageData.data[i + 1]) {
            imageData.data[i + 1] = staticImgData.data[i + 1] + (((255 - staticImgData.data[i + 1]) / 10) * parseFloat(kBtn.value));
            imageData.data[i] = staticImgData.data[i] - (((staticImgData.data[i]) / 10) * parseFloat(kBtn.value));
            imageData.data[i + 2] = staticImgData.data[i + 2] - (((staticImgData.data[i + 2]) / 10) * parseFloat(kBtn.value));
        } else {
            imageData.data[i + 2] = staticImgData.data[i + 2] + (((255 - staticImgData.data[i + 2]) / 10) * parseFloat(kBtn.value));
            imageData.data[i + 1] = staticImgData.data[i + 1] - (((staticImgData.data[i + 1]) / 10) * parseFloat(kBtn.value));
            imageData.data[i] = staticImgData.data[i] - (((staticImgData.data[i]) / 10) * parseFloat(kBtn.value));
        }
    }
    ctx.putImageData(imageData, 0, 0)
})