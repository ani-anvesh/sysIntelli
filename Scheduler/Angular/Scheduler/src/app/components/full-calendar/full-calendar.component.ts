import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-full-calendar',
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.css'],
})
export class FullCalendarComponent implements OnInit {
  weekdays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  allDays: {
    id: number | string;
    date: number | string;
    month: number | string;
    day: number | string;
    slotsAvailable: number | string;
    inactive: boolean;
    today: boolean;
    dateSelect: boolean;
  }[] = [];
  selectedShift: string = '';
  timeSlotData: any = [];
  monthOptions: string[] = [];
  selectedMonth: any = moment().startOf('month').format('MMMM');
  selectedDay: any = moment().format('dddd');
  selectedDate: any = moment().date();
  slotDuration: number = 15;
  // dateSelect: Boolean = false;

  timeMarkers: string[] = [];

  constructor() {
    this.monthOptions = this.getMonthsInYear(moment().year());
    this.generateTimeMarkers();
    this.generateTimeSlots();
  }

  generateTimeMarkers() {
    const currentTime = moment();
    const morningShiftStart = moment().hour(9).minute(0);
    const afternoonShiftStart = moment().hour(14).minute(0);
    const nightShiftStart = moment().hour(19).minute(0);

    if (currentTime.isBefore(morningShiftStart)) {
      this.setTimeMarkers('9:00', '12:00');
    } else if (currentTime.isBefore(afternoonShiftStart)) {
      this.setTimeMarkers('14:00', '17:00');
    } else if (currentTime.isBefore(nightShiftStart)) {
      this.setTimeMarkers('19:00', '22:00');
    } else {
      const nextDayMorningShiftStart = moment().add(1, 'day').hour(9).minute(0);
      this.setTimeMarkers(nextDayMorningShiftStart.format('HH:mm'), '12:00');
      this.selectedDay = moment().add(1, 'day').format('dddd');
      this.selectedDate = moment().add(1, 'day').date();
    }
  }

  setTimeMarkers(startTime: string, endTime: string) {
    this.timeMarkers = [];
    const startMoment = moment(startTime, 'HH:mm');
    const endMoment = moment(endTime, 'HH:mm');
    while (startMoment.isSameOrBefore(endMoment)) {
      this.timeMarkers.push(startMoment.format('HH:mm'));
      startMoment.add(1, 'hour');
    }
  }

  getTimelineColumnTemplate(): string {
    return `60px repeat(${this.timeMarkers.length - 1}, auto) 20px`;
  }

  getEventColumnTemplate(): string {
    return `repeat(${4 * (this.timeMarkers.length - 1)}, minmax(52px, 1fr))`;
  }

  dateSelectClick(day: any) {
    this.selectedShift = '';
    this.allDays.map((selectedDate) => {
      if (selectedDate.id == day.id) {
        selectedDate.dateSelect = true;
      } else {
        selectedDate.dateSelect = false;
      }
    });
  }

  shiftSelectClick(day: any, shift: any) {
    this.selectedShift = shift;
    const shiftTimings = shift.split(' : ')[0].split(' - ');
    this.selectedDay = day.day;
    this.selectedDate = day.date;
    this.setTimeMarkers(shiftTimings[0], shiftTimings[1]);
    this.generateTimeSlots();
  }

  chunkArray(array: any[], size: number): any[] {
    return _.chunk(array, size);
  }

  generateCalendar(month: number): void {
    this.allDays = [];
    const startDate = moment().month(month).startOf('month').startOf('week');
    const endDate = moment().month(month).endOf('month').endOf('week');
    const currentDate = moment();
    let currentDateIterator = startDate.clone();
    while (currentDateIterator.isSameOrBefore(endDate)) {
      const isInactive =
        !currentDateIterator.isSame(
          moment(this.selectedMonth, 'MMMM'),
          'month'
        ) || currentDateIterator.isBefore(moment(), 'day');
      const isToday = currentDateIterator.isSame(currentDate, 'day');
      this.allDays.push({
        id:
          currentDateIterator.date().toString() +
          currentDateIterator.month().toString() +
          currentDateIterator.year().toString(),
        date: currentDateIterator.date(),
        day: currentDateIterator.format('dddd'),
        month: currentDateIterator.month(),
        slotsAvailable: isToday ? '4 Slots' : 0,
        inactive: isInactive,
        today: isToday,
        dateSelect: false,
      });
      currentDateIterator.add(1, 'day');
    }
  }

  generateTimeSlots() {
    this.timeSlotData = [];
    _.forEach(_.range(this.timeMarkers.length - 1), (i) => {
      let startTime = this.timeMarkers[i];
      let endTime = moment(startTime, 'HH:mm')
        .add(this.slotDuration, 'minutes')
        .format('HH:mm');
      while (
        moment(endTime, 'HH:mm').isSameOrBefore(
          moment(this.timeMarkers[i + 1], 'HH:mm')
        )
      ) {
        this.timeSlotData.push({ startTime, endTime });
        startTime = endTime;
        endTime = moment(startTime, 'HH:mm')
          .add(this.slotDuration, 'minutes')
          .format('HH:mm');
      }
    });
  }

  getMonthsInYear(year: number) {
    const months = [];
    for (let month = 0; month < 12; month++) {
      months.push(moment().year(year).month(month).format('MMMM'));
    }
    return months;
  }

  monthSelected(month: string) {
    this.selectedMonth = month;
    this.generateCalendar(moment(month, 'MMMM').month());
  }

  ngOnInit(): void {
    this.generateCalendar(moment().month());
  }
}
