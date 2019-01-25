$(document).ready(function () {
    // Mobile toggler
    $('.menu').on('click', function (e) {
        $('#nav').toggle('hide-mobile');
    })

    $('#exit').on('click', function (e) {
        $('#nav').css({ display: 'none' });
    })
});