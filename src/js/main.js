(function ($) {
    "use strict";

    // Loading page
    window.addEventListener('load', function() {
        setTimeout(function() {
            document.getElementById('loading-overlay').classList.add('hidden');
        }, 2000); // Adjust the timeout duration as needed
    });

    // countdown timer
    document.addEventListener("DOMContentLoaded", function() {
        // Set the date we're counting down to
        var countDownDate = new Date("July 18, 2026 00:00:00").getTime();

        // Update the count down every 1 second
        var x = setInterval(function() {
            // Get today's date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result in the elements with id="countdown" and id="countdown2"
            var countdownHTML = 
                "<div style='display: flex; justify-content: space-around; width: 100%; font-family: \"Crimson Text\", serif;'>" +
                "<div style='text-align: center; margin: 0 20px;'>" +
                "<div style='font-size: 2.5rem;'>" + days + "</div><div style='font-size: 1rem;'>Days</div></div>" +
                "<div style='text-align: center; margin: 0 20px;'>" +
                "<div style='font-size: 2.5rem;'>" + hours + "</div><div style='font-size: 1rem;'>Hours</div></div>" +
                "<div style='text-align: center; margin: 0 20px;'>" +
                "<div style='font-size: 2.5rem;'>" + minutes + "</div><div style='font-size: 1rem;'>Minutes</div></div>" +
                "<div style='text-align: center; margin: 0 20px;'>" +
                "<div style='font-size: 2.5rem;'>" + seconds + "</div><div style='font-size: 1rem;'>Seconds</div></div></div>";

            document.getElementById("countdown").innerHTML = countdownHTML;
            document.getElementById("countdown2").innerHTML = countdownHTML;

            // If the count down is over, write some text and show confetti
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("countdown").innerHTML = "<div style='font-family: \"Crimson Text\", serif; font-size: 4rem;'>Our Wedding Day is Here!</div>";
                document.getElementById("countdown2").innerHTML = "<div style='font-family: \"Crimson Text\", serif; font-size: 4rem;'>Our Wedding Day is Here!</div>";
                adjustFontSize();

                function adjustFontSize() {
                    var elements = document.querySelectorAll("#countdown div, #countdown2 div");
                    elements.forEach(function(element) {
                        if (window.innerWidth < 576) {
                            element.style.fontSize = "2rem";
                        } else if (window.innerWidth < 768) {
                            element.style.fontSize = "3rem";
                        } else if (window.innerWidth < 992) {
                            element.style.fontSize = "3.5rem";
                        } else {
                            element.style.fontSize = "4rem";
                        }
                    });
                }

                window.addEventListener("resize", adjustFontSize);
                showConfetti();
            }
        }, 1000);

        function showConfetti() {
            var confettiContainer = document.createElement("div");
            confettiContainer.style.position = "fixed";
            confettiContainer.style.top = "0";
            confettiContainer.style.left = "0";
            confettiContainer.style.width = "100%";
            confettiContainer.style.height = "100%";
            confettiContainer.style.pointerEvents = "none";
            confettiContainer.style.zIndex = "9999";
            document.body.appendChild(confettiContainer);

            var style = document.createElement("style");
            style.innerHTML = `
                @keyframes confetti-fall {
                    0% { transform: translateY(-100vh) rotate(0); }
                    100% { transform: translateY(100vh) rotate(360deg); }
                }
            `;
            document.head.appendChild(style);

            function createConfetti() {
                for (var i = 0; i < 200; i++) { // Increased the number of confetti elements
                    var confetti = document.createElement("div");
                    confetti.style.position = "absolute";
                    confetti.style.width = "10px";
                    confetti.style.height = "10px";
                    confetti.style.backgroundColor = getRandomColor();
                    confetti.style.top = Math.random() * -100 + "vh"; // Start off-screen
                    confetti.style.left = Math.random() * 100 + "%";
                    confetti.style.animation = "confetti-fall 3s linear infinite";
                    confetti.style.animationDelay = Math.random() * 3 + "s";
                    confettiContainer.appendChild(confetti);
                }
            }

            createConfetti();

            // Remove confetti after 15 seconds
            setTimeout(function() {
                document.body.removeChild(confettiContainer);
            }, 15000); // Increased the duration to 15 seconds
        }

        function getRandomColor() {
            var letters = "0123456789ABCDEF";
            var color = "#";
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
    });

    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Scroll to Bottom
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scroll-to-bottom').fadeOut('slow');
        } else {
            $('.scroll-to-bottom').fadeIn('slow');
        }
    });


    // Portfolio isotope and filter
    $(document).ready(function() {
        var $portfolioContainer = $('.portfolio-container');
        $portfolioContainer.imagesLoaded(function() {
            var portfolioIsotope = $portfolioContainer.isotope({
                itemSelector: '.portfolio-item',
                layoutMode: 'fitRows'
            });

            $('#portfolio-flters li').on('click', function() {
                var $this = $(this);
                if ($this.hasClass('active')) {
                    $this.removeClass('active');
                    portfolioIsotope.isotope({ filter: '*' });
                } else {
                    $('#portfolio-flters li').removeClass('active');
                    $this.addClass('active');
                    portfolioIsotope.isotope({ filter: $this.data('filter') });
                }
            });
        });
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Gallery carousel
    $(".gallery-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1500,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:2
            },
            768:{
                items:3
            },
            992:{
                items:4
            },
            1200:{
                items:5
            }
        }
    });
    
})(jQuery);

