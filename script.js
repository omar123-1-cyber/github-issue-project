document.getElementById("btn1").addEventListener("click", function() {
    if(username.value === "admin" && password.value === "admin123") {
        alert("Login successful!");
        window.location.href = "dashboard.html";
    } else {
        alert("Login failed!");
    }
});

