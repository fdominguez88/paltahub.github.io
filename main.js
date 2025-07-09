// main.js
document.addEventListener('DOMContentLoaded', function() {
    // Modal open/close for all CTAs
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
            // Optionally reset booking widget on close:
            setTimeout(() => { window.location.reload(); }, 250);
        }
    });

    // --- Booking widget logic ---
    const calendarContainer = document.getElementById('calendar-container');
    const finalMessageContainer = document.getElementById('final-message-container');
    const calendarGrid = document.getElementById('calendar-grid');
    const monthYearEl = document.getElementById('month-year');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const timeSlotsContainer = document.getElementById('time-slots-container');
    const timeSlotsGrid = document.getElementById('time-slots');
    const infoForm = document.getElementById('simple-info-form');
    const userNameEl = document.getElementById('userName');
    const userEmailEl = document.getElementById('userEmail');

    if (!calendarContainer) return; // Widget not present

    let currentDate = new Date();
    let selectedDate = null;
    let selectedTime = null;

    function renderCalendar() {
        calendarGrid.innerHTML = '';
        const month = currentDate.getMonth();
        const year = currentDate.getFullYear();
        monthYearEl.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        daysOfWeek.forEach(day => {
            const dayEl = document.createElement('div');
            dayEl.className = 'font-bold text-gray-400 text-xs mb-2';
            dayEl.textContent = day;
            calendarGrid.appendChild(dayEl);
        });
        for (let i = 0; i < firstDayOfMonth; i++) {
            const empty = document.createElement('div');
            empty.innerHTML = '&nbsp;';
            calendarGrid.appendChild(empty);
        }
        for (let day = 1; day <= daysInMonth; day++) {
            const dayEl = document.createElement('button');
            dayEl.textContent = day;
            dayEl.type = "button";
            dayEl.className = 'calendar-day px-2 py-1 rounded-full font-medium transition focus:outline-none';
            const today = new Date();
            const cellDate = new Date(year, month, day);
            if (cellDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
                dayEl.classList.add('text-gray-300', 'cursor-not-allowed', 'disabled');
                dayEl.disabled = true;
            } else {
                dayEl.classList.add('hover:bg-[#E4F223]', 'hover:text-[#00707F]', 'text-gray-700', 'cursor-pointer');
                dayEl.addEventListener('click', () => selectDate(day, month, year));
            }
            if (selectedDate && day === selectedDate.getDate() && month === selectedDate.getMonth() && year === selectedDate.getFullYear()) {
                dayEl.classList.add('bg-[#00707F]', 'text-white', 'shadow', 'font-bold');
            }
            calendarGrid.appendChild(dayEl);
        }
    }

    function renderTimeSlots() {
        timeSlotsGrid.innerHTML = '';
        const availableTimes = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];
        availableTimes.forEach(time => {
            const timeSlotEl = document.createElement('button');
            timeSlotEl.textContent = time;
            timeSlotEl.type = "button";
            timeSlotEl.className = 'time-slot px-3 py-1 rounded-lg bg-gray-100 text-gray-800 font-medium border border-gray-200 hover:bg-[#E4F223] hover:text-[#00707F] transition';
            timeSlotEl.addEventListener('click', () => selectTime(time));
            timeSlotsGrid.appendChild(timeSlotEl);
        });
        timeSlotsContainer.style.display = 'block';
    }

    function selectDate(day, month, year) {
        selectedDate = new Date(year, month, day);
        selectedTime = null;
        renderCalendar();
        renderTimeSlots();
        infoForm.classList.add('hidden');
    }

    function selectTime(time) {
        selectedTime = time;
        document.querySelectorAll('.time-slot').forEach(slot => {
            slot.classList.remove('bg-[#00707F]', 'text-white');
            if (slot.textContent === time) slot.classList.add('bg-[#00707F]', 'text-white');
        });
        infoForm.classList.remove('hidden');
        infoForm.scrollIntoView({behavior: 'smooth'});
    }

    infoForm && infoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        userNameEl.textContent = name;
        userEmailEl.textContent = email;
        calendarContainer.classList.add('hidden-view');
        calendarContainer.style.display = "none";
        finalMessageContainer.classList.remove('hidden-view');
        finalMessageContainer.classList.add('visible-view');
        finalMessageContainer.style.display = "block";
    });

    prevMonthBtn && prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
    nextMonthBtn && nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
});
