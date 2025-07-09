// main.js

document.addEventListener('DOMContentLoaded', function() {
    // Modal open/close for CTA buttons
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

    // Booking widget logic
    // DOM Elements
    const formContainer = document.getElementById('form-container');
    const calendarContainer = document.getElementById('calendar-container');
    const confirmationContainer = document.getElementById('confirmation-container');
    const finalMessageContainer = document.getElementById('final-message-container');

    if (!formContainer) return; // If widget is not present, skip

    const contactForm = document.getElementById('contact-form');
    const calendarGrid = document.getElementById('calendar-grid');
    const monthYearEl = document.getElementById('month-year');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const timeSlotsContainer = document.getElementById('time-slots-container');
    const timeSlotsGrid = document.getElementById('time-slots');
    const selectedDateText = document.getElementById('selected-date-text');
    const selectedTimeText = document.getElementById('selected-time-text');
    const confirmBookingBtn = document.getElementById('confirm-booking-btn');
    const backToCalendarBtn = document.getElementById('back-to-calendar-btn');
    const userNameEl = document.getElementById('userName');
    const userEmailEl = document.getElementById('userEmail');

    let currentDate = new Date();
    let selectedDate = null;
    let selectedTime = null;
    let userData = {};

    function switchView(toShow, toHide) {
        toHide.classList.remove('visible-view');
        toHide.classList.add('hidden-view');
        setTimeout(() => {
            toHide.style.display = 'none';
            toShow.style.display = 'block';
            setTimeout(() => {
                toShow.classList.remove('hidden-view');
                toShow.classList.add('visible-view');
            }, 20);
        }, 300);
    }

    const renderCalendar = () => {
        calendarGrid.innerHTML = '';
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        monthYearEl.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Day labels
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        daysOfWeek.forEach(day => {
            const dayEl = document.createElement('div');
            dayEl.className = 'font-semibold text-gray-600 text-xs';
            dayEl.textContent = day;
            calendarGrid.appendChild(dayEl);
        });

        // Empty cells
        for (let i = 0; i < firstDayOfMonth; i++) {
            calendarGrid.appendChild(document.createElement('div'));
        }

        // Days
        for (let day = 1; day <= daysInMonth; day++) {
            const dayEl = document.createElement('div');
            dayEl.textContent = day;
            dayEl.className = 'calendar-day cursor-pointer p-2 text-center rounded-full';
            const today = new Date();
            const cellDate = new Date(year, month, day);
            if (cellDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
                dayEl.classList.add('text-gray-400', 'cursor-not-allowed', 'disabled');
            } else {
                dayEl.addEventListener('click', () => selectDate(day, month, year));
            }
            if (selectedDate && day === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear()) {
                dayEl.classList.add('selected');
            }
            calendarGrid.appendChild(dayEl);
        }
    };

    const renderTimeSlots = () => {
        timeSlotsGrid.innerHTML = '';
        const availableTimes = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];
        availableTimes.forEach(time => {
            const timeSlotEl = document.createElement('button');
            timeSlotEl.textContent = time;
            timeSlotEl.className = 'time-slot p-2 border rounded-lg text-sm hover:bg-gray-200 transition';
            timeSlotEl.addEventListener('click', () => selectTime(time));
            timeSlotsGrid.appendChild(timeSlotEl);
        });
        timeSlotsContainer.style.display = 'block';
    };

    const selectDate = (day, month, year) => {
        selectedDate = new Date(year, month, day);
        selectedTime = null;
        renderCalendar();
        renderTimeSlots();
    };

    const selectTime = (time) => {
        selectedTime = time;
        document.querySelectorAll('.time-slot').forEach(slot => {
            slot.classList.remove('selected');
            if (slot.textContent === time) slot.classList.add('selected');
        });
        selectedDateText.textContent = selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        selectedTimeText.textContent = selectedTime;
        switchView(confirmationContainer, calendarContainer);
    };

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        userData.name = formData.get('name');
        userData.email = formData.get('email');
        userNameEl.textContent = userData.name;
        userEmailEl.textContent = userData.email;
        switchView(calendarContainer, formContainer);
    });

    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    backToCalendarBtn.addEventListener('click', () => {
        switchView(calendarContainer, confirmationContainer);
    });

    confirmBookingBtn.addEventListener('click', () => {
        // Normally send data to server here
        switchView(finalMessageContainer, confirmationContainer);
    });

    // Initial Render
    renderCalendar();
});
