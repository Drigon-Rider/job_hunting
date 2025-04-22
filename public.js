document.addEventListener("DOMContentLoaded", () => {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  
    // Update navigation based on login status
    if (currentUser) {
      // If logged in, show dashboard link instead of login/register
      const loginNavLink = document.getElementById("login-nav-link")
      const registerNavLink = document.getElementById("register-nav-link")
  
      if (loginNavLink && registerNavLink) {
        loginNavLink.innerHTML = '<i class="fas fa-tachometer-alt"></i> Dashboard'
        loginNavLink.href = "dashboard.html"
  
        registerNavLink.innerHTML = '<i class="fas fa-user"></i> Profile'
        registerNavLink.href = "profile.html"
      }
  
      // Update auth buttons if they exist
      const authButtons = document.querySelector(".auth-buttons")
      if (authButtons) {
        authButtons.innerHTML = `
          <a href="dashboard.html" class="auth-btn login-btn">My Dashboard</a>
          <a href="profile.html" class="auth-btn register-btn">My Profile</a>
        `
      }
    }
  
    // DOM Elements
    const jobListingsEl = document.getElementById("job-listings")
    const departmentFilter = document.getElementById("department-filter")
    const levelFilter = document.getElementById("level-filter")
    const locationFilter = document.getElementById("location-filter")
  
    // Store all jobs for filtering
    let allJobs = []
  
    // Fetch jobs from JSON file
    fetch("data/jobs.json")
      .then((response) => response.json())
      .then((jobs) => {
        // Store jobs in a variable for later use
        allJobs = jobs
  
        // Render job listings
        renderJobs(jobs)
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
  
        // Check if user is logged in
        if (currentUser) {
          // If logged in, redirect to dashboard with job ID
          window.location.href = `dashboard.html?jobId=${jobId}`
        } else {
          // If not logged in, redirect to login page with job ID as return URL
          localStorage.setItem("pendingJobApplication", jobId)
          window.location.href = "login.html?redirect=job"
        }
      }
    })
  
    // Handle filters
    function applyFilters() {
      const departmentValue = departmentFilter.value
      const levelValue = levelFilter.value
      const locationValue = locationFilter.value
  
      const filteredJobs = allJobs.filter((job) => {
        return (
          (!departmentValue || job.department === departmentValue) &&
          (!levelValue || job.level === levelValue) &&
          (!locationValue || job.location === locationValue)
        )
      })
  
      renderJobs(filteredJobs)
    }
  
    // Add event listeners to filters
    if (departmentFilter && levelFilter && locationFilter) {
      departmentFilter.addEventListener("change", applyFilters)
      levelFilter.addEventListener("change", applyFilters)
      locationFilter.addEventListener("change", applyFilters)
    }
  })
  