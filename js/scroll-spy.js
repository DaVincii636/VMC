/* ============================================================
   SCROLL SPY - Auto-highlight nav based on scroll position
   ============================================================ */

document.addEventListener('DOMContentLoaded', function() {
    
   // Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        const targetId = href.substring(1);
        
        // Special case for "back to top" - scroll to absolute top
       /* ── BACK TO TOP ── */
var backTop = document.getElementById('backToTop');
if (backTop) {
    backTop.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Force scroll to absolute top
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0; // For Safari
    });
}
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
    const mobileNavLinks = document.querySelectorAll('.mobile-tab-item[data-section]');

    function updateActiveNav() {
        let currentSection = '';
        const scrollPos = window.pageYOffset + 200; // Offset for better UX

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

        // Update mobile nav
        mobileNavLinks.forEach(function(link) {
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

// Override back to top to force absolute top scroll
window.addEventListener('DOMContentLoaded', function() {
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        // Remove all existing listeners by cloning
        const newBackToTop = backToTop.cloneNode(true);
        backToTop.parentNode.replaceChild(newBackToTop, backToTop);
        
        // Add fresh listener
        newBackToTop.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Force to top
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        });
    }
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        const targetId = href.substring(1);
        
        // Special case for page-top - scroll to absolute 0
        if (targetId === 'page-top') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }
        
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const offset = 80;
            const targetPosition = targetSection.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});