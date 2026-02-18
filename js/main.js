/* ============================================================
   QCU PORTFOLIO — main.js
   All pages share this script.
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

    /* ── ACTIVE NAV HIGHLIGHT ── */
    var currentPage = document.body.getAttribute('data-page');
    document.querySelectorAll('.nav-links a').forEach(function (a) {
        if (a.getAttribute('data-page') === currentPage) {
            a.classList.add('active');
        }
    });

    /* ── MOBILE HAMBURGER ── */
    var toggle = document.getElementById('navToggle');
    var navLinks = document.getElementById('navLinks');

    if (toggle && navLinks) {
        toggle.addEventListener('click', function () {
            navLinks.classList.toggle('open');
            toggle.classList.toggle('open');
        });

        // close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('open');
                toggle.classList.remove('open');
            });
        });

        // close menu on outside click
        document.addEventListener('click', function (e) {
            if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('open');
                toggle.classList.remove('open');
            }
        });
    }

    /* ── TYPING EFFECT (index.html only) ── */
    var typeTarget = document.getElementById('typeTarget');
    if (typeTarget) {
        var words = ['BSIT Student.', 'UI/UX Designer.', 'Java Programmer.', 'QCU Scholar.'];
        var wi = 0, ci = 0, deleting = false;

        function type() {
            var word = words[wi];
            if (!deleting) {
                typeTarget.textContent = word.substring(0, ci + 1);
                ci++;
                if (ci === word.length) {
                    deleting = true;
                    setTimeout(type, 1600);
                    return;
                }
            } else {
                typeTarget.textContent = word.substring(0, ci - 1);
                ci--;
                if (ci === 0) {
                    deleting = false;
                    wi = (wi + 1) % words.length;
                }
            }
            setTimeout(type, deleting ? 60 : 100);
        }
        type();
    }

    /* ── SCROLL FADE-IN ANIMATION ── */
    var fadeEls = document.querySelectorAll('.fade-in');
    if (fadeEls.length && 'IntersectionObserver' in window) {
        var fadeObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        fadeEls.forEach(function (el) { fadeObserver.observe(el); });
    } else {
        // fallback: just show all
        fadeEls.forEach(function (el) { el.classList.add('visible'); });
    }

    /* ── SKILL BAR ANIMATION (skills.html) ── */
    var skillFills = document.querySelectorAll('.sk-fill[data-width]');
    if (skillFills.length && 'IntersectionObserver' in window) {
        var skillObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.width = entry.target.getAttribute('data-width');
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        skillFills.forEach(function (el) { skillObserver.observe(el); });
    }

    /* ── CONTACT FORM (client-side demo) ── */
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var btn = contactForm.querySelector('.btn-send');
            var successMsg = document.getElementById('formSuccess');

            btn.textContent = 'Sending…';
            btn.disabled = true;

            setTimeout(function () {
                btn.textContent = 'Send Message →';
                btn.disabled = false;
                contactForm.reset();
                if (successMsg) {
                    successMsg.style.display = 'block';
                    setTimeout(function () {
                        successMsg.style.display = 'none';
                    }, 4000);
                }
            }, 1000);
        });
    }

    /* ── FOOTER YEAR ── */
    var yearEl = document.getElementById('footerYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ── BACK TO TOP ── */
    var backTop = document.getElementById('backToTop');
    if (backTop) {
        backTop.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

});
