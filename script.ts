document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("resume-form") as HTMLFormElement;
    const resumeContent = document.getElementById("resume-content") as HTMLDivElement;
    const resumeSection = document.getElementById("resume") as HTMLElement;
    const editResumeButton = document.getElementById("edit-resume") as HTMLButtonElement;


    loadFormData();

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const education = formData.get("education") as string;
        const workExperience = formData.get("work-experience") as string;
        const skills = formData.get("skills") as string;

        const profilePicInput = document.getElementById("profile-pic") as HTMLInputElement;
        let profilePicUrl = "";
        if (profilePicInput.files && profilePicInput.files.length > 0) {
            const file = profilePicInput.files[0];
            profilePicUrl = URL.createObjectURL(file);
        }

        const resumeHTML = `
    <header style="text-align: center;">
        ${profilePicUrl ? `<img src="${profilePicUrl}" alt="Profile Picture" class="profile-pic">` : ''}
        <h1>${name}</h1>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
    </header>
    <section>
        <h2>Education</h2>
        <p>${education}</p>
    </section>
    <section>
        <h2>Work Experience</h2>
        <p>${workExperience}</p>
    </section>
    <section>
        <h2>Skills</h2>
        <p>${skills.split(',').map(skill => `<span class="skill">${skill.trim()}</span>`).join(', ')}</p>
    </section>
`;

        resumeContent.innerHTML = resumeHTML;

        saveFormData(name, email, phone, education, workExperience, skills);

        form.style.display = 'none';
        resumeSection.style.display = 'block';
    });

    editResumeButton.addEventListener("click", () => {
        form.style.display = 'block';
        resumeSection.style.display = 'none';
        loadFormData();  
    });

    function saveFormData(name: string, email: string, phone: string, education: string, workExperience: string, skills: string) {
        const data = { name, email, phone, education, workExperience, skills };
        localStorage.setItem('resumeData', JSON.stringify(data));
    }

    function loadFormData() {
        const savedData = localStorage.getItem('resumeData');
        if (savedData) {
            const { name, email, phone, education, workExperience, skills } = JSON.parse(savedData);
            (document.getElementById("name") as HTMLInputElement).value = name || '';
            (document.getElementById("email") as HTMLInputElement).value = email || '';
            (document.getElementById("phone") as HTMLInputElement).value = phone || '';
            (document.getElementById("education") as HTMLTextAreaElement).value = education || '';
            (document.getElementById("work-experience") as HTMLTextAreaElement).value = workExperience || '';
            (document.getElementById("skills") as HTMLInputElement).value = skills || '';
        }
    }
});
