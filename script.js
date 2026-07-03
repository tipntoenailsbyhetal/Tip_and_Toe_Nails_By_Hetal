document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.site-header');
    const logoWrapper = document.querySelector('.logo-wrapper');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mainNav = document.querySelector('.main-nav');

    // Smooth Scroll Scaling Engine
    window.addEventListener('scroll', () => {
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
    });

    // Mobile Navigation Drawer Toggle System
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            mobileToggle.classList.toggle('open');
        });
    }

    // Smooth scrolling calculation layout logic
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                }
                
                const headerOffset = 90;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});

// Dynamic Client Redirection Engine for WhatsApp Form Submissions
document.getElementById('bookingForm').addEventListener('submit', function(e) {
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