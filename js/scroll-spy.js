/* ============================================================
   SCROLL SPY - Auto-highlight nav based on scroll position
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {
    
    // BACK TO TOP - Handle this FIRST and separately
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Force to absolute top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth scroll for all OTHER anchor links (not back to top)
    document.querySelectorAll('a[href^="#"]:not(#backToTop)').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offset = 80; // Account for fixed navbar
                const targetPosition = targetSection.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll spy - update active nav item based on scroll position
    const sections = document.querySelectorAll('.page-section');
    const navLinks = document.querySelectorAll('.nav-links a[data-section]');

    function updateActiveNav() {
        let currentSection = '';
        const scrollPos = window.pageYOffset + 200;

        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        // Update desktop nav
        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === currentSection) {
                link.classList.add('active');
            }
        });
    }

    // Update on scroll
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveNav, 10);
    });

    // Update on load
    updateActiveNav();

    // Handle grades semester selector
    const semSelect = document.getElementById('semSelect');
    if (semSelect) {
        semSelect.addEventListener('change', function() {
            const selectedSem = this.value;
            
            // Hide all panels
            document.querySelectorAll('.sem-panel').forEach(function(panel) {
                panel.classList.remove('active');
            });
            
            // Show selected panel
            const targetPanel = document.querySelector('.sem-panel[data-sem="' + selectedSem + '"]');
            if (targetPanel) {
                targetPanel.classList.add('active');
            }

            // Update summary based on selected semester
            updateGradeSummary(selectedSem);
        });
    }

    // Function to update grade summary
    function updateGradeSummary(sem) {
        const summaries = {
            'y2s2': { gwa: '—', subjects: 7, units: 20 },
            'y2s1': { gwa: '1.54', subjects: 7, units: 20 },
            'y1s2': { gwa: '1.53', subjects: 8, units: 23 },
            'y1s1': { gwa: '1.59', subjects: 8, units: 23 }
        };

        const data = summaries[sem];
        if (data) {
            document.getElementById('sumGwa').textContent = data.gwa;
            document.getElementById('sumSubjects').textContent = data.subjects;
            document.getElementById('sumUnits').textContent = data.units;
        }
    }
});