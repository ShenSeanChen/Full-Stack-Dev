# #################################
# Run this script only when you want to create a new database
# #################################

import mysql.connector

mydb = mysql.connector.connect(
	host="localhost",
	user="root",
	passwd="password123",
	# auth_plugin='mysql_native_password'
	)
# print('mydb successful')

my_cursor = mydb.cursor() 
# it's a little automated thing that goes to do command for you
# print('cursor successful')

# my_cursor.execute("SHOW GLOBAL VARIABLES LIKE 'PORT'")

my_cursor.execute("CREATE DATABASE our_users")
# my_cursor.execute("ALTER USER 'shenseanchen'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password123';")
#my_cursor.execute("ALTER USER 'shenseanchen'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Cs199832'")

my_cursor.execute("SHOW DATABASES")
for db in my_cursor:
	print(db)

