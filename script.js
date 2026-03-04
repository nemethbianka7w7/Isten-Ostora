// Navigation functionality
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get the section ID from data attribute
        const sectionId = this.getAttribute('data-section');
        
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show the selected section
        const selectedSection = document.getElementById(sectionId);
        if (selectedSection) {
            selectedSection.classList.add('active');
        }
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.classList.remove('active');
        });
        this.classList.add('active');
        
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Image expansion functionality
function expandImage(event) {
    const imageElement = event.currentTarget;
    const imagePlaceholder = imageElement.querySelector('.image-placeholder');
    const imageLabel = imageElement.querySelector('.image-label').textContent;
    
    // Get the background image or create a data URL
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    // Create a canvas to capture the placeholder styling
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    
    // Get the background color/gradient
    const style = window.getComputedStyle(imagePlaceholder);
    const bgColor = style.backgroundColor;
    
    // Create a gradient-like effect based on the placeholder class
    const classList = imagePlaceholder.className;
    
    if (classList.includes('attila-1')) {
        // Brown gradient
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#8B4513');
        gradient.addColorStop(1, '#D2691E');
        ctx.fillStyle = gradient;
    } else if (classList.includes('hunnic-map')) {
        // Green gradient
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#4a7c59');
        gradient.addColorStop(1, '#6b9d7a');
        ctx.fillStyle = gradient;
    } else if (classList.includes('attila-battle')) {
        // Red gradient
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#8B0000');
        gradient.addColorStop(1, '#D2691E');
        ctx.fillStyle = gradient;
    } else if (classList.includes('attila-legacy')) {
        // Dark gradient
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#2c3e50');
        gradient.addColorStop(1, '#34495e');
        ctx.fillStyle = gradient;
    } else {
        ctx.fillStyle = bgColor;
    }
    
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add text
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 24px Arial';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    
    // Wrap text
    const words = imageLabel.split(' ');
    const lines = [];
    let currentLine = '';
    
    for (let word of words) {
        if ((currentLine + word).length > 20) {
            if (currentLine) lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine += (currentLine ? ' ' : '') + word;
        }
    }
    if (currentLine) lines.push(currentLine);
    
    const lineHeight = 40;
    const startY = (canvas.height - (lines.length - 1) * lineHeight) / 2;
    
    lines.forEach((line, index) => {
        ctx.fillText(line, canvas.width / 2, startY + index * lineHeight);
    });
    
    // Convert canvas to image
    const enlargedImageData = canvas.toDataURL();
    modalImage.src = enlargedImageData;
    
    // Show modal
    modal.classList.add('show');
}

// Close image modal
function closeImageModal(event) {
    const modal = document.getElementById('imageModal');
    
    // Close if clicking on the modal background or the close button
    if (!event || event.target === modal || event.target.classList.contains('close')) {
        modal.classList.remove('show');
    }
}

// Close modal when clicking outside the image
document.addEventListener('click', function(event) {
    const modal = document.getElementById('imageModal');
    const modalContent = modal.querySelector('.modal-content');
    
    if (event.target === modal) {
        modal.classList.remove('show');
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('imageModal');
        modal.classList.remove('show');
    }
});

// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Add some interactivity to achievement cards
document.querySelectorAll('.achievement-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#e8e8e8';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#f5f5f5';
    });
});

// Initialize - show the first section by default
window.addEventListener('load', function() {
    // Make sure the overview section is shown
    const overviewLink = document.querySelector('[data-section="overview"]');
    if (overviewLink) {
        overviewLink.click();
    }
});

// Add animation on scroll for elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.achievement-card, .timeline-item, .text-image-container').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});
