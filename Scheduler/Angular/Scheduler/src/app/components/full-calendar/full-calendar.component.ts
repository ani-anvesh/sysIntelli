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
  selectedDoctor: any = {};
  selectedMonth: any = moment().startOf('month').format('MMMM');
  selectedDay: any = moment().format('dddd');
  selectedDate: any = moment().date();
  slotDuration: number = 15;
  totalSlotDate: any = [];
  // dateSelect: Boolean = false;

  timeMarkers: string[] = [];

  constructor(
    private tokenService: TokenService,
    private confirmationService: ConfirmationService,
    private apiService: ApiService
  ) {
    this.monthOptions = this.getMonthsInYear(moment().year());
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
      {
        startTime: '09:00',
        endTime: '12:00',
        date: currentTime.format('YYYY-MM-DD'),
        shiftId: '101',
      }
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
    this.selectedShift = shift;
    this.selectedDay = day.day;
    this.selectedDate = day.date;
    this.slotMaker();
  }

  slotMaker() {
    this.timeSlotData = [];
    const { startTime, endTime } = this.selectedShift;
    console.log(this.selectedShift);
    this.setTimeMarkers({ startTime: startTime, endTime: endTime });
    this.timeSlotData = _.filter(
      this.totalSlotDate,
      (slot) =>
        slot.startTime >= startTime.slice(0, 5) &&
        slot.endTime <= endTime.slice(0, 5)
    );
    this.timeSlotData = _.sortBy(this.timeSlotData, (item) => {
      return moment(item.startTime, 'HH:mm').toDate();
    });
    this.totalBookedSlots(this.selectedShift);
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
    this.totalAvailableShifts();
  }

  doctorSelected(doctor: any) {
    this.selectedDoctor = doctor;
    this.generateCalendar(moment(this.selectedMonth, 'MMMM').month());
    this.totalAvailableShifts();
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

  async fetchDoctors(): Promise<any> {
    return await this.apiService
      .getAllData(DOMAINS.HOME + 'fetchDoctors/all')
      .then((res: any) => {
        if (res) {
          this.doctorOptions = res;
          this.doctorSelected(res[3]);
        }
        return this.doctorOptions;
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
          'fetchShifts/' +
          this.selectedDoctor.doctorId +
          '/totalAvailableSlots?startDate=' +
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

  async totalBookedSlots(shift: any) {
    await this.apiService
      .getAllData(
        DOMAINS.HOME +
          'fetchSlots/' +
          this.selectedDoctor.doctorId +
          '/slotInfo?date=' +
          shift.date +
          '&shiftId=' +
          shift.shiftId
      )
      .then((res: any) => {
        if (res) {
          this.timeSlotData = _.map(this.timeSlotData, (slot) =>
            _.merge(slot, _.find(res, { slotName: slot.slotName }))
          );
        }
      })
      .catch((error) => {
        return console.error('Error fetching receipt names:', error);
      });
  }

  async allSlots() {
    return await this.apiService
      .getAllData(DOMAINS.HOME + 'fetchSlots/allSlots')
      .then((res: any) => {
        if (res) {
          this.totalSlotDate = _.forEach(res, (item) => {
            item.startTime = item.startTime.slice(0, 5);
            item.endTime = item.endTime.slice(0, 5);
          });
          // this.slotMaker();
          return this.totalSlotDate;
        }
      })
      .catch((error) => {
        return console.error('Error fetching receipt names:', error);
      });
  }

  async ngOnInit() {
    try {
      const [doctors, slots] = await Promise.all([
        this.fetchDoctors(),
        this.allSlots(),
      ]);
      if (slots) {
        this.generateCalendar(moment().month());
        this.tokenService.startTokenExpiryMonitoring();
        this.generateTimeMarkers();
      }
    } catch (error) {
      console.error('Error occurred:', error);
      // Handle error appropriately
    }
  }
}
