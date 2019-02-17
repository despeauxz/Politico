$(document).ready(function () {
    // Mobile toggler
    $('.menu').on('click', function (e) {
        $('#nav').toggle('hide-mobile');
        e.preventDefault();
    })

    $('#exit').on('click', function (e) {
        $('#nav').css({ display: 'none' });
        e.preventDefault();
    })

    // Modal
    const $form_modal = $('.modal'),
        $trigger = $('.modal_trigger')
        $main_nav = $('.dashboard-wrapper');

    $($trigger).on('click', function () {
        var modal = $(this).attr('data-modal');
        $(modal).addClass('is-visible');
    })

    $('.more ul li a').on('click', function () {
        var modal = $(this).attr('data-modal');
        $(modal).addClass('is-visible');
    })


    $('.modal').on('click', function (event) {
        if ($(event.target).is($form_modal) || $(event.target).is('.close-modal')) {
            $form_modal.removeClass('is-visible');
        }
    });
    // close modal when clicking the esc keyboard button
    $(document).keyup(function (event) {
        if (event.which == '27') {
            $form_modal.removeClass('is-visible');
        }
    });

    // Dropdown
    $('.dropdown').on('click', function () {
        var target = $('.dropdown-menu');
        if (target.hasClass('fadeInDown')) {
            target.removeClass('fadeInDown').addClass('fadeOutUp').css({ display: 'none' });
        } else {
            target.css({ display: 'block' }).removeClass('fadeOutUp').addClass('fadeInDown');
        }
    });

    // Accordion
    $('.accordion').on('click', '.title', function () {
        $(this).next().slideDown();
        $('.accordion-info').not($(this).next()).slideUp();
    });

    $('.accordion').on('click', '.item', function () {
        $(this).addClass('active').siblings().removeClass('active');
    });


});