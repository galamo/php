class Student {
    constructor(id, first_name, last_name, phone, email, courses, avatar) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone = phone;
        this.email = email;
        this.courses = courses;
        this.avatar = avatar;
    }
}

class Admin {
    constructor(id, first_name, last_name, phone, email, avatar, role, password) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.phone = phone;
        this.email = email;
        this.avatar = avatar;
        this.role = role;
        this.password = password;
    }
}

class Course {
    constructor(id, name, description, students, avatar) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.students = students;
        this.avatar = avatar;
    }
}