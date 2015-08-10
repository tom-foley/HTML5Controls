(function () {
    'use strict';
    window.Calendar = function (params) {
        var cal = this;

        cal.days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        cal.months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

        cal.day;
        cal.date;
        cal.month;
        cal.year;

        cal.firstOfMonth;
        cal.lastOfMonth;
        cal.startDate;
        cal.endDate;
        cal.activeDate;

        cal.addArrowListeners = function (arrows) {
            for (var i = 0; i < arrows.length; i++) {
                arrows[i].addEventListener('click', function () {
                    cal.setNewCalendar(parseDate(this.getAttribute('data-new-month')), this.parentNode.parentNode);
                    this.disabled = true;
                }, false);
            }
        }

        cal.setNewCalendar = function (newDate, calendarContainer) {
            this.day = newDate.getUTCDay();
            this.date = newDate.getUTCDate();
            this.month = newDate.getUTCMonth();
            this.year = newDate.getUTCFullYear();

            var prevCal = getPreviousCal(this.year, this.month);
            var nextCal = getNextCal(this.year, this.month);

            var prevMonthDays = new Date(this.year, this.month, 0).getUTCDate();
            this.firstOfMonth = new Date(this.year, this.month, 1);
            this.lastOfMonth = new Date(this.year, this.month + 1, 0);

            if (this.firstOfMonth.getUTCDay() === 0) {
                this.startDate = this.firstOfMonth;
            } else {
                var lastOfPrevMonth = new Date(this.year, this.month, 0);
                this.startDate = new Date(prevCal.Year, prevCal.Month,
                    lastOfPrevMonth.getUTCDate() - lastOfPrevMonth.getUTCDay());
            }

            if (this.lastOfMonth.getUTCDay() === 6) {
                this.endDate = this.lastOfMonth;
            } else {
                this.endDate = new Date(nextCal.Year, nextCal.Month,
                    (7 - this.lastOfMonth.getUTCDay()) - 1);
            }

            while (calendarContainer.firstChild) {
                calendarContainer.removeChild(calendarContainer.firstChild);
            }

            var calendarHeader = document.createElement('div');
            calendarHeader.classList.add('calendar-header');
            cal.createCalendarHeader(calendarHeader);
            calendarContainer.appendChild(calendarHeader);


            var calendarDays = document.createElement('table');
            calendarDays.classList.add('calendar-days');
            cal.createCalendarDays(calendarDays);
            calendarContainer.appendChild(calendarDays);
        };

        cal.createCalendarHeader = function (calendarEl) {
            var leftButton = document.createElement('button');
            leftButton.classList.add('arrow');
            leftButton.classList.add('arrow-left');
            leftButton.setAttribute('data-new-month', getShortDateString(addDays(cal.firstOfMonth, -1)));

            var leftSpan = document.createElement('span');
            leftSpan.classList.add('v-align');
            leftButton.appendChild(leftSpan);
            calendarEl.appendChild(leftButton);

            var header = document.createElement('div');
            header.classList.add('header');
            var headerSpan = document.createElement('span');
            headerSpan.classList.add('v-align');
            headerSpan.innerText = cal.months[this.month] + ' ' + this.year;
            header.appendChild(headerSpan);
            calendarEl.appendChild(header);

            var rightButton = document.createElement('button');
            rightButton.classList.add('arrow');
            rightButton.classList.add('arrow-right');
            rightButton.setAttribute('data-new-month', getShortDateString(addDays(cal.lastOfMonth, 1)));

            var rightSpan = document.createElement('span');
            rightSpan.classList.add('v-align');
            rightButton.appendChild(rightSpan);
            calendarEl.appendChild(rightButton);

            cal.addArrowListeners([ leftButton, rightButton ]);
        };

        cal.createCalendarDays = function (calendarEl) {
            var headerRowEl = document.createElement('tr'), headerDay;
            for (var i = 0; i < cal.days; i++) {
                headerDay = document.createElement('th');
                headerDay.innerText = cal.days[i];
                headerRowEl.appendChild(headerDay);
            }
            calendarEl.appendChild(headerRowEl);

            var weekDay, listPos = 0, weekRowEl, weekDayEl;
            while (this.startDate < this.endDate) {
                weekDay = 0;
                weekRowEl = document.createElement('tr');
                while (weekDay < 7) {
                    weekDayEl = document.createElement('td');
                    weekDayEl.innerText = this.startDate.getUTCDate();
                    weekDay++;
                    this.startDate = addDays(this.startDate, 1);
                    weekRowEl.appendChild(weekDayEl);
                }
                calendarEl.appendChild(weekRowEl);
            }
        };

        cal.init = function () {
            this.activeDate = new Date();

            var calendars = document.getElementsByClassName('calendar');
            for (var i = 0; i < calendars.length; i++) {
                this.setNewCalendar(this.activeDate, calendars[i]);
            }
        };

        cal.init();

        function addDays(startDate, numberOfDays) {
            return new Date(startDate.getFullYear(), startDate.getMonth(),
                startDate.getDate() + numberOfDays, startDate.getHours(),
                startDate.getMinutes());
        };

        function getShortDateString(date) {
            return date.getUTCMonth() + '/' + date.getUTCDate() + '/' + date.getUTCFullYear();
        }

        function parseDate(dateString) {
            var day, month, year;
            var first = dateString.indexOf('/');
            month = parseInt(dateString.substr(0, first));
            dateString = dateString.substr(first + 1);
            var second = dateString.indexOf('/');
            day = parseInt(dateString.substr(0, second));
            year = parseInt(dateString.substr(second + 1));
            return new Date(year, month, day);
        }

        function getPreviousCal(currentYear, currentMonth) {
            if (currentMonth > 0) {
                return {
                    Month: currentMonth - 1,
                    Year: currentYear
                };
            } else {
                return {
                    Month: cal.months.length - 1,
                    Year: currentYear - 1
                };
            }
        }

        function getNextCal(currentYear, currentMonth) {
            if (currentMonth < cal.months.length - 1) {
                return {
                    Month: currentMonth + 1,
                    Year: currentYear
                };
            } else {
                return {
                    Month: 0,
                    Year: currentYear + 1
                };
            }
        }
    }
})();

var calendar = new Calendar();