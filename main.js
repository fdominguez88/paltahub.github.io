// main.js
document.addEventListener('DOMContentLoaded', function() {
    // Open modal on any .cta-button click
    document.querySelectorAll('.cta-button, .btn-primary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Only open modal if it exists (don't open if it's just a link elsewhere)
            var modal = document.getElementById('booking-modal');
            if (modal) {
                e.preventDefault();
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal when clicking outside booking widget
    var bookingModal = document.getElementById('booking-modal');
    if (bookingModal) {
        bookingModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = '';
            }
        });

        // Allow closing modal with "Escape" key
        document.addEventListener('keydown', function(e) {
            if (e.key === "Escape" && bookingModal.style.display === 'flex') {
                bookingModal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
});
