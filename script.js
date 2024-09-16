document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("resume-form");
    var resumeContent = document.getElementById("resume-content");
    var resumeSection = document.getElementById("resume");
    var editResumeButton = document.getElementById("edit-resume");
    // Load any previously saved data from localStorage
    loadFormData();
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        var formData = new FormData(form);
        var name = formData.get("name");
        var email = formData.get("email");
        var phone = formData.get("phone");
        var education = formData.get("education");
        var workExperience = formData.get("work-experience");
        var skills = formData.get("skills");
        // Handle profile picture
        var profilePicInput = document.getElementById("profile-pic");
        var profilePicUrl = "";
        if (profilePicInput.files && profilePicInput.files.length > 0) {
            var file = profilePicInput.files[0];
            profilePicUrl = URL.createObjectURL(file);
        }
        // Generate resume content including the profile picture if it exists
        var resumeHTML = "\n    <header style=\"text-align: center;\">\n        ".concat(profilePicUrl ? "<img src=\"".concat(profilePicUrl, "\" alt=\"Profile Picture\" class=\"profile-pic\">") : '', "\n        <h1>").concat(name, "</h1>\n        <p>Email: ").concat(email, "</p>\n        <p>Phone: ").concat(phone, "</p>\n    </header>\n    <section>\n        <h2>Education</h2>\n        <p>").concat(education, "</p>\n    </section>\n    <section>\n        <h2>Work Experience</h2>\n        <p>").concat(workExperience, "</p>\n    </section>\n    <section>\n        <h2>Skills</h2>\n        <p>").concat(skills.split(',').map(function (skill) { return "<span class=\"skill\">".concat(skill.trim(), "</span>"); }).join(', '), "</p>\n    </section>\n");
        resumeContent.innerHTML = resumeHTML;
        // Save form data to localStorage (including profile pic path if needed)
        saveFormData(name, email, phone, education, workExperience, skills);
        // Hide form and show resume
        form.style.display = 'none';
        resumeSection.style.display = 'block';
    });
    editResumeButton.addEventListener("click", function () {
        form.style.display = 'block';
        resumeSection.style.display = 'none';
        loadFormData(); // Load previously saved data
    });
    function saveFormData(name, email, phone, education, workExperience, skills) {
        var data = { name: name, email: email, phone: phone, education: education, workExperience: workExperience, skills: skills };
        localStorage.setItem('resumeData', JSON.stringify(data));
    }
    function loadFormData() {
        var savedData = localStorage.getItem('resumeData');
        if (savedData) {
            var _a = JSON.parse(savedData), name_1 = _a.name, email = _a.email, phone = _a.phone, education = _a.education, workExperience = _a.workExperience, skills = _a.skills;
            document.getElementById("name").value = name_1 || '';
            document.getElementById("email").value = email || '';
            document.getElementById("phone").value = phone || '';
            document.getElementById("education").value = education || '';
            document.getElementById("work-experience").value = workExperience || '';
            document.getElementById("skills").value = skills || '';
        }
    }
});
