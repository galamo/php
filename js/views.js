function studentDetails(student) {
    student.courses = getStudentCourses(student.id);
    let div = $("<div>");
    let editBtn = $("<button>").attr('class', 'btn btn-primary pull-right').text('Edit').on('click', function() {
        studentForm(student);
    });
    $("<h2>").text(student.first_name + " " + student.last_name).append(editBtn).appendTo(div);
    let section = $("<section>").attr('class', 'container-fluid').appendTo(div).fadeIn();
    $("<img>").attr("src", student.avatar).appendTo(section);
    $("<p>").text(student.phone).appendTo(section);
    $("<p>").text(student.email).appendTo(section);
    $("<h4>").text(student.courses.length + " Enrolled Courses:").appendTo(section);
    listStudentCourses(student.courses).appendTo(section);
    $("main").html(div);
}

function adminDetails(admin) {
    let div = $("<div>");
    let editBtn = $("<button>").attr('class', 'btn btn-primary pull-right').text('Edit').on('click', function() {
        adminForm(admin);
    });
    $("<h2>").text(admin.first_name + " " + admin.last_name + ", " + admin.role).append(editBtn).appendTo(div);
    let section = $("<section>").attr('class', 'container-fluid').appendTo(div).fadeIn();
    $("<img>").attr("src", admin.avatar).appendTo(section);
    $("<p>").text(admin.phone).appendTo(section);
    $("<p>").text(admin.email).appendTo(section);
    $("main").html(div);
}

function courseDetails(course) {
    course.students = getCourseStudents(course.id);
    let div = $("<div>");
    let editBtn = (window.activeAdmin.role == "Manager" || window.activeAdmin.role == "Owner") ? $("<button>").attr('class', 'btn btn-primary pull-right').text('Edit').on('click', function() {
        courseForm(course);
    }) : "";
    let h2 = $("<h2>").text(course.name).append(editBtn).appendTo(div);
    let section = $("<section>").attr('class', 'container-fluid').appendTo(div).fadeIn();
    $("<img>").attr("src", course.avatar).appendTo(section);
    $("<p>").text(course.description).appendTo(section);
    $("<h4>").text(course.students.length + " Enrolled Students:").appendTo(section);
    listCourseStudents(course.students).appendTo(section);
    $("main").html(div);
}

function listStudentCourses(courses) {
    let coursesUl = $("<ul>").attr({ 'id': 'studentCourses', 'class': 'scroll list' });
    $.each(courses, function(i, course) {
        let avatar = $("<img>").attr('src', course.avatar);
        let name = $("<span>").text(course.name);
        let li = $("<li>").appendTo(coursesUl).append(avatar, name).on('click', function() {
            $("li").removeClass('activeLi');
            $("ul#coursesUl>li#" + course.id).addClass('activeLi');
            courseDetails(course);
        });
    })
    return coursesUl;
}

function listCourseStudents(students) {
    let studentsUl = $("<ul>").attr({ 'id': 'courseStudents', 'class': 'scroll list' });
    $.each(students, function(i, student) {
        let avatar = $("<img>").attr('src', student.avatar);
        let name = $("<span>").text(student.first_name + " " + student.last_name);
        let li = $("<li>").appendTo(studentsUl).append(avatar, name).on('click', function() {
            $("li").removeClass('activeLi');
            $("ul#studentsUl>li#" + student.id).addClass('activeLi');
            studentDetails(student);
        })
    })
    return studentsUl;
}

function studentLI(student) {
    let li = $("<li>").attr('id', student.id).on('click', function() {
        studentDetails(student);
    });
    $("<img>").attr('src', student.avatar).appendTo(li);
    let div = $("<div>").appendTo(li);
    $("<p>").text(student.first_name + " " + student.last_name).appendTo(div);
    $("<p>").text(student.phone).appendTo(div);
    return li;
}

function adminLI(admin) {
    let li = $("<li>").attr('id', admin.id).on('click', function() {
        adminDetails(admin);
    });
    $("<img>").attr('src', admin.avatar).appendTo(li);
    let div = $("<div>").appendTo(li);
    $("<p>").text(admin.first_name + " " + admin.last_name).appendTo(div);
    $("<p>").text(admin.phone).appendTo(div);
    return li;
}

function courseLI(course) {
    let li = $("<li>").attr('id', course.id).on('click', function() {
        $("main").html(courseDetails(course));
    });
    $("<img>").attr('src', course.avatar).appendTo(li);
    $("<p>").text(course.name).appendTo(li);
    return li;
}

function studentForm(student) {
    if (student.id == 'New Student') {
        var title = $("<span>").attr({ 'id': 'randomStudent', 'title': 'Generate a random student.' }).text("Add Student").on('click', function() {
            randomStudent();
        })
        var deleteBtn = "";
    } else {
        var title = $("<span>").text("Edit Student");
        var deleteBtn = $("<button>").text('Delete').attr({ 'type': 'button', 'class': 'btn btn-danger pull-right' }).on('click', function() {
            deleteStudent(student.id);
        });
    }
    let form = $("<form>").attr('id', 'studentForm').on('submit', function(e) {
        e.preventDefault();
        saveStudent(student.id);
    });;
    let saveBtn = $("<button>").text('Save').attr({ 'class': 'btn btn-primary pull-left' });
    $("<h2>").appendTo(form).append(saveBtn, title, deleteBtn)
    let section = $("<section class='container-fluid'>").appendTo(form).fadeIn();
    $("<label class='avatarLabel'>").appendTo(section).css('background-image', 'url(' + student.avatar + ')').html($("<input>").attr({ 'type': 'file', 'name': 'avatar', 'id': 'avatar' }));
    $("<label>").appendTo(section).text('First Name:').append($("<input>").attr({ 'required': true, 'type': 'text', 'name': 'first_name', 'placeholder': 'First Name', 'value': student.first_name }));
    $("<label>").appendTo(section).text('Last Name:').append($("<input>").attr({ 'required': true, 'type': 'text', 'name': 'last_name', 'placeholder': 'Last Name', 'value': student.last_name }));
    $("<label>").appendTo(section).text('Phone:').append($("<input>").attr({ 'required': true, 'type': 'tel', 'name': 'phone', 'placeholder': 'Phone', 'value': student.phone }));
    $("<label>").appendTo(section).text('Email:').append($("<input>").attr({ 'required': true, 'type': 'email', 'name': 'email', 'placeholder': 'Email', 'value': student.email }));
    let coursesCheckboxes = $("<div id='coursesCheckboxes'>");

    $.each(window.courses, function(x, course) {
        let checked = "";
        $.each(student.courses, function(i, studentCourse) {
            if (course.id == studentCourse.id) {
                checked = "checked";
            }
        })
        $("<label>").appendTo(coursesCheckboxes).text(course.name + " ").attr('class', checked).append($("<input " + checked + ">").attr({ 'class': 'CB', 'type': 'checkbox', 'value': course.id, 'name': 'courses[]' }).on('click', function() {
            $(this).parent().toggleClass('checked');
        }));
    });
    coursesCheckboxes.appendTo(section);
    $("main").html(form);
};

function courseForm(course) {
    if (course.id == "New Course") {
        var title = $("<span>").text("Add Course");
        var deleteBtn = "";
        var studentCount = "";
    } else {
        var title = $("<span>").text("Edit Course");
        var deleteBtn = (course.students.length == 0) ? $("<button>").attr({ 'type': 'button', 'class': 'btn btn-danger pull-right' }).text('Delete').on('click', function() {
            deleteCourse(course.id);
        }) : "";
        var studentCount = $("<h4>").text(course.students.length + " enrolled students.");
    }
    let form = $("<form id='courseForm'>").on('submit', function(e) {
        e.preventDefault();
        saveCourse(course.id);
    });;
    let saveBtn = $("<button>").attr({ 'class': 'btn btn-primary pull-left' }).text('Save');
    $("<h2>").append(saveBtn, title, deleteBtn).appendTo(form);
    let section = $("<section>").attr('class', 'container-fluid').fadeIn();
    $("<label class='avatarLabel'>").css('background-image', 'url(' + course.avatar + ')').appendTo(section).html($('<input>').attr({ 'type': 'file', 'name': 'avatar', 'id': 'avatar' }))
    $("<label>").appendTo(section).text('Course Name:').append($("<input>").attr({ 'required': true, 'type': 'text', 'name': 'name', 'placeholder': 'Course Name', 'value': course.name }));
    $("<label>").appendTo(section).text('Description:').append($("<textarea>").attr({ 'name': 'description', 'placeholder': 'Description' }).text(course.description));
    $("main").html(form.append(section.append(studentCount)));
}

function adminForm(admin) {
    if (admin.id == 'New Admin') {
        var title = $("<span>").text("Add Admin");
        var deleteBtn = "";
    } else {
        var title = $("<span>").text("Edit Admin");
        var deleteBtn = (window.activeAdmin.id != admin.id || window.activeAdmin.role == "Owner") ? $("<button>").text('Delete').attr({ 'type': 'button', 'class': 'btn btn-danger pull-right' }).on('click', function() {
            deleteAdmin(admin.id);
        }) : "";
    }
    let form = $("<form>").attr('id', 'adminForm').on('submit', function(e) {
        e.preventDefault();
        saveAdmin(admin.id);
    });;
    let saveBtn = $("<button>").text('Save').attr({ 'class': 'btn btn-primary pull-left' });
    $("<h2>").appendTo(form).append(saveBtn, title, deleteBtn)
    let section = $("<section class='container-fluid'>").appendTo(form).fadeIn();
    $("<label class='avatarLabel'>").appendTo(section).css('background-image', 'url(' + admin.avatar + ')').html($("<input>").attr({ 'type': 'file', 'name': 'avatar', 'id': 'avatar' }));
    $("<label>").appendTo(section).text('First Name:').append($("<input>").attr({ 'required': true, 'type': 'text', 'name': 'first_name', 'placeholder': 'First Name', 'value': admin.first_name }));
    $("<label>").appendTo(section).text('Last Name:').append($("<input>").attr({ 'required': true, 'type': 'text', 'name': 'last_name', 'placeholder': 'Last Name', 'value': admin.last_name }));
    $("<label>").appendTo(section).text('Phone:').append($("<input>").attr({ 'required': true, 'type': 'tel', 'name': 'phone', 'placeholder': 'Phone', 'value': admin.phone }));
    $("<label>").appendTo(section).text('Email:').append($("<input>").attr({ 'required': true, 'type': 'email', 'name': 'email', 'placeholder': 'Email', 'value': admin.email }));
    $("<label>").appendTo(section).text('Password:').append($("<input>").attr({ 'type': 'password', 'name': 'password', 'placeholder': 'Password' }));

    let roles = (window.activeAdmin.id == admin.id) ? [activeAdmin.role] : ['Sales', 'Manager'];

    $.each(roles, function(i, role) {
        let checked = "";
        if (admin.role == role) {
            checked = "checked";
        }
        $("<label>").appendTo(section).text(role + ":").append($("<input " + checked + ">").attr({ 'type': 'radio', 'name': 'role', 'value': role }));
    })

    $("main").html(form);
}

function schoolOverview() {
    let div = $("<div>");
    $("<h2>").text("Overview").appendTo(div);
    let section = $("<section>").attr('class', 'container-fluid').appendTo(div).fadeIn();
    $("<p>").text("Total Students:" + Object.keys(window.students).length).appendTo(section);
    $("<p>").text("Total Courses:" + Object.keys(window.courses).length).appendTo(section);
    $("main").html(div);
}

function adminOverview() {
    let div = $("<div>");
    $("<h2>").text("Overview").appendTo(div);
    let section = $("<section>").attr('class', 'container-fluid').appendTo(div).fadeIn();
    $("<p>").text("Total Admins:" + Object.keys(window.admins).length).appendTo(section);
    $("main").html(div);
}

function searchView(type) {
    let div = $("<div>");
    $("<h2>").text(type + " Search").appendTo(div);
    let section = $("<section>").appendTo(div).attr('class', 'container-fluid').fadeIn();
    $("<h4>").text("Search By: ").appendTo(section).append(selectOptions(type));
    $("<h4>").text("Search For: ").appendTo(section).append($("<input>").attr({ 'type': 'text', 'placeholder': 'Search..' }).on('keyup', function() {
        search(this.value, type);
    }));
    $("main").html(div);
}

function selectOptions(type) {
    let select = $("<select>");
    switch (type) {
        case "Admin":
            $("<option>").text("Role").val("role").appendTo(select);

        case "Admin":
        case "Student":
            $("<option>").text("First Name").val("first_name").appendTo(select);
            $("<option>").text("Last Name").val("last_name").appendTo(select);
            $("<option>").text("Email").val("email").appendTo(select);
            $("<option>").text("Phone").val("phone").appendTo(select);
            break;

        case "Course":
            $("<option>").text("Name").val("name").appendTo(select);
            $("<option>").text("Description").val("description").appendTo(select);
    }
    return select;
}