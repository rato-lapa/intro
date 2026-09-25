document.addEventListener('DOMContentLoaded', () => {
    // Options for the Intersection Observer
    const observerOptions = {
        root: document.querySelector('.presentation-container'), // Use our scrolling container
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the slide is visible
    };

    // Callback function to handle the intersection
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            // Find the content box within the intersecting slide
            const contentBox = entry.target.querySelector('.slide-content');
            
            if (entry.isIntersecting) {
                // Slide is in view, add visible class to trigger CSS transition
                contentBox.classList.add('visible');
            } else {
                // Optional: Remove class when out of view so it animates again when scrolled back
                // Comment this out if you only want the animation to happen once.
                contentBox.classList.remove('visible');
            }
        });
    };

    // Create the observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Target all slides to be observed
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
        observer.observe(slide);
        
        // Also trigger an immediate check for the first slide on load 
        // in case the observer threshold doesn't catch it immediately on fast loads
        setTimeout(() => {
            const firstSlide = slides[0];
            if (firstSlide.getBoundingClientRect().top === 0) {
                firstSlide.querySelector('.slide-content').classList.add('visible');
            }
        }, 100);
    });
});