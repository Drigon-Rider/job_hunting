document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in
  const currentUser = JSON.parse(localStorage.getItem("currentUser"))
  if (!currentUser) {
    window.location.href = "login.html"
    return
  }

  // Update sidebar user profile
  const sidebarProfileImg = document.getElementById("sidebar-profile-img")
  const sidebarProfileName = document.getElementById("sidebar-profile-name")
  const sidebarProfileLocation = document.getElementById("sidebar-profile-location")

  sidebarProfileImg.src = currentUser.profileImage
  sidebarProfileName.textContent = currentUser.fullName
  sidebarProfileLocation.textContent = currentUser.location

  // Update main profile section
  const mainProfileImg = document.getElementById("main-profile-img")
  const profileName = document.getElementById("profile-name")
  const profileLocation = document.getElementById("profile-location")
  const profileUsername = document.getElementById("profile-username")
  const profileEmail = document.getElementById("profile-email")
  const profileMobile = document.getElementById("profile-mobile")

  mainProfileImg.src = currentUser.profileImage
  profileName.textContent = currentUser.fullName
  profileLocation.textContent = currentUser.location
  profileUsername.textContent = currentUser.username
  profileEmail.textContent = currentUser.email || "Not provided"
  profileMobile.textContent = currentUser.mobile || "Not provided"

  // Handle logout
  document.getElementById("logout-link").addEventListener("click", (e) => {
    e.preventDefault()
    localStorage.removeItem("currentUser")
    window.location.href = "index.html"
  })

  // Handle edit profile button
  document.getElementById("edit-profile-btn").addEventListener("click", () => {
    alert("Profile editing feature is coming soon!")
  })

  // Handle sidebar menu clicks
  document.querySelectorAll(".sidebar-menu a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      // Remove active class from all links
      document.querySelectorAll(".sidebar-menu a").forEach((l) => l.classList.remove("active"))

      // Add active class to clicked link
      this.classList.add("active")

      // Handle dashboard link
      if (this.id === "dashboard-link") {
        window.location.href = "dashboard.html"
      }
    })
  })

  // Handle home link
  document.getElementById("home-link").addEventListener("click", (e) => {
    e.preventDefault()
    window.location.href = "index.html"
  })
})
