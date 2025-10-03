from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        print(f"Login attempt:\nEmail: {email}\nPassword: {password}")
        return redirect(url_for('success'))
    return render_template('login.html')

@app.route('/success')
def success():
    return "<h2>Login Submitted (Demo Page)</h2>"

if __name__ == '__main__':
    app.run(debug=True)
