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

        function getPreviousCal(currentYear, currentMonth) {
            if (currentMonth > 0) {
                return {
                    Month:currentMonth - 1,
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

        cal.setNewCalendar = function (newDate) {
            this.day = newDate.getUTCDay();
            this.date = newDate.getUTCDate();
            this.month = newDate.getUTCMonth();
            this.year = newDate.getUTCFullYear();

            var prevCal = getPreviousCal(this.year, this.month);
            var nextCal = getNextCal(this.year, this.month);

            var prevMonthDays = new Date(this.year, this.month, 0).getDate();
            console.log("Prev Month Days: " + prevMonthDays);
            this.firstOfMonth = new Date(this.year, this.month, 1);
            this.lastOfMonth = new Date(this.year, this.month + 1, 0);

            if (this.firstOfMonth.getDay() === 0) {
                this.startDate = this.firstOfMonth;
            } else {
                this.startDate = new Date(prevCal.Year, prevCal.Month, new Date(this.year, this.month, 0).getUTCDate() - this.day);
            }

            if (this.lastOfMonth.getDay() === 6) {
                this.endDate = this.lastOfMonth;
            } else {
                this.endDate = new Date(nextCal.Year, nextCal.Month, (7 - this.lastOfMonth.getUTCDay()) - 1);
            }


        };

        cal.createHeader = function () {

        };

        cal.createCalendar = function () {

        };

        cal.init = function () {
            this.activeDate = new Date();
            this.setNewCalendar(new Date());

            console.log("Day: " + this.day);
            console.log("Date: " + this.date);
            console.log("Month: " + this.month);
            console.log("Year: " + this.year);
            console.log("\n");
            console.log("First Of Month: " + this.firstOfMonth);
            console.log("Last Of Month: " + this.lastOfMonth);
            console.log("\n");
            console.log("Start Date: " + this.startDate);
            console.log("End Date: " + this.endDate);
            console.log("\n");
            console.log("Active Date: " + this.activeDate);
        };

        cal.init();
    }
})();

var calendar = new Calendar();