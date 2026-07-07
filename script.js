document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.site-header');
    const logoWrapper = document.querySelector('.logo-wrapper');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mainNav = document.querySelector('.main-nav');

    // 1. Smooth Scroll Scaling Engine & Dynamic Scroll-Spy Hash Links
    window.addEventListener('scroll', () => {
        // Handle Header Scale Animation
        if (window.scrollY > 40) {
            header.style.backgroundColor = 'rgba(2, 6, 23, 0.98)';
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.6)';
            
            if (window.innerWidth > 968) {
                logoWrapper.style.width = '90px';
                logoWrapper.style.height = '90px';
                logoWrapper.style.top = '5px';
            }
        } else {
            header.style.backgroundColor = 'rgba(2, 6, 23, 0.85)';
            header.style.boxShadow = 'none';
            
            if (window.innerWidth > 968) {
                logoWrapper.style.width = '110px';
                logoWrapper.style.height = '110px';
                logoWrapper.style.top = '10px';
            }
        }

        // Scroll-Spy: Track user position and seamlessly update the address URL hash bar
        let currentSectionId = '';
        const sections = document.querySelectorAll('header, section, div[id]');
        const scrollPosition = window.scrollY + 140; // Offset accounts for header thickness

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const id = section.getAttribute('id');
            
            if (id && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = id;
            }
        });

        if (currentSectionId) {
            const activeLink = document.querySelector(`.nav-link[href="#${currentSectionId}"]`);
            if (activeLink && !activeLink.classList.contains('active')) {
                document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
                activeLink.classList.add('active');
                // Updates the link dynamically without jarring visual page jumps
                history.replaceState(null, null, `#${currentSectionId}`);
            }
        }
    });

    // 2. Mobile Navigation Drawer Toggle System
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            mobileToggle.classList.toggle('open');
        });
    }

    // 3. Smooth Scrolling Logic With Click Tracking URL Updates
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    if (mobileToggle) mobileToggle.classList.remove('open');
                }
                
                // Keep the active highlight on clicked tab
                document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
                if (this.classList.contains('nav-link')) {
                    this.classList.add('active');
                }
                
                const headerOffset = 90;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Update the address bar link on click instantly
                history.pushState(null, null, targetId);
            }
        });
    });
});

// 4. Dynamic Client Redirection Engine for WhatsApp Form Submissions
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('userName').value;
        const phone = document.getElementById('userPhone').value;
        const service = document.getElementById('userService').value;
        const message = document.getElementById('userMessage').value;

        const whatsappNumber = '13652757796'; 
        const text = `Hi! I would like to book an appointment.%0A%0A` +
                     `Name: ${name}%0A` +
                     `Phone: ${phone}%0A` +
                     `Service: ${service}%0A` +
                     `Notes: ${message}`;

        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`;
        window.open(whatsappUrl, '_blank');
    });
}