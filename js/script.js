// Initialize map on pages that have it
document.addEventListener('DOMContentLoaded', function() {
    // Initialize map if map element exists
    const mapElement = document.getElementById('map');
    if (mapElement) {
        initMap();
    }

    // Search functionality
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // Newsletter subscription
    const subscribeBtn = document.getElementById('subscribeBtn');
    const emailInput = document.getElementById('emailInput');
    
    if (subscribeBtn && emailInput) {
        subscribeBtn.addEventListener('click', function() {
            const email = emailInput.value;
            if (validateEmail(email)) {
                alert('Thank you for subscribing! We will keep you updated on our work.');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // Donation amount selection
    const amountBtns = document.querySelectorAll('.amount-btn');
    amountBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            amountBtns.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // Form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            form.reset();
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#donate' && href !== '#contact' && href !== '#contact-form' && href !== '#social') {
                return; // Allow default behavior for these links
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Initialize Leaflet map focused on Bangladesh
function initMap() {
    // Create map centered on Bangladesh
    const map = L.map('map').setView([23.685, 90.3563], 7);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18
    }).addTo(map);

    // Define Bangladesh boundaries (approximate)
    const bangladeshBounds = [
        [26.631945, 88.028336],  // Northwest
        [26.631945, 92.673668],  // Northeast
        [20.743329, 92.673668],  // Southeast
        [20.743329, 88.028336]   // Southwest
    ];

    // Create a polygon for Bangladesh in green
    const bangladeshPolygon = L.polygon(bangladeshBounds, {
        color: '#2c5f2d',
        fillColor: '#97cc04',
        fillOpacity: 0.5,
        weight: 3
    }).addTo(map);

    // Add a marker for the capital
    const dhakaMarker = L.marker([23.8103, 90.4125]).addTo(map);
    dhakaMarker.bindPopup('<b>Dhaka</b><br>Capital of Bangladesh<br>Multiple programs active');

    // Add markers for different divisions
    const locations = [
        { name: 'Chittagong', lat: 22.3569, lng: 91.7832, programs: 'Economic & Education' },
        { name: 'Rajshahi', lat: 24.3745, lng: 88.6042, programs: 'Agricultural Development' },
        { name: 'Khulna', lat: 22.8456, lng: 89.5403, programs: 'Environmental & Health' },
        { name: 'Sylhet', lat: 24.8949, lng: 91.8687, programs: 'Education & Spiritual' },
        { name: 'Barisal', lat: 22.7010, lng: 90.3535, programs: 'Health & Nutrition' },
        { name: 'Rangpur', lat: 25.7439, lng: 89.2752, programs: 'Economic Empowerment' },
        { name: 'Mymensingh', lat: 24.7471, lng: 90.4203, programs: 'Education & Healthcare' }
    ];

    locations.forEach(location => {
        const marker = L.marker([location.lat, location.lng]).addTo(map);
        marker.bindPopup(`<b>${location.name}</b><br>${location.programs}`);
    });

    // Add popup to Bangladesh polygon
    bangladeshPolygon.bindPopup('<b>Bangladesh</b><br>Our primary area of operation<br>Serving 25+ communities');

    // Fit map to Bangladesh bounds
    map.fitBounds(bangladeshBounds);
}

// Search functionality
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim().toLowerCase();
    
    if (query === '') {
        alert('Please enter a search term.');
        return;
    }

    // Simple search implementation - searches through page content
    const pageContent = document.body.innerText.toLowerCase();
    if (pageContent.includes(query)) {
        alert(`Found "${query}" on this page. Use Ctrl+F (Cmd+F on Mac) to highlight all instances.`);
    } else {
        alert(`No results found for "${query}" on this page. Try searching on other pages.`);
    }
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
window.addEventListener('load', function() {
    const animatedElements = document.querySelectorAll('.focus-card, .help-card, .region-card, .stat, .impact-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});