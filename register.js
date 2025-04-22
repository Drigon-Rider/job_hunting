document.addEventListener("DOMContentLoaded", () => {
  // Check if user is already logged in
  if (localStorage.getItem("currentUser")) {
    window.location.href = "dashboard.html"
  }

  const registerForm = document.getElementById("registerForm")
  const registerError = document.getElementById("registerError")
  const registerSuccess = document.getElementById("registerSuccess")

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault()

    // Get form values
    const fullName = document.getElementById("fullName").value
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const confirmPassword = document.getElementById("confirmPassword").value
    const location = document.getElementById("location").value
    const email = document.getElementById("email").value
    const mobile = document.getElementById("mobile").value

    // Validate form
    if (password !== confirmPassword) {
      registerError.textContent = "Passwords do not match"
      registerError.style.display = "block"
      registerSuccess.style.display = "none"
      return
    }

    try {
      // Fetch existing users
      const response = await fetch("data/users.json")
      const existingUsers = await response.json()

      // Check if username already exists
      if (existingUsers.some((user) => user.username === username)) {
        registerError.textContent = "Username already exists"
        registerError.style.display = "block"
        registerSuccess.style.display = "none"
        return
      }

      // Get existing registered users from localStorage or initialize empty array
      const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || []

      // Check if username exists in registered users
      if (registeredUsers.some((user) => user.username === username)) {
        registerError.textContent = "Username already exists"
        registerError.style.display = "block"
        registerSuccess.style.display = "none"
        return
      }

      // Create new user object
      const newUser = {
        id: existingUsers.length + registeredUsers.length + 1,
        username,
        password,
        fullName,
        location,
        email,
        mobile,
        profileImage: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? "men" : "women"}/${Math.floor(Math.random() * 70)}.jpg`,
      }

      // Add new user to registered users
      registeredUsers.push(newUser)

      // Save to localStorage
      localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers))

      // Show success message
      registerError.style.display = "none"
      registerSuccess.textContent = "Registration successful! Redirecting to login page..."
      registerSuccess.style.display = "block"

      // Reset form
      registerForm.reset()

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        window.location.href = "login.html"
      }, 2000)
    } catch (error) {
      console.error("Error during registration:", error)
      registerError.textContent = "An error occurred. Please try again."
      registerError.style.display = "block"
      registerSuccess.style.display = "none"
    }
  })
})
