function Student(name, gender, age) {
  this.name = name;
  this.gender = gender;
  this.age = age;
}

let diligentStudent = new Student("Ivanov", "male", 18);
let negligentStudent = new Student("Petrov", "male", 21);
let mutableStudent = new Student("Sidorova", "female", 19);

Student.prototype.setSubject = function(subjectName) {
  this.subject = subjectName;
}

Student.prototype.addMark = function(mark) {
  if (this.marks === undefined) {
    this.marks = [mark];
  } else {
    this.marks.push(mark);
  }
}

Student.prototype.addMarks = function(...marks) {
  if (this.marks === undefined) { 
    this.marks = [...marks];
  } else {
    this.marks.push(...marks);
  }
}

Student.prototype.getAverage = function() {
  if (this.marks === undefined) { 
    return console.log("No marks");
  }
  let sum = 0
  for (let i = 0; i < this.marks.length; i++) {
    sum += this.marks[i];
  }
  return (sum / this.marks.length);
}

Student.prototype.exclude = function(reason) {
  delete this.subject;
  delete this.marks;
  this.excluded = reason;
}