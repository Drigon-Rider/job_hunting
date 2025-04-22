document.addEventListener('DOMContentLoaded', function() {
    // Sample job data
    const jobs = [
        {
            id: 1,
            title: "Administrative Officer",
            department: "Ministry of Education",
            level: "Officer (5th Level)",
            deadline: "2023-12-15",
            vacancies: 5,
            location: "Kathmandu"
        },
        {
            id: 2,
            title: "IT Officer",
            department: "Ministry of Communication",
            level: "Officer (6th Level)",
            deadline: "2023-12-20",
            vacancies: 3,
            location: "Kathmandu"
        },
        {
            id: 3,
            title: "Health Assistant",
            department: "Ministry of Health",
            level: "Assistant (4th Level)",
            deadline: "2023-12-10",
            vacancies: 15,
            location: "Province 1"
        },
        {
            id: 4,
            title: "Agriculture Technician",
            department: "Ministry of Agriculture",
            level: "Technical (4th Level)",
            deadline: "2023-12-25",
            vacancies: 10,
            location: "Province 2"
        }
    ];

    // DOM Elements
    const jobListingsEl = document.getElementById('job-listings');
    const applicationFormSection = document.getElementById('application-form-section');
    const jobsSection = document.getElementById('jobs-section');
    const jobApplicationForm = document.getElementById('jobApplicationForm');

    // Render job listings
    function renderJobs() {
        jobListingsEl.innerHTML = jobs.map(job => `
            <div class="job-card">
                <h3>${job.title}</h3>
                <div class="job-meta">
                    <span><i class="fas fa-building"></i> ${job.department}</span>
                    <span><i class="fas fa-layer-group"></i> ${job.level}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                    <span><i class="fas fa-user-friends"></i> ${job.vacancies} vacancies</span>
                    <span><i class="fas fa-calendar-times"></i> Deadline: ${job.deadline}</span>
                </div>
                <button class="apply-btn" data-job-id="${job.id}">Apply Now</button>
            </div>
        `).join('');
    }

    // Handle apply button click
    jobListingsEl.addEventListener('click', function(e) {
        if (e.target.classList.contains('apply-btn')) {
            const jobId = parseInt(e.target.getAttribute('data-job-id'));
            const selectedJob = jobs.find(job => job.id === jobId);
            
            // Show application form and hide job listings
            jobsSection.classList.add('hidden');
            applicationFormSection.classList.remove('hidden');
            
            // You can use the selectedJob data to pre-fill parts of the form
            console.log("Applying for:", selectedJob.title);
        }
    });

    // Handle form submission
    jobApplicationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form validation
        const mobileInput = document.getElementById('mobile');
        if (!mobileInput.checkValidity()) {
            alert('Please enter a valid 10-digit Nepali mobile number starting with 98 or 97');
            return;
        }
        
        // Collect form data
        const formData = {
            fullName: document.getElementById('fullName').value,
            dob: document.getElementById('dob').value,
            citizenshipNo: document.getElementById('citizenshipNo').value,
            mobile: mobileInput.value,
            email: document.getElementById('email').value,
            education: document.getElementById('education').value
        };
        
        // In a real app, you would send this data to a server
        console.log("Form submitted:", formData);
        
        // Show success message
        alert('Application submitted successfully!');
        
        // Reset form and show job listings again
        jobApplicationForm.reset();
        applicationFormSection.classList.add('hidden');
        jobsSection.classList.remove('hidden');
    });

    // Navigation handling
    document.getElementById('home-link').addEventListener('click', function(e) {
        e.preventDefault();
        applicationFormSection.classList.add('hidden');
        jobsSection.classList.remove('hidden');
    });

    // Initial render
    renderJobs();
});