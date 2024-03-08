import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as _ from 'lodash';
import * as moment from 'moment';
import { ConfirmationService } from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';
import { TokenService } from 'src/app/services/token.service';
import { DOMAINS } from 'utils/domains';

@Component({
  selector: 'app-full-calendar',
  templateUrl: './full-calendar.component.html',
  styleUrls: ['./full-calendar.component.css'],
})
export class FullCalendarComponent implements OnInit {
  weekdays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  allDays: any = [];
  selectedShift: any = {};
  timeSlotData: any = [];
  monthOptions: string[] = [];
  doctorOptions: any = [];
  selectedDoctor: any = '';
  selectedMonth: any = moment().startOf('month').format('MMMM');
  selectedDay: any = moment().format('dddd');
  selectedDate: any = moment().date();
  slotDuration: number = 15;
  slotTimings: any = [
    { slotName: 'slot1', startTime: '09:00', endTime: '09:15' },
    { slotName: 'slot2', startTime: '09:15', endTime: '09:30' },
    { slotName: 'slot3', startTime: '09:30', endTime: '09:45' },
    { slotName: 'slot4', startTime: '09:45', endTime: '10:00' },
    { slotName: 'slot5', startTime: '10:00', endTime: '10:15' },
    { slotName: 'slot6', startTime: '10:15', endTime: '10:30' },
    { slotName: 'slot7', startTime: '10:30', endTime: '10:45' },
    { slotName: 'slot8', startTime: '10:45', endTime: '11:00' },
    { slotName: 'slot9', startTime: '11:00', endTime: '11:15' },
    { slotName: 'slot10', startTime: '11:15', endTime: '11:30' },
    { slotName: 'slot11', startTime: '11:30', endTime: '11:45' },
    { slotName: 'slot12', startTime: '11:45', endTime: '12:00' },
    { slotName: 'slot13', startTime: '14:00', endTime: '14:15' },
    { slotName: 'slot14', startTime: '14:15', endTime: '14:30' },
    { slotName: 'slot15', startTime: '14:30', endTime: '14:45' },
    { slotName: 'slot16', startTime: '14:45', endTime: '15:00' },
    { slotName: 'slot17', startTime: '15:00', endTime: '15:15' },
    { slotName: 'slot18', startTime: '15:15', endTime: '15:30' },
    { slotName: 'slot19', startTime: '15:30', endTime: '15:45' },
    { slotName: 'slot20', startTime: '15:45', endTime: '16:00' },
    { slotName: 'slot21', startTime: '16:00', endTime: '16:15' },
    { slotName: 'slot22', startTime: '16:15', endTime: '16:30' },
    { slotName: 'slot23', startTime: '16:30', endTime: '16:45' },
    { slotName: 'slot24', startTime: '16:45', endTime: '17:00' },
    { slotName: 'slot25', startTime: '19:00', endTime: '19:15' },
    { slotName: 'slot26', startTime: '19:15', endTime: '19:30' },
    { slotName: 'slot27', startTime: '19:30', endTime: '19:45' },
    { slotName: 'slot28', startTime: '19:45', endTime: '20:00' },
    { slotName: 'slot29', startTime: '20:00', endTime: '20:15' },
    { slotName: 'slot30', startTime: '20:15', endTime: '20:30' },
    { slotName: 'slot31', startTime: '20:30', endTime: '20:45' },
    { slotName: 'slot32', startTime: '20:45', endTime: '21:00' },
    { slotName: 'slot33', startTime: '21:00', endTime: '21:15' },
    { slotName: 'slot34', startTime: '21:15', endTime: '21:30' },
    { slotName: 'slot35', startTime: '21:30', endTime: '21:45' },
    { slotName: 'slot36', startTime: '21:45', endTime: '22:00' },
  ];
  // dateSelect: Boolean = false;

  timeMarkers: string[] = [];

  constructor(
    private tokenService: TokenService,
    private confirmationService: ConfirmationService,
    private apiService: ApiService
  ) {
    this.monthOptions = this.getMonthsInYear(moment().year());
    this.generateTimeMarkers();
  }

  generateTimeMarkers() {
    let currentTime = moment();
    const shiftStartTimes = [
      { startTime: '09:00', endTime: '12:00' },
      { startTime: '14:00', endTime: '17:00' },
      { startTime: '19:00', endTime: '22:00' },
    ];
    let currentShift = _.find(shiftStartTimes, (shift) =>
      currentTime.isBefore(moment(shift.startTime, 'HH:mm'))
    );
    if (!currentShift) {
      currentShift = shiftStartTimes[0];
    }
    this.setTimeMarkers(currentShift);
    this.shiftSelectClick(
      { date: currentTime.date(), day: moment().format('dddd') },
      { startTime: '09:00', endTime: '12:00', date: currentTime.date() }
    );
  }

  setTimeMarkers(currentShit: any) {
    const { startTime, endTime } = currentShit;
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
    this.allDays.map((selectedDate: any) => {
      if (selectedDate.id == day.id) {
        selectedDate.dateSelect = true;
      } else {
        selectedDate.dateSelect = false;
      }
    });
  }

  shiftSelectClick(day: any, shift: any) {
    this.timeSlotData = [];
    this.selectedShift = shift;
    this.selectedDay = day.day;
    this.selectedDate = day.date;
    const { startTime, endTime } = shift;
    this.setTimeMarkers({ startTime, endTime });
    this.timeSlotData = _.filter(
      this.slotTimings,
      (slot) => slot.startTime >= startTime && slot.endTime <= endTime
    );
    this.totalAvailableSlots(shift);
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
        id: currentDateIterator.format('YYYY-MM-DD'),
        date: currentDateIterator.date(),
        day: currentDateIterator.format('dddd'),
        month: currentDateIterator.month(),
        inactive: isInactive,
        today: isToday,
        dateSelect: false,
      });
      currentDateIterator.add(1, 'day');
    }
    console.log(this.allDays);
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

  slotConformation(slot: any) {
    this.confirmationService.confirm({
      message:
        'Are you sure you want to book ' +
        slot.startTime +
        ' to ' +
        slot.endTime +
        ' slot?',
      header: 'Confimation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptLabel: 'Yes',
      rejectLabel: 'No',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {},
      reject: () => {},
      key: 'slotConfirmDialougeDialog',
    });
  }

  async fetchDoctors() {
    await this.apiService
      .getAllData(DOMAINS.HOME + 'fetchDoctors/all')
      .then((res: any) => {
        if (res) {
          console.log(res);
          this.doctorOptions = res;
          this.selectedDoctor = res[0].name;
        }
      })
      .catch((error) => {
        return console.error('Error fetching receipt names:', error);
      });
  }

  async totalAvailableShifts() {
    const currentDate = moment();
    let startDate = currentDate.format('YYYY-MM-DD');
    let endDate = currentDate.endOf('month').format('YYYY-MM-DD');

    await this.apiService
      .getAllData(
        DOMAINS.HOME +
          'fetchShifts/89780/totalAvailableSlots?startDate=' +
          startDate +
          '&endDate=' +
          endDate
      )
      .then((res: any) => {
        if (res) {
          let groupedShifts = _.groupBy(res, 'date');
          this.allDays.forEach((obj: any) => {
            if (groupedShifts[obj.id]) {
              obj.shifts = groupedShifts[obj.id];
            }
          });

          this.allDays.forEach((obj: any) => {
            const slotsAvailable = _.sumBy(obj.shifts, 'availableSlots');
            obj.slotsAvailable = slotsAvailable;
          });
        }
      })
      .catch((error) => {
        return console.error('Error fetching receipt names:', error);
      });
  }

  // http://localhost:8080/89780/slotInfo?date=2024-03-08&shiftId=101

  async totalAvailableSlots(shift: any) {
    console.log(shift);
    await this.apiService
      .getAllData(
        DOMAINS.HOME + 'fetchShifts/89780/slotInfo?date=' + shift.date
      )
      .then((res: any) => {
        if (res) {
          // let groupedShifts = _.groupBy(res, 'date');
          // this.allDays.forEach((obj: any) => {
          //   if (groupedShifts[obj.id]) {
          //     obj.shifts = groupedShifts[obj.id];
          //   }
          // });

          // this.allDays.forEach((obj: any) => {
          //   const slotsAvailable = _.sumBy(obj.shifts, 'availableSlots');
          //   obj.slotsAvailable = slotsAvailable;
          // });
          console.log(res);
        }
      })
      .catch((error) => {
        return console.error('Error fetching receipt names:', error);
      });
  }

  ngOnInit(): void {
    this.generateCalendar(moment().month());
    this.tokenService.startTokenExpiryMonitoring();
    this.fetchDoctors();
    this.totalAvailableShifts();
  }
}
