document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation class to curriculum items when they come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe curriculum items for animation with sequential delay
    document.querySelectorAll('.curriculum-item').forEach((item, index) => {
        // Add staggered delay for sequential animations
        item.style.animationDelay = `${index * 0.3}s`;
        observer.observe(item);
    });

    // Add staggered animation to connectors
    document.querySelectorAll('.connector').forEach((connector, index) => {
        connector.style.transitionDelay = `${(index + 1) * 0.3 + 0.15}s`;
        connector.style.transition = 'height 0.5s ease, width 0.5s ease, opacity 0.5s ease';
        connector.style.opacity = '0';
        connector.style.height = '0';
        connector.style.width = '0';
    });

    // Observer for connectors animation
    const connectorObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const connectors = document.querySelectorAll('.connector');
                
                setTimeout(() => {
                    connectors.forEach((connector, index) => {
                        setTimeout(() => {
                            connector.style.opacity = '1';
                            
                            if (window.innerWidth >= 768) {
                                connector.style.width = '2.5rem';
                                connector.style.height = '3px';
                            } else {
                                connector.style.height = '3rem';
                                connector.style.width = '3px';
                            }
                        }, index * 300);
                    });
                }, 300);
                
                connectorObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Observe the curriculum section for connector animations
    const curriculumSection = document.querySelector('.curriculum');
    if (curriculumSection) {
        connectorObserver.observe(curriculumSection);
    }

    // Add fade-in animation for sections
    const fadeInSections = document.querySelectorAll('.team, .highlight, .cta, .about');
    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    fadeInSections.forEach(section => {
        section.classList.add('fade-in-hidden');
        fadeInObserver.observe(section);
    });

    // Subtle parallax effect for highlight section
    const highlight = document.querySelector('.highlight');
    if (highlight) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const offset = scrollPosition * 0.05;
            highlight.style.backgroundPosition = `center ${offset}px`;
        });
    }

    // Add hover effect for team members
    document.querySelectorAll('.team-member').forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.classList.add('active');
        });
        
        member.addEventListener('mouseleave', function() {
            this.classList.remove('active');
        });
    });

    // Animate CTA button with pulse effect
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        setTimeout(() => {
            button.classList.add('pulse');
        }, 2000);
    });

    // Handle window resize for connector orientation
    window.addEventListener('resize', function() {
        const connectors = document.querySelectorAll('.connector');
        connectors.forEach(connector => {
            if (window.innerWidth >= 768) {
                connector.style.height = '3px';
                connector.style.width = '2.5rem';
            } else {
                connector.style.width = '3px';
                connector.style.height = '3rem';
            }
        });
    });
}); 