// Задача №1
function parseCount(count) {
    let parsedCount = Number.parseInt(count);
    if (Number.isNaN(parsedCount)) {
        throw new Error('Невалидное значение');
    }
    return parsedCount;
}

function validateCount(count) {
    try {
        return parseCount(count);
    } catch (error) {
        console.log(error);
        return error;
    }
}

// Задача №2
class Triangle {
    constructor(side1, side2, side3) {
        if ((side1 + side2) < side3 || (side2 + side3) < side1 || (side3 + side1) < side2) {
            throw new Error('Треугольник с такими сторонами не существует');
        }
        this.side1 = side1;
        this.side2 = side2;
        this.side3 = side3;
    }

    getPerimeter() {
        return (this.side1 + this.side2 + this.side3);
    }

    getArea() { 
        let perimeter = (this.getPerimeter() / 2);
        return Number(Math.sqrt(perimeter * (perimeter - this.side1) * (perimeter - this.side2) * (perimeter - this.side3)).toFixed(3));
    }
}

function getTriangle(side1, side2, side3) {
    try {
        return new Triangle(side1, side2, side3);
    } catch (error) {
        return {
            getPerimeter: () => 'Ошибка! Треугольник не существует',
            getArea: () => 'Ошибка! Треугольник не существует'
        }
    }
}