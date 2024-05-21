window.addEventListener('scroll', function() {
    const parallaxElements = document.querySelectorAll('.parallax');
    parallaxElements.forEach(function(element) {
        let scrolled = window.scrollY;
        element.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
    });
});