// Initial reveal and loader handling
window.addEventListener("load", () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
            document.body.classList.remove('loading');

            // Staggered reveal for initial content
            const heroReveals = document.querySelectorAll('#home .reveal');
            heroReveals.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('active');
                }, 200 * index);
            });
        }, 1200);
    }
});

// Custom Scroll Reveal Animation
function reveal() {
    const reveals = document.querySelectorAll(".reveal:not(.active)");

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add("active");
        }
    });
}

window.addEventListener("scroll", reveal);

document.addEventListener("DOMContentLoaded", () => {
    const glassNav = document.querySelector('.glass-nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');

            if (navLinks.classList.contains('active')) {
                icon.className = 'fas fa-times';
                // Reset staggering for clean animation
                const links = navLinks.querySelectorAll('li');
                links.forEach((link, index) => {
                    link.style.transitionDelay = `${0.1 + index * 0.05}s`;
                });
            } else {
                icon.className = 'fas fa-bars';
                const links = navLinks.querySelectorAll('li');
                links.forEach(link => {
                    link.style.transitionDelay = '0s';
                });
            }
        });

        // Close menu when link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.className = 'fas fa-bars';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') &&
                !navLinks.contains(e.target) &&
                !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        });
    }

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle form submit
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    access_key: "61c02d46-cc1a-4d5b-8424-b821e3f290ce",
                    name: name,
                    email: email,
                    message: message
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        submitBtn.classList.add('btn-success');
                        submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                        contactForm.reset();

                        setTimeout(() => {
                            submitBtn.classList.remove('btn-success');
                            submitBtn.innerHTML = originalBtnText;
                            submitBtn.disabled = false;
                        }, 4000);
                    } else {
                        console.error("Web3Forms error:", data);
                        submitBtn.innerHTML = 'Error! Try Again';
                        setTimeout(() => {
                            submitBtn.innerHTML = originalBtnText;
                            submitBtn.disabled = false;
                        }, 4000);
                    }
                })
                .catch(error => {
                    console.error("Form error:", error);
                    submitBtn.innerHTML = 'Network Error! Try Again';
                    setTimeout(() => {
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.disabled = false;
                    }, 4000);
                });
        });
    }

    // Scroll Progress Bar
    const progressBar = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const h = document.documentElement;
        const b = document.body;
        const st = 'scrollTop';
        const sh = 'scrollHeight';
        const percent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
        if (progressBar) progressBar.style.width = percent + '%';
    });

    // Dynamic Navigation Background
    window.addEventListener('scroll', () => {
        if (glassNav) {
            if (window.scrollY > 50) {
                glassNav.classList.add('scrolled');
            } else {
                glassNav.classList.remove('scrolled');
            }
        }
    });

    // Cursor Blob Movement (Parallax) - Disable on mobile for performance
    if (window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            const blobs = document.querySelectorAll('.blob-glow, .blob-glow-2, .blob-glow-3');
            const x = e.clientX;
            const y = e.clientY;

            blobs.forEach((blob, index) => {
                const speed = (index + 1) * 0.02;
                const moveX = (x - window.innerWidth / 2) * speed;
                const moveY = (y - window.innerHeight / 2) * speed;
                blob.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    }

    // Scroll Top Button Logic
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

