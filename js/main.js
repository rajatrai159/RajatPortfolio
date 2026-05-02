$(document).ready(function() {

    // ---- PRELOADER ----
    setTimeout(function() {
        $('#preloader').addClass('hidden');
    }, 2200);

    // ---- THEME TOGGLE ----
    const $body = $('body');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    $body.attr('data-theme', currentTheme);

    $('#themeToggle').on('click', function() {
        const newTheme = $body.attr('data-theme') === 'dark' ? 'light' : 'dark';
        $body.attr('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // ---- NAVBAR SCROLL EFFECT ----
    const $navbar = $('#mainNav');
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 50) {
            $navbar.addClass('scrolled');
        } else {
            $navbar.removeClass('scrolled');
        }
    });

    // ---- SMOOTH SCROLL ----
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            const offset = target.offset().top - 80;
            $('html, body').animate({
                scrollTop: offset
            }, 800, 'easeInOutCubic');
        }
    });

    // Custom easing
    $.easing.easeInOutCubic = function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    };

    // ---- ACTIVE NAV LINK ----
    const sections = $('section[id]');
    $(window).on('scroll', function() {
        const scrollPos = $(window).scrollTop() + 200;
        sections.each(function() {
            const $section = $(this);
            const sectionTop = $section.offset().top;
            const sectionHeight = $section.outerHeight();
            const sectionId = $section.attr('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                $('.nav-link').removeClass('active');
                $(`.nav-link[href="#${sectionId}"]`).addClass('active');
            }
        });
    });

    // ---- SCROLL ANIMATIONS ----
    const $animateElements = $('[data-animate]');

    function checkAnimations() {
        const windowHeight = $(window).height();
        const scrollTop = $(window).scrollTop();

        $animateElements.each(function() {
            const $el = $(this);
            const elementTop = $el.offset().top;
            const delay = parseInt($el.attr('data-delay')) || 0;

            if (scrollTop + windowHeight > elementTop + 50) {
                setTimeout(function() {
                    $el.addClass('animated');
                }, delay);
            }
        });
    }

    // Initial check
    setTimeout(checkAnimations, 500);

    // Check on scroll
    $(window).on('scroll', function() {
        requestAnimationFrame(checkAnimations);
    });

    // ---- SKILL BAR ANIMATION ----
    const $skillBars = $('.skill-fill');
    let skillsAnimated = false;

    function animateSkills() {
        if (skillsAnimated) return;
        const $skillsSection = $('#skills');
        if ($skillsSection.length) {
            const sectionTop = $skillsSection.offset().top;
            const windowHeight = $(window).height();
            const scrollTop = $(window).scrollTop();

            if (scrollTop + windowHeight > sectionTop + 100) {
                skillsAnimated = true;
                $skillBars.each(function() {
                    const $bar = $(this);
                    const width = $bar.attr('data-width');
                    $bar.css('width', width);
                });
            }
        }
    }

    $(window).on('scroll', function() {
        requestAnimationFrame(animateSkills);
    });

    // ---- CONTACT FORM ----
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();

        // Simulate form submission
        const $submitBtn = $(this).find('.btn-submit');
        const originalText = $submitBtn.html();

        $submitBtn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin me-2"></i>Sending...');

        setTimeout(function() {
            $submitBtn.html(originalText).prop('disabled', false);
            $('#contactForm')[0].reset();

            // Show toast
            const $toast = $('#toast');
            $toast.addClass('show');
            setTimeout(function() {
                $toast.removeClass('show');
            }, 3000);
        }, 1500);
    });

    // ---- STICKY HIRE BUTTON VISIBILITY ----
    const $stickyBtn = $('#stickyHireBtn');
    $(window).on('scroll', function() {
        const scrollTop = $(window).scrollTop();
        if (scrollTop > 500) {
            $stickyBtn.css('opacity', '1').css('pointer-events', 'auto');
        } else {
            $stickyBtn.css('opacity', '0').css('pointer-events', 'none');
        }
    });

    // Initially hide sticky button
    $stickyBtn.css('opacity', '0').css('pointer-events', 'none');

    // ---- HERO TYPING EFFECT ----
    const $codeLines = $('.loader-code .code-line');
    $codeLines.each(function(index) {
        const $line = $(this);
        $line.css('animation-delay', `${(index * 0.4) + 0.2}s`);
    });

    // ---- PROJECT CARD HOVER MICRO-INTERACTIONS ----
    $('.project-card').on('mouseenter', function() {
        $(this).find('.project-icon-bg').css('transform', 'scale(1.1) rotate(5deg)');
    }).on('mouseleave', function() {
        $(this).find('.project-icon-bg').css('transform', 'scale(1) rotate(0deg)');
    });

    // ---- VALUE CARD STAGGERED ANIMATION ----
    $('.value-card').each(function(index) {
        $(this).attr('data-delay', index * 100);
    });

    // ---- CERT CARD STAGGERED ANIMATION ----
    $('.cert-card').each(function(index) {
        $(this).attr('data-delay', index * 100);
    });

    // ---- TYPING EFFECT ON HERO HEADLINE (optional enhancement) ----
    function typeWriter($element, text, speed = 50) {
        let i = 0;
        $element.text('');
        function type() {
            if (i < text.length) {
                $element.text(text.substring(0, i + 1));
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // ---- MAGNETIC BUTTON EFFECT ----
    $('.btn-primary, .btn-outline').on('mousemove', function(e) {
        const $btn = $(this);
        const rect = $btn[0].getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        $btn.css('transform', `translate(${x * 0.1}px, ${y * 0.1}px)`);
    }).on('mouseleave', function() {
        $(this).css('transform', '');
    });

    // ---- PARALLAX EFFECT FOR HERO GLOWS ----
    $(window).on('scroll', function() {
        const scrollTop = $(window).scrollTop();
        const $glow1 = $('.hero-glow-1');
        const $glow2 = $('.hero-glow-2');

        $glow1.css('transform', `translateY(${scrollTop * 0.2}px)`);
        $glow2.css('transform', `translateY(${scrollTop * -0.15}px)`);
    });

    // ---- NAVBAR COLLAPSE ON LINK CLICK (mobile) ----
    $('.navbar-nav .nav-link').on('click', function() {
        if ($(window).width() < 992) {
            $('.navbar-collapse').collapse('hide');
        }
    });

    // ---- RESUME DOWNLOAD TRACKING ----
    $('a[download]').on('click', function() {
        console.log('Resume download initiated');
    });

    // ---- SCROLL PROGRESS INDICATOR (optional visual) ----
    function updateScrollProgress() {
        const scrollTop = $(window).scrollTop();
        const docHeight = $(document).height() - $(window).height();
        const progress = (scrollTop / docHeight) * 100;

        // Could add a progress bar element if desired
    }

    $(window).on('scroll', function() {
        requestAnimationFrame(updateScrollProgress);
    });

    // ---- TILT EFFECT FOR CARDS ----
    $('.value-card, .why-card, .cert-card').on('mousemove', function(e) {
        const $card = $(this);
        const rect = $card[0].getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        $card.css('transform', `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`);
    }).on('mouseleave', function() {
        $(this).css('transform', '');
    });

    // ---- COUNTER ANIMATION FOR HERO STATS ----
    function animateCounter($element, target, suffix = '') {
        let current = 0;
        const increment = target / 40;
        const timer = setInterval(function() {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            $element.text(Math.floor(current) + suffix);
        }, 50);
    }

    // Trigger counter animation when hero is visible
    let countersAnimated = false;
    $(window).on('scroll', function() {
        if (countersAnimated) return;
        const $hero = $('#hero');
        if ($hero.length && $(window).scrollTop() + $(window).height() > $hero.offset().top + 100) {
            countersAnimated = true;
            // Animate the credibility numbers
            $('.cred-number').each(function() {
                const $el = $(this);
                const text = $el.text();
                const num = parseInt(text);
                const suffix = text.replace(/[0-9]/g, '');
                if (!isNaN(num)) {
                    animateCounter($el, num, suffix);
                }
            });
        }
    });

    // ---- KEYBOARD NAVIGATION ----
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape') {
            $('.navbar-collapse').collapse('hide');
        }
    });

    // ---- INTERSECTION OBSERVER FALLBACK ----
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const $el = $(entry.target);
                    const delay = parseInt($el.attr('data-delay')) || 0;
                    setTimeout(function() {
                        $el.addClass('animated');
                    }, delay);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        $animateElements.each(function() {
            observer.observe(this);
        });
    }

    // ---- PERFORMANCE: PAUSE ANIMATIONS WHEN TAB HIDDEN ----
    document.addEventListener('visibilitychange', function() {
        const $animated = $('[style*="animation"]');
        if (document.hidden) {
            $animated.css('animation-play-state', 'paused');
        } else {
            $animated.css('animation-play-state', 'running');
        }
    });

});
