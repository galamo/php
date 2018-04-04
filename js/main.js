'use strict';

$(function() {
    getSchoolData();
})

$("body").on('click', '#adminLink', function() {
    $(this).addClass("activeTab");
    $(this).siblings("span").removeClass("activeTab");
    $.get("index.php?route=admin", function(response) {
        $("#mainWrapper").html($(response).find('#adminWrapper'));
        drawAdminList(window.admins);
    });
});

$("body").on('click', "#schoolLink", function() {
    $(this).addClass("activeTab");
    $(this).siblings("span").removeClass("activeTab");
    $.get("index.php?route=school", function(response) {
        $("#mainWrapper").html($(response).find('#schoolWrapper'));
        drawStudentList(window.students);
        drawCourseList(window.courses);
    })
});

function getSchoolData() {
    $.getJSON("index.php?api=getSchoolData", function(data) {
        window.students = data['students'];
        window.courses = data['courses'];
        window.enrollments = data['enrollments'];
        window.admins = data['admins'];
        window.activeAdmin = data['activeAdmin'];
        drawStudentList(window.students);
        drawCourseList(window.courses);
    })
}

function drawStudentList(students) {
    $("#studentsUl").empty();
    $.each(students, function(i, student) {
        studentLI(student).appendTo($("#studentsUl"));
    });
}

function drawAdminList(admins) {
    $("#adminsUl").empty();
    $.each(admins, function(i, admin) {
        adminLI(admin).appendTo($("#adminsUl"))
    });
}

function drawCourseList(courses) {
    $("#coursesUl").empty();
    $.each(courses, function(i, course) {
        courseLI(course).appendTo($("#coursesUl"))
    });
}

function getCourseStudents(courseId) {
    let courseStudents = [];
    $.each(window.enrollments, function(i, enr) {
        if (enr.course_id == courseId) {
            courseStudents.push(window.students[enr.student_id]);
        }
    })
    return courseStudents;
}

function getStudentCourses(studentId) {
    let studentCourses = [];
    $.each(window.enrollments, function(i, enr) {
        if (enr.student_id == studentId) {
            studentCourses.push(window.courses[enr.course_id]);
        }
    })
    return studentCourses;
}

$("body").on('change', "input#avatar", function() {
    let label = this.parentElement;
    if (this.files && this.files[0] && this.files[0].size < 500000) {
        let reader = new FileReader();
        reader.onload = function(e) {
            label.style.backgroundImage = 'url(' + e.target.result + ')';
        }
        reader.readAsDataURL(this.files[0]);
    } else if (this.files && this.files[0]) {
        $.alert({
            title: "File must be under 500 KB.",
            content: "File size: " + Math.ceil((this.files[0].size / 1000)) + " KB."
        });
    }
});

$('body').on('click', 'ul.scroll>li', function() {
    $('li.activeLi').removeClass('activeLi');
    $(this).addClass('activeLi');
})

$("body").on('click', '.glyphicon-search', function() {
    let type = $(this).attr('data-type');
    searchView(type);
})

$("body").on('click', "#student-plus", function() {
    studentForm(new Student('New Student', "", "", "", "", [], 'src/images/personAvatar.png'));
})

$("body").on('click', "#admin-plus", function() {
    adminForm(new Admin('New Admin', "", "", "", "", 'src/images/personAvatar.png'));
})

$("body").on('click', "#course-plus", function() {
    courseForm(new Course('New Course', "", "", [], 'src/images/courseAvatar.jpg'));
})

function deleteStudent(id) {
    $.confirm({
        title: 'Are you sure?',
        content: 'You are about to delete this student.',
        buttons: {
            confirm: function() {
                $.post("index.php?api=deleteStudent", { 'id': id });
                delete window.students[id];
                resetEnrollments(id)
                $("#studentsUl>li#" + id).hide(function() {
                    $(this).remove();
                });
                schoolOverview();
            },
            cancel: function() {
                $.alert('Canceled!');
            }
        }
    });
}

function deleteAdmin(id) {
    $.confirm({
        title: 'Are you sure?',
        content: 'You are about to delete this admin.',
        buttons: {
            confirm: function() {
                $.post("index.php?api=deleteAdmin", { 'id': id });
                delete window.admins[id];
                $("#adminsUl>li#" + id).hide(function() {
                    $(this).remove();
                });
                adminOverview();
            },
            cancel: function() {
                $.alert('Canceled!');
            }
        }
    });
}

function deleteCourse(id) {
    $.confirm({
        title: 'Are you sure?',
        content: 'You are about to delete this course.',
        buttons: {
            confirm: function() {
                $.post("index.php?api=deleteCourse", { 'id': id });
                delete window.courses[id];
                $("#coursesUl>li#" + id).hide(function() {
                    $(this).remove();
                });
                schoolOverview();
            },
            cancel: function() {
                $.alert('Canceled!');
            }
        }
    });
}

function updateEnrollments(studentId, courses) {
    resetEnrollments(studentId);
    if (courses) {
        $.each(courses, function(i, courseId) {
            window.enrollments.push({ 'student_id': studentId, 'course_id': courseId });
        });
    } else {
        $.each($("input:checked"), function(i, input) {
            window.enrollments.push({ 'student_id': studentId, 'course_id': input.value });
        })
    }
}

function resetEnrollments(studentId) {
    for (let i = window.enrollments.length - 1; i >= 0; i--) {
        if (window.enrollments[i].student_id == studentId) {
            window.enrollments.splice(i, 1);
        }
    }
}

function saveAdmin(id) {
    let formData = new FormData($("#adminForm")[0])
    formData.append('avatar', getAvatarUrl('uploads/admins/'));

    $.ajax({
        type: "POST",
        url: 'index.php?api=saveAdmin&id=' + id,
        dataType: 'JSON',
        contentType: false,
        processData: false,
        data: formData,
        success: function(admin) {
            window.admins[admin.id] = admin;
            if (id == "New Admin") {
                $("#adminsUl").append(adminLI(admin).fadeIn());
            } else {
                $("#adminsUl>li#" + id).replaceWith(adminLI(admin));
            }
            if (admin.id == window.activeAdmin.id) {
                $("#nameAndRole").text(admin.first_name + " " + admin.last_name + ", " + admin.role);
                $("#adminImg").attr('src', admin.avatar);
            }
            adminDetails(admin);
        }
    })
}

function getAvatarUrl(path) {
    if ($("#avatar")[0].files[0]) {
        let fileName = $("#avatar")[0].files[0].name;
        return path + fileName;
    } else {
        let avatarUrl = $(".avatarLabel")[0].style.backgroundImage;
        return avatarUrl.slice(5, avatarUrl.length - 2);
    }
}

function saveCourse(id) {
    let formData = new FormData($("#courseForm")[0])
    formData.append('avatar', getAvatarUrl('uploads/courses/'));

    $.ajax({
        type: "POST",
        url: 'index.php?api=saveCourse&id=' + id,
        dataType: 'JSON',
        contentType: false,
        processData: false,
        data: formData,
        success: function(course) {
            window.courses[course.id] = course;
            if (id == "New Course") {
                $("#coursesUl").append(courseLI(course).fadeIn());
            } else {
                $("#coursesUl>li#" + id).replaceWith(courseLI(course));
            }
            courseDetails(course);
        }
    })
}

function saveStudent(id, randomStudent) {
    if (id == 'New Student' && randomStudent) {
        var contentType = "application/x-www-form-urlencoded; charset=UTF-8";
        var processData = true;
        var formData = randomStudent;
        var courses = randomStudent.courses;
    } else {
        var contentType = false;
        var processData = false;
        var formData = new FormData($("#studentForm")[0]);
        formData.append('avatar', getAvatarUrl('uploads/students/'));
        var courses = false;
    }
    $.ajax({
        type: "POST",
        url: 'index.php?api=saveStudent&id=' + id,
        dataType: 'JSON',
        contentType: contentType,
        processData: processData,
        data: formData,
        success: function(student) {
            if (window.students[student.id]) {
                $("#studentsUl>li#" + student.id).replaceWith(studentLI(student).fadeIn(100));
            } else {
                $("#studentsUl").append(studentLI(student).fadeIn(100));
            }
            window.students[student.id] = student;
            updateEnrollments(student.id, courses);
            studentDetails(student);
        }
    })
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function randomStudent() {
    $.get("https://randomuser.me/api/?inc=name,email,phone,picture&nat=AU,CA,FI,FR,GB,NL,NZ,US", function(response) {
        let result = response.results[0];
        let first_name = capitalize(result.name.first);
        let last_name = capitalize(result.name.last);
        let randomStudent = new Student("New Student", first_name, last_name, result.phone, result.email, randomCourses(), result.picture.large);
        saveStudent('New Student', randomStudent);
    })
}

function randomCourses() {
    let courses = [];
    let courseCount = Object.keys(window.courses).length;
    courses[0] = Math.floor(Math.random() * (courseCount / 2 - 1) + 1);
    courses[1] = Math.floor(Math.random() * (courseCount - courseCount / 2) + courseCount / 2 + 1);
    return courses;
}

function search(searchFor, type) {
    let db = window[type.toLowerCase() + "s"];
    let searchBy = $("select").val();
    let results = $.map(db, function(obj, id) {
        if (obj[searchBy].toLowerCase().indexOf(searchFor.toLowerCase()) != -1) {
            return obj;
        }
    });
    let listType = "draw" + type + "List";
    if (searchFor.length > 0) {
        window[listType](results);
    } else {
        window[listType](db);
    }
}