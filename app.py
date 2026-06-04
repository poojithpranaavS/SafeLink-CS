from flask import Flask, request, render_template, jsonify, Response
from flask_cors import CORS
import sqlite3
import requests
import csv
import io
from user_agents import parse
from datetime import datetime

app = Flask(__name__)
CORS(app)

# DATABASE SETUP
def init_db():

    conn = sqlite3.connect(
        'visitors.db',
        timeout=10,
        check_same_thread=False
    )

    c = conn.cursor()

    c.execute("""
        CREATE TABLE IF NOT EXISTS visitors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ip TEXT,
            city TEXT,
            region TEXT,
            country TEXT,
            isp TEXT,
            browser TEXT,
            os TEXT,
            device TEXT,
            time TEXT
        )
    """)

    conn.commit()
    conn.close()

init_db()

# TRACKING ROUTE
@app.route('/')
def track():

    ip = request.headers.get('X-Forwarded-For', request.remote_addr)

    try:
        response = requests.get(f'https://ipapi.co/{ip}/json/')
        data = response.json()

        city = data.get('city')
        region = data.get('region')
        country = data.get('country_name')
        isp = data.get('org')

    except:
        city = region = country = isp = "Unknown"

    ua_string = request.headers.get('User-Agent')
    ua = parse(ua_string)

    browser = ua.browser.family
    os = ua.os.family
    device = ua.device.family

    conn = sqlite3.connect(
        'visitors.db',
        timeout=10,
        check_same_thread=False
    )

    c = conn.cursor()

    c.execute("""
        INSERT INTO visitors
        (ip, city, region, country, isp, browser, os, device, time)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        ip,
        city,
        region,
        country,
        isp,
        browser,
        os,
        device,
        datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    ))

    conn.commit()
    conn.close()

    return render_template('index.html')

# DASHBOARD
@app.route('/dashboard')
def dashboard():

    conn = sqlite3.connect(
        'visitors.db',
        timeout=10,
        check_same_thread=False
    )

    c = conn.cursor()

    c.execute("SELECT * FROM visitors ORDER BY id DESC")

    visitors = c.fetchall()

    conn.close()

    return render_template(
        'dashboard.html',
        visitors=visitors
    )

# API
@app.route("/api/visitors")
def get_visitors():

    conn = sqlite3.connect("visitors.db")

    conn.row_factory = sqlite3.Row

    c = conn.cursor()

    c.execute("""
        SELECT *
        FROM visitors
        ORDER BY id DESC
    """)

    rows = c.fetchall()

    visitors = []

    for row in rows:

        visitors.append({
            "ip": row["ip"],
            "city": row["city"],
            "region": row["region"],
            "country": row["country"],
            "browser": row["browser"],
            "os": row["os"],
            "device": row["device"],
            "time": row["time"]
        })

    conn.close()

    return jsonify(visitors)

# CSV EXPORT
@app.route("/export-csv")
def export_csv():

    conn = sqlite3.connect("visitors.db")

    c = conn.cursor()

    c.execute("""
        SELECT
        ip,
        city,
        region,
        country,
        browser,
        os,
        device,
        time
        FROM visitors
        ORDER BY id DESC
    """)

    rows = c.fetchall()

    conn.close()

    output = io.StringIO()

    writer = csv.writer(output)

    writer.writerow([
        "IP Address",
        "City",
        "Region",
        "Country",
        "Browser",
        "OS",
        "Device",
        "Time"
    ])

    writer.writerows(rows)

    response = Response(
        output.getvalue(),
        mimetype="text/csv"
    )

    response.headers["Content-Disposition"] = (
        "attachment; filename=visitor_report.csv"
    )

    return response

if __name__ == '__main__':
    app.run(debug=True)