// Banner image rotation - only initialize if banner exists
const bannerElement = document.querySelector('.banner-image');
if (bannerElement) {
    const bannerImages = [
        'images/portfolio1.jpg',
        'images/portfolio2.jpg',
        'images/portfolio3.jpg',
        'images/portfolio4.jpg',
        'images/portfolio5.jpg',
        'images/portfolio6.jpg',
        'images/portfolio7.jpg',
        'images/portfolio8.jpg',
        'images/portfolio9.jpg',
        'images/portfolio10.jpg'
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
