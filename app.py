from flask import Flask, render_template, request, redirect, url_for, flash

app = Flask(__name__)
app.secret_key = "dev-secret-key"  # change for production (only demo)

# Dummy credentials for simulation only
DUMMY_USER = {
    "email": "demo@example.com",
    "password": "password123"
}

@app.route("/", methods=["GET"])
def index():
    return render_template("login.html")

@app.route("/login", methods=["POST"])
def login():
    email = request.form.get("email", "").strip()
    password = request.form.get("password", "")

    # Simulation: check against dummy credentials only (no storage / no logging)
    if email.lower() == DUMMY_USER["email"] and password == DUMMY_USER["password"]:
        # simulated success
        return render_template("success.html", email=email)
    else:
        flash("Login failed — this is a demo. Use demo@example.com / password123", "error")
        return redirect(url_for("index"))

if __name__ == "__main__":
    app.run(debug=True)
