import mysql.connector

db = mysql.connector.connect(
    user="root",
    password="12345678",
    database="sales_ai",
    unix_socket="/tmp/mysql.sock"
)

print("Database connected successfully")