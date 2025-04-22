document.addEventListener("DOMContentLoaded", () => {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    if (!currentUser) {
      window.location.href = "login.html"
      return
    }
  
    // Update user profile in sidebar
    const userProfileImg = document.querySelector(".user-profile img")
    const userProfileName = document.querySelector(".user-profile h3")
    const userProfileLocation = document.querySelector(".user-profile p")
  
    userProfileImg.src = currentUser.profileImage
    userProfileName.textContent = currentUser.fullName
    userProfileLocation.textContent = currentUser.location
  
    // Handle logout
    document.getElementById("logout-link").addEventListener("click", (e) => {
      e.preventDefault()
      localStorage.removeItem("currentUser")
      window.location.href = "index.html"
    })
  
    // DOM Elements
    const jobListingsEl = document.getElementById("job-listings")
    const applicationFormSection = document.getElementById("application-form-section")
    const jobsSection = document.getElementById("jobs-section")
    const jobApplicationForm = document.getElementById("jobApplicationForm")
  
    // Fetch jobs from JSON file
    fetch("data/jobs.json")
      .then((response) => response.json())
      .then((jobs) => {
        // Store jobs in a variable for later use
        window.jobsData = jobs
  
        // Render job listings
        renderJobs(jobs)
  
        // Check if there's a pending job application
        const urlParams = new URLSearchParams(window.location.search)
        const jobId = urlParams.get("jobId")
  
        if (jobId) {
          const selectedJob = jobs.find((job) => job.id === Number.parseInt(jobId))
          if (selectedJob) {
            // Show application form for the selected job
            jobsSection.classList.add("hidden")
            applicationFormSection.classList.remove("hidden")
            console.log("Applying for:", selectedJob.title)
          }
        }
  
        // Check for pending job application in localStorage
        const pendingJobId = localStorage.getItem("pendingJobApplication")
        if (pendingJobId && !jobId) {
          const selectedJob = jobs.find((job) => job.id === Number.parseInt(pendingJobId))
          if (selectedJob) {
            // Show application form for the selected job
            jobsSection.classList.add("hidden")
            applicationFormSection.classList.remove("hidden")
            console.log("Applying for:", selectedJob.title)
  
            // Clear the pending application
            localStorage.removeItem("pendingJobApplication")
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching job data:", error)
        jobListingsEl.innerHTML = "<p>Error loading jobs. Please try again later.</p>"
      })
  
    // Render job listings
    function renderJobs(jobs) {
      jobListingsEl.innerHTML = jobs
        .map(
          (job) => `
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
          `,
        )
        .join("")
    }
  
    // Handle apply button click
    jobListingsEl.addEventListener("click", (e) => {
      if (e.target.classList.contains("apply-btn")) {
        const jobId = Number.parseInt(e.target.getAttribute("data-job-id"))
        const selectedJob = window.jobsData.find((job) => job.id === jobId)
  
        // Show application form and hide job listings
        jobsSection.classList.add("hidden")
        applicationFormSection.classList.remove("hidden")
  
        // You can use the selectedJob data to pre-fill parts of the form
        console.log("Applying for:", selectedJob.title)
      }
    })
  
    // Handle form submission
    jobApplicationForm.addEventListener("submit", (e) => {
      e.preventDefault()
  
      // Form validation
      const mobileInput = document.getElementById("mobile")
      if (!mobileInput.checkValidity()) {
        alert("Please enter a valid 10-digit Nepali mobile number starting with 98 or 97")
        return
      }
  
      // Collect form data
      const formData = {
        userId: currentUser.id,
        fullName: document.getElementById("fullName").value,
        dob: document.getElementById("dob").value,
        citizenshipNo: document.getElementById("citizenshipNo").value,
        mobile: mobileInput.value,
        email: document.getElementById("email").value,
        education: document.getElementById("education").value,
        applicationDate: new Date().toISOString(),
      }
  
      // In a real app, you would send this data to a server
      console.log("Form submitted:", formData)
  
      // Show success message
      alert("Application submitted successfully!")
  
      // Reset form and show job listings again
      jobApplicationForm.reset()
      applicationFormSection.classList.add("hidden")
      jobsSection.classList.remove("hidden")
    })
  
    // Navigation handling
    document.getElementById("home-link").addEventListener("click", (e) => {
      e.preventDefault()
      window.location.href = "index.html"
    })
  
    // Sidebar menu handling
    document.querySelectorAll(".sidebar-menu a").forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()
  
        // Remove active class from all links
        document.querySelectorAll(".sidebar-menu a").forEach((l) => l.classList.remove("active"))
  
        // Add active class to clicked link
        this.classList.add("active")
  
        // Handle different menu items
        const id = this.id
  
        if (id === "jobs-link") {
          applicationFormSection.classList.add("hidden")
          jobsSection.classList.remove("hidden")
        } else if (id === "dashboard-link") {
          // For now, just show jobs section
          applicationFormSection.classList.add("hidden")
          jobsSection.classList.remove("hidden")
        } else if (id === "applications-link" || id === "documents-link" || id === "settings-link") {
          alert("This feature is coming soon!")
        }
      })
    })
  })
  