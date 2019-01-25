$(document).ready(function () {
    // Glider js
    new Glider(document.querySelector('.glider'), {
        slidesToShow: 1,
        draggable: true,
        dots: '#dots',
        responsive: [{
            breakpoint: 875,
            settings: {
                slidesToShow: 2
            }
        }]
    });

    // tweening
    TweenMax.to("overlay h1", 2, {
        opacity: 0,
        y: -80,
        ease: Expo.easeInOut
    })

    TweenMax.to(".overlay", 2, {
        delay: 1,
        top: "-100%",
        ease: Expo.easeInOut
    })

    TweenMax.to(".logo", 1, {
        delay: 2.4,
        top: "-100%",
        ease: Expo.easeInOut
    })

    TweenMax.staggerFrom("nav ul li", 1, {
        delay: 2.4,
        opacity: 0,
        y: 20,
        ease: Expo.easeInOut
    })

    TweenMax.from(".intro h1", 2, {
        delay: 3.2,
        opacity: 0,
        y: 20,
        ease: Expo.easeInOut
    })
    TweenMax.from(".intro p", 2, {
        delay: 3.2,
        opacity: 0,
        y: 20,
        ease: Expo.easeInOut
    })
    TweenMax.from(".intro a", 2, {
        delay: 3.5,
        opacity: 0,
        y: 20,
        ease: Expo.easeInOut
    })
});