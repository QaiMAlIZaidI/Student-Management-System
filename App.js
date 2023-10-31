import readline from 'readline';
const students = [];
let studentsInitialized = false;
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
class Student {
    name;
    studentID;
    courses;
    balance;
    constructor(name) {
        this.name = name;
        this.studentID = Math.floor(10000 + Math.random() * 90000);
        this.courses = [];
        this.balance = 0;
    }
    enroll(course) {
        this.courses.push(course);
    }
    viewBalance() {
        console.log(`Balance for ${this.name}: $${this.balance}`);
    }
    addFunds(amount) {
        this.balance += amount;
        console.log(`$${amount} added. New balance: $${this.balance}`);
    }
    payTuition(amount) {
        this.balance -= amount;
        console.log(`$${amount} paid. New balance: $${this.balance}`);
    }
    showStatus() {
        console.log(`Student Name: ${this.name}`);
        console.log(`Student ID: ${this.studentID}`);
        console.log('Enrolled Courses:');
        this.courses.forEach(course => {
            console.log(`- ${course}`);
        });
        console.log(`Balance: $${this.balance}`);
    }
}
function createStudent() {
    rl.question('Enter student name: ', name => {
        const student = new Student(name);
        students.push(student);
        console.log(`${name} has been registered with ID ${student.studentID}`);
        showMainMenu();
    });
}
function enrollStudent() {
    rl.question('Enter student ID: ', studentID => {
        const student = students.find(s => s.studentID === parseInt(studentID));
        if (student) {
            rl.question('Enter course name: ', course => {
                student.enroll(course);
                console.log(`${student.name} has enrolled in ${course}`);
                showMainMenu();
            });
        }
        else {
            console.log('Student not found.');
            showMainMenu();
        }
    });
}
function addFundsToStudent() {
    rl.question('Enter student ID: ', studentID => {
        const student = students.find(s => s.studentID === parseInt(studentID));
        if (student) {
            rl.question('Enter amount to add: $', amount => {
                const fundAmount = parseFloat(amount);
                student.addFunds(fundAmount);
                console.log(`${student.name} received $${fundAmount}. New balance: $${student.balance}`);
                showMainMenu();
            });
        }
        else {
            console.log('Student not found.');
            showMainMenu();
        }
    });
}
function showMainMenu() {
    console.log('\nMain Menu');
    console.log('1. Create Student');
    console.log('2. Enroll Student');
    console.log('3. View Student Balance');
    console.log('4. Pay Tuition');
    console.log('5. Show Student Status');
    console.log('6. Exit');
    console.log('7. Add Funds to Student'); // Option to add funds
    rl.question('Select an option (1-7): ', option => {
        switch (option) {
            case '1':
                createStudent();
                break;
            case '2':
                enrollStudent();
                break;
            case '3':
                viewStudentBalance();
                break;
            case '4':
                payTuition();
                break;
            case '5':
                showStudentStatus();
                break;
            case '6':
                rl.close();
                break;
            case '7':
                addFundsToStudent();
                break;
            default:
                console.log('Invalid option. Please select a valid option (1-7).');
                showMainMenu();
        }
    });
}
console.log('Welcome to the Student Management System');
showMainMenu();
function viewStudentBalance() {
    rl.question('Enter student ID: ', studentID => {
        const student = students.find(s => s.studentID === parseInt(studentID));
        if (student) {
            student.viewBalance();
            showMainMenu();
        }
        else {
            console.log('Student not found.');
            showMainMenu();
        }
    });
}
function showStudentStatus() {
    rl.question('Enter student ID: ', studentID => {
        const student = students.find(s => s.studentID === parseInt(studentID));
        if (student) {
            student.showStatus();
            showMainMenu();
        }
        else {
            console.log('Student not found.');
            showMainMenu();
        }
    });
}
function payTuition() {
    rl.question('Enter student ID: ', studentID => {
        const student = students.find(s => s.studentID === parseInt(studentID));
        if (student) {
            rl.question('Enter amount to pay: $', amount => {
                const tuitionAmount = parseFloat(amount);
                if (tuitionAmount > student.balance) {
                    console.log('Payment amount exceeds the balance.');
                }
                else {
                    student.payTuition(tuitionAmount);
                    console.log(`${student.name} paid $${tuitionAmount} in tuition. New balance: $${student.balance}`);
                }
                showMainMenu();
            });
        }
        else {
            console.log('Student not found.');
            showMainMenu();
        }
    });
}
