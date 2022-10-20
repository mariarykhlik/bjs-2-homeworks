"use strict";
class AlarmClock {
    constructor() {
        this.alarmCollection = [];
        this.timerId = null;
    }
    
    addClock(time, callBack, id) {          
        if (!id) {
            throw new Error('Параметр не передан');
        }
        if (this.alarmCollection.some(alarm => alarm.id === id)) {
            console.error(`Звонок не добавлен, id ${id} уже существует`);
            return;
        }
        this.alarmCollection.push({id, time, callBack});
    }

    removeClock(id) {
        if (this.alarmCollection.some(alarm => alarm.id === id)) {
            this.alarmCollection = this.alarmCollection.filter(alarm => alarm.id !== id);
            return true;
        } else {
            return false;
        }
    }

    getCurrentFormattedTime() {
        return new Date().toTimeString().slice(0,5);
    }

    getDelayedFormattedTime(minutes) {
        return new Date(Date.now() + minutes * 60000).toTimeString().slice(0,5);
    }

    start() {
        let checkClock = alarm => {
            if (alarm.time === this.getCurrentFormattedTime()) {
                alarm.callBack();
            }
        }
        if (!this.timerId) {
            this.timerId = setInterval(() => this.alarmCollection.forEach(alarm => checkClock(alarm)), 5000);
        }
    }

    stop() {
        if (this.timerId !== null) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }

    printAlarms() {
        console.log(`Будильников в коллекции: ${this.alarmCollection.length}`)
        this.alarmCollection.forEach(alarm => console.log(`Время будильника ${alarm.id}: ${alarm.time}`));
    }
    
    clearAlarms() {
        this.stop();
        this.alarmCollection = [];
    }
}

function testCase() {
    let studyDayAlarm = new AlarmClock();
    studyDayAlarm.addClock(studyDayAlarm.getCurrentFormattedTime(), () => console.log('Пора вставать!'), 1);
    studyDayAlarm.addClock(studyDayAlarm.getDelayedFormattedTime(1), () => {
        console.log('Уже пора вставать!');
        studyDayAlarm.removeClock(2);
    }, 2);
    studyDayAlarm.addClock(studyDayAlarm.getDelayedFormattedTime(2), () => {
        console.log('Срочно пора вставать!');
        studyDayAlarm.clearAlarms();
        studyDayAlarm.printAlarms();
    }, 3);
    studyDayAlarm.printAlarms();
    studyDayAlarm.start();
    setTimeout(() => {
        let weekendAlarm = new AlarmClock();
        console.log('Отлавливание отсутствия id');
        try {
            weekendAlarm.addClock(weekendAlarm.getCurrentFormattedTime(), () => console.log('Ура, выходной!'));
        } catch (error) {
            console.log(error);
        }
        console.log('Добавление будильников');
        weekendAlarm.addClock(weekendAlarm.getCurrentFormattedTime(), () => console.log('Ура, выходной!'), 4);
        weekendAlarm.addClock(weekendAlarm.getDelayedFormattedTime(1), () => console.log('Просыпайся, великие дела ждут!'), 5);
        console.log('Попытка добавления будильника с существующим id');
        weekendAlarm.addClock(weekendAlarm.getCurrentFormattedTime(6), () => console.log('Хотя, можно и поваляться...'), 5);
        console.log('Включение будильников');
        weekendAlarm.start();
        setTimeout(() => {
            weekendAlarm.stop();
            console.log('Выключение будильников');
            weekendAlarm.printAlarms();
        }, 60000);
        if (weekendAlarm.timerId >= 1) {
            setTimeout(() => {
                console.log('Удаление будильников');
                weekendAlarm.clearAlarms();
                weekendAlarm.printAlarms();
            }, 65000);
        }
    }, 125000);
}

testCase();