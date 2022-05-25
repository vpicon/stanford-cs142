'use strict';

class DatePicker {
    constructor(id, callback) {
        this.id = id;
        this.element = document.getElementById(id);
        this.callback = callback;
    }


    render(date) {
        if (!this.fixedDate) this.fixedDate = date;
        this.currentDate = date;

        let calendar = this.calendarElement(date);
        this.element.append(calendar);
    }


    calendarElement(date) {
        let calendar = document.createElement("div");
        calendar.classList.add("calendar");
       
        // Calendar element divided in header and table
        calendar.append(this.calendarHeader(date));
        calendar.append(this.calendarTable(date));

        return calendar; 
    } 

    calendarHeader(date) {
        let header = document.createElement("div");
        header.classList.add("calendarHeader");

        header.append(this.calendarHeaderButton("left"));
        header.append(this.calendarHeaderMonth(date));
        header.append(this.calendarHeaderButton("right"));

        return header;
    }

    calendarTable(date) {
        let table = document.createElement("table");
        table.classList.add("calendarDaysTable");

        table.append(this.weekdaysTableHead());
        table.append(this.weekdaysTableBody(date));

        return table;
    }

    calendarHeaderMonth(date) {
        let headerMonth = document.createElement("span");
        headerMonth.classList.add("calendarHeaderMonth");
    
        const monthNames = ["January", "February", "March", "April", 
                            "May", "June", "July", "August", "September", 
                            "October", "November", "December"];

        let headerMonthStr = monthNames[date.getMonth()] + " " + date.getFullYear();
        headerMonth.append(headerMonthStr);

        return headerMonth;
    }

    calendarHeaderButton(buttonType) {
        let headerButton = document.createElement("button");
        headerButton.datePicker = this;
        headerButton.classList.add("calendarHeaderButton");

        if (buttonType == "right") {
            headerButton.append('>');
            headerButton.addEventListener("click", function() {this.datePicker.calendarChangeMonth("next");});
        } else {
            headerButton.append('<');
            headerButton.addEventListener("click", function() {this.datePicker.calendarChangeMonth("previous");});
        }

        return headerButton;
    }

    weekdaysTableHead() {
        let row = document.createElement("tr");

        const weekdayNames = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
        for (let day of weekdayNames) {
            let dayElement = document.createElement("th");
            dayElement.classList.add("calendarWeekdayName");

            dayElement.append(day);
            row.append(dayElement);
        }

        let head = document.createElement("thead");
        head.append(row);
        head.classList.add("weekdaysHead");
        return head;
    }
    
    weekdaysTableBody(date) {
        let body = document.createElement("tbody");

        let row = document.createElement("tr");
        row.classList.add("weekdaysRow");

        // Add days before first day of month
        let beforeMonthDays = this.offMonthDays(date, "before");
        for (let day of beforeMonthDays)
            row.append(day);

        // Iterate over month days
        let indexDate = new Date(date.getFullYear(), date.getMonth());
        let completedMonth = false;

        while (!completedMonth) {
            // Add current day to row
            let dayType = ((indexDate.getDate() == this.fixedDate.getDate())
                                && (indexDate.getMonth() == this.fixedDate.getMonth()))
                            ? "currentMonthDay" 
                            : "onMonthDay";
            let dayElement = this.dayElement(indexDate.getDate(), dayType);
            row.append(dayElement);

            // Check if week was completed to start new row
            if (indexDate.getDay() == 0) { 
                body.append(row);
                row = document.createElement("tr");
                row.classList.add("weekdaysRow");
            }

            // Increase index date 
            indexDate.setDate(indexDate.getDate() + 1);
            if (indexDate.getMonth() != date.getMonth())
                completedMonth = true;
        }

        // Add days after last day of the month
        let afterMonthDays = this.offMonthDays(date, "after");
        for (let day of afterMonthDays)
            row.append(day);
        if (row.hasChildNodes())
            body.append(row);

        return body;
    }

    offMonthDays(date, when) {
        let days = []; 
        let d = new Date(date);
        let numOffDays = 0;

        if (when == "before") {
            // Last day of previous month
            d.setDate(0); 
            numOffDays = ((d.getDay() + 6) % 7) + 1;

            d.setDate(d.getDate() - numOffDays + 1); // Offset by numOffDays
        } else {
            // First day of next month
            d.setMonth(d.getMonth() + 1); d.setDate(1);

            let dayOfWeek = ((d.getDay() + 6) % 7); 
            numOffDays = 7 - dayOfWeek;
        }

        while (numOffDays > 0) {
            let dayElement = this.dayElement(d.getDate(), "offMonthDay");
            days.push(dayElement);

            d.setDate(d.getDate() + 1);
            numOffDays--;
        }

        return days;
    }

    dayElement(day, dayType) {
        let tableDataElement = document.createElement("td");
        let contentElement = document.createElement("div");
        contentElement.classList.add("calendarDay");

        if (dayType == "offMonthDay")
            contentElement.classList.add("calendarOffMonthDay");
        else if (dayType == "onMonthDay")
            contentElement.classList.add("calendarOnMonthDay");
        else if (dayType == "currentMonthDay")
            contentElement.classList.add("calendarCurrentMonthDay");

        contentElement.append(day);
        tableDataElement.append(contentElement);

        return tableDataElement;
    }

    calendarChangeMonth(direction) {
        console.log("Changed month to " + direction);
        let inc = ((direction == "next") ? +1 : -1);
        let movedDate = new Date(this.currentDate);
        movedDate.setMonth(movedDate.getMonth() + inc);
        
        // Check we back on fixedDate month
        if (movedDate.getFullYear() == this.fixedDate.getFullYear() 
            && movedDate.getMonth() == this.fixedDate.getMonth())
            movedDate = this.fixedDate;

        this.currentDate = movedDate;

        // Change Header for new month
        this.element.firstChild.firstChild.childNodes[1].replaceWith(
            this.calendarHeaderMonth(this.currentDate)
        );  
        // Change Table for new month
        this.element.firstChild.lastChild.replaceWith(
            this.calendarTable(this.currentDate)
        );  
    }
}
