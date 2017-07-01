function setInitialStates() {
    hideAll([".cta"]);
}

// ---------Preloader----------------------------------------------------------
var preloadImages = [
    "img/bg.jpg",
    "img/cta.png",
    "img/logo.png",
    "img/woman.png",
    "img/womanOver.png",
    "img/watch.png",
    "img/watch2.jpg",
    "img/watch3.jpg",
    "img/watch4.jpg",
    "img/watchCote1.jpg",
    "img/watchEnd.jpg",
    "img/watchFace.jpg"
];

function preload() {
    var lastLoadedImage = -1;
    loadNext();

    function loadNext() {
        lastLoadedImage++;
        if (lastLoadedImage >= preloadImages.length) {
            mainInit();
        } else {
            var img = new Image();
            img.onload = loadNext;
            img.src = preloadImages[lastLoadedImage];
        }
    }
}

function mainInit() {
    eventListeners();
    setInitialStates();

    seq01();
}

function seq01() {

    var twnDelay = 0;

    $('.container').show();

    TweenMax.from($(".container"), 1, { opacity: 0, ease: Power1.easeOut, delay: twnDelay });
    TweenMax.to($(".womanAnim"), 4, { x: -10, y: -40, rotation: 0.01, ease: Power1.easeOut, delay: twnDelay });
    TweenMax.to($(".watch"), 4, { x: -20, y: -30, rotation: 0.01, ease: Power1.easeOut, delay: twnDelay });


    twnDelay += 2.5;
    TweenMax.delayedCall(twnDelay, seq02);
}


function seq02() {

    var twnDelay = 0;
    TweenMax.to($(".part1"), 0.7, { rotationY: -90, ease: Power1.easeInOut, delay: twnDelay });

    twnDelay += 1;
    TweenMax.to($(".watchCote"), 0.5, { x: 75, rotation: 0.01, ease: Power1.easeInOut, delay: twnDelay });
    TweenMax.to($(".watchFace"), 0.5, { x: 140, rotation: 0.01, ease: Power1.easeInOut, delay: twnDelay });


    twnDelay += 1.5;
    TweenMax.delayedCall(twnDelay, seq03);
}

function seq03() {
    $('.cta').show();

    var twnDelay = 0;
    TweenMax.to($(".watch2"), 0.01, { opacity: 1, ease: Power1.easeInOut, delay: twnDelay });

    twnDelay += 1;
    TweenMax.to($(".watch3"), 0.01, { opacity: 1, ease: Power1.easeInOut, delay: twnDelay });

    twnDelay += 1;
    TweenMax.to($(".watch4"), 0.01, { opacity: 1, ease: Power1.easeInOut, delay: twnDelay });

    twnDelay += 1;
    TweenMax.to($(".watchEnd"), 0.01, { opacity: 1, ease: Power1.easeInOut, delay: twnDelay });

    twnDelay += 0.5;
    TweenMax.from($(".cta"), 0.6, { y: 65, ease: Power1.easeInOut, delay: twnDelay });

    twnDelay += 0.6;
    TweenMax.to($(".cta"), 0.25, { y: 5, ease: Power1.easeInOut, delay: twnDelay });
}


function hideAll(whichOnes) {
    for (q = 0; q < whichOnes.length; q++) {
        $(whichOnes[q]).hide();
    }
}

function bgExitHandler(e) {
    // TweenMax.killDelayedCallsTo(seq02);
    // TweenMax.killAll();
}

function eventListeners() {
    $(".bg-exit").on('click', bgExitHandler);
}

window.onload = preload();
