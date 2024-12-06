// Banner image rotation - only initialize if banner exists
const bannerElement = document.querySelector('.banner-image');
if (bannerElement) {
    const bannerImages = [
        'images/family3.jpeg',
        'images/senior17.jpeg',
        'images/senior22.jpeg',
        'images/senior11.jpeg',
        'images/family1.jpeg',
        'images/portrait1.jpeg',
        'images/engagement1.jpeg',
        'images/senior23.jpeg',
        'images/headshot2.jpeg',
        'images/event2.jpeg'
    ];

    let currentImageIndex = 0;

    // Preload images
    const preloadImages = () => {
        bannerImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    };

    // Initialize first image
    const initBanner = () => {
        bannerElement.style.backgroundImage = `url(${bannerImages[0]})`;
        preloadImages();
    };

    // Rotate images
    const rotateImages = () => {
        currentImageIndex = (currentImageIndex + 1) % bannerImages.length;
        bannerElement.classList.remove('fade');
        
        setTimeout(() => {
            bannerElement.style.backgroundImage = `url(${bannerImages[currentImageIndex]})`;
            bannerElement.classList.add('fade');
        }, 1000);
    };

    // Start rotation
    window.addEventListener('load', () => {
        initBanner();
        setInterval(rotateImages, 5000); // Rotate every 5 seconds
    });
}

// Smooth scroll for navigation links - works across all pages
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

// Intersection Observer for scroll animations - works across all pages
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});
