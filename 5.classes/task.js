"use strict";
// Задача №1
class PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        this.name = name;
        this.releaseDate = releaseDate;
        this.pagesCount = pagesCount;
        this._state = 100;
        this.type = null;
    }

    fix() {
        this.state *= 1.5;
    }

    set state(state) {
        if (state < 0) {
            this._state = 0;
        }
        if (state > 100) {
            this._state = 100;
        } else {
            this._state = state;
        }
    }

    get state() {
        return this._state;
    }
}

class Magazine extends PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.type = 'magazine';
    }
}

class Book extends PrintEditionItem {
    constructor(author, name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.author = author;
        this.type = 'book';
    }
}

class NovelBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = 'novel';
    }
}

class FantasticBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = 'fantastic';
    }
}

class DetectiveBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = 'detective';
    }
}

// Задача №2
class Library {
    constructor(name) {
        this.name = name;
        this.books = [];
    }

    addBook(book) {
        if (book.state > 30) {
            this.books.push(book);
        }
    }

    findBookBy(type, value) {
        // for (const book of this.books) {
        //     if (book.hasOwnProperty(type) && book[type] === value) {
        //         return book;
        //     }
        // }
        let index = this.books.findIndex((book) => book[type] === value);
        if (index < 0) {
            return null;
        }
        return this.books[index];
    }

    giveBookByName(bookName) {
        let search = this.findBookBy('name', bookName);
        this.books = this.books.filter(book => book.name !== bookName);
        return search;
    }
}

// Задача №3
class Mark {
    constructor(mark, subject) {
        this.mark = mark;
        this.subject = subject;
    }
}

class Student {
    constructor(name) {
        this.name = name;
        this.marks = [];
        this.subjects =[];
    }

    addMark(mark, subject) {
        if (mark < 0 || mark > 5) {
            return console.log('Ошибка! Оценка должна быть от 1 до 5.');
        }
        this.marks.push(new Mark(mark, subject));
        this.subjects.push(subject);
    }

    getAverage() {
        if (this.marks.length === 0) {
            return console.log('Ошибка! Нет оценок.');
        }
        let sum = 0;
        for (const mark of this.marks) {
            sum += mark.mark;
        }
        console.log(`Средний балл по всем предметам: ${sum / this.marks.length}`);
        return (sum / this.marks.length);
    }

    getAverageBySubject(subjectName) {
        if (this.subjects.includes(subjectName)) {
            let sum = 0;
            let count = 0;
            for (const mark of this.marks) {
                if (mark.subject === subjectName) {
                    sum += mark.mark;
                    count += 1;
                }
            }
            console.log(`Средний балл по предмету ${subjectName}: ${sum / count}`);
            return (sum / count);
        }
        return console.log('Ошибка! Несуществующий предмет.');
    }

    exclude(reason) {
        this.marks = [];
        this.excluded = reason;
        return console.log(`Исключен по причине: ${reason}`);
    }
}