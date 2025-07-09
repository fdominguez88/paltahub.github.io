// main.js
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.cta-button').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('booking-modal').style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    document.getElementById('booking-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});
