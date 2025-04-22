document.addEventListener("DOMContentLoaded", () => {
  // Check if user is already logged in
  if (localStorage.getItem("currentUser")) {
    window.location.href = "dashboard.html"
  }

  const loginForm = document.getElementById("loginForm")
  const loginError = document.getElementById("loginError")

  // Add link to registration page
  document.querySelector(".register-link a").href = "register.html"

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    try {
      // Fetch users from JSON file
      const response = await fetch("data/users.json")
      const users = await response.json()

      // Get registered users from localStorage
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || []

      // Combine both user sources
      const allUsers = [...users, ...registeredUsers]

      // Find user
      const user = allUsers.find((u) => u.username === username && u.password === password)

      if (user) {
        // Store user info in localStorage (except password)
        const { password, ...userInfo } = user
        localStorage.setItem("currentUser", JSON.stringify(userInfo))

        // Check if there's a redirect parameter
        const urlParams = new URLSearchParams(window.location.search)
        const redirect = urlParams.get("redirect")

        // Redirect based on parameter or pending job application
        if (redirect === "job" || localStorage.getItem("pendingJobApplication")) {
          window.location.href = "dashboard.html"
        } else {
          window.location.href = "dashboard.html"
        }
      } else {
        loginError.textContent = "Invalid username or password"
        loginError.style.display = "block"
      }
    } catch (error) {
      console.error("Error fetching user data:", error)
      loginError.textContent = "An error occurred. Please try again."
      loginError.style.display = "block"
    }
  })
})
