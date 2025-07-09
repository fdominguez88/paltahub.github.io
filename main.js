document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('booking-modal');
    const ctaButtons = document.querySelectorAll('.cta-button');
    const closeButton = document.querySelector('.close-button');

    const formView = document.getElementById('form-view');
    const calendarView = document.getElementById('calendar-view');
    const confirmationView = document.getElementById('confirmation-view');
    
    const contactForm = document.getElementById('contact-form');
    const backButton = document.querySelector('.back-button');
    const confirmBookingBtn = document.getElementById('confirm-booking-btn');

    let currentView = formView;
    let selectedDate = null;
    let selectedTime = null;

    function openModal() {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
        // Reset to the first view
        switchView(formView);
        contactForm.reset();
        selectedDate = null;
        selectedTime = null;
        confirmBookingBtn.disabled = true;
    }

    function switchView(newView) {
        currentView.classList.remove('active-view');
        newView.classList.add('active-view');
        currentView = newView;
    }

    ctaButtons.forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    }));

    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        document.getElementById('userEmail').textContent = document.getElementById('email').value;
        switchView(calendarView);
        renderCalendar();
    });

    backButton.addEventListener('click', () => {
        switchView(formView);
    });

    confirmBookingBtn.addEventListener('click', () => {
        document.getElementById('selected-date-text').textContent = selectedDate.toDateString();
        document.getElementById('selected-time-text').textContent = selectedTime;
        switchView(confirmationView);
    });

    // --- Calendar Logic ---
    const monthYearEl = document.getElementById('month-year');
    const calendarGrid = document.getElementById('calendar-grid');
    const timeSlotsGrid = document.getElementById('time-slots');
    
    let currentDate = new Date();

    function renderCalendar() {
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        
        monthYearEl.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;
        
        calendarGrid.innerHTML = '';
        
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Add day labels
        ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
            const dayEl = document.createElement('div');
            dayEl.textContent = day;
            dayEl.style.fontWeight = 'bold';
            calendarGrid.appendChild(dayEl);
        });

        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarGrid.appendChild(document.createElement('div'));
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dayEl = document.createElement('div');
            dayEl.textContent = i;
            dayEl.classList.add('calendar-day');
            
            const today = new Date();
            const date = new Date(year, month, i);

            if (date < today.setHours(0,0,0,0)) {
                 dayEl.classList.add('disabled');
            } else {
                dayEl.addEventListener('click', () => {
                    document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
                    dayEl.classList.add('selected');
                    selectedDate = date;
                    renderTimeSlots();
                    confirmBookingBtn.disabled = true; // Reset time selection
                });
            }
            calendarGrid.appendChild(dayEl);
        }
    }

    function renderTimeSlots() {
        timeSlotsGrid.innerHTML = '';
        const times = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];
        times.forEach(time => {
            const timeEl = document.createElement('div');
            timeEl.textContent = time;
            timeEl.classList.add('time-slot');
            timeEl.addEventListener('click', () => {
                document.querySelectorAll('.time-slot').forEach(t => t.classList.remove('selected'));
                timeEl.classList.add('selected');
                selectedTime = time;
                confirmBookingBtn.disabled = false;
            });
            timeSlotsGrid.appendChild(timeEl);
        });
    }

    document.getElementById('prev-month').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    document.getElementById('next-month').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
});
