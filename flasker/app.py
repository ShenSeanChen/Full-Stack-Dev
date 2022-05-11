from flask import Flask, render_template, flash
from flask_wtf import FlaskForm 
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

#################################
# Create a Flask instance
#################################
app = Flask(__name__)

# Set up Secret Key
app.config['SECRET_KEY'] = "My super secret key that no one is supposed to know except Sean."

#################################
# Configure database
#################################

# # New MySQL DB
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql:///root:password123@localhost/our_users'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql:///root:password123@localhost/our_users'
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
# # app.config['MYSQL_USER'] = "shenseanchen"
app.config['MYSQL_PASSWORD'] = 'password123'
# app.config['MYSQL_DB'] = "MySQL-Sean"
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# /
# Old SQLite DB
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'

# /
# Initialize the database
db = SQLAlchemy(app)

# /
# Create Model
class Users(db.Model): #inherit db.Model
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(20), nullable=False) #string of 200 characters and don't want the names to be blank
	email = db.Column(db.String(120), nullable=False, unique=True)
	date_added = db.Column(db.DateTime, default=datetime.utcnow)

	# Create a string
	def __repr__(self):
		# return '<Name %r>' % self.name
		return self.name

#################################
# Create FlaskForm Classes
#################################

# Create a User Form Class
class UserForm(FlaskForm):
	name = StringField("Name", validators=[DataRequired()])
	email = StringField("Email", validators=[DataRequired()])
	submit = SubmitField("Submit")

# Create a Namer Form Class
class NamerForm(FlaskForm):
	name = StringField("What's your name homie? ", validators=[DataRequired()])
	submit = SubmitField("Submit")

#################################
# create custom error pages
#################################

# invalid URL
@app.errorhandler(404)
def page_not_found(e):
	return render_template("404.html"), 404

# internal server error
@app.errorhandler(500)
def page_not_found(e):
	return render_template("500.html"), 500

#################################
# Create route decorators -- URLs
#################################

# /
# Create a root route
@app.route('/') 

# render a template: for index and user
def index():
	first_name = 'Sean'
	stuff = 'This is <strong>Bold</strong> Tag'
	stuff2 = "This is bold text"

	favourite_pizza = ["Pepperoni", "Cheese", "MeatLovers", 101]
	return render_template("index.html", 
		first_name=first_name,
		stuff=stuff,
		stuff2=stuff2,
		favourite_pizza=favourite_pizza)

# /
# Create a new name route
# localhost:5000/user/sean -- the name is an input
@app.route('/user/<input_name>')

# def user(name):
# 	return "<h1>hello {}!!!</h1>".format(name)

# jinja2 - auto installed when installing flask
def user(input_name):
	return render_template("user.html", user_name=input_name)

# /
# Create Name Page
@app.route('/name', methods=['GET', 'POST'])
# Everytime you have a form, you are either getting or posting that form

def name():
	name = None
	form = NamerForm()

	# Validate Form
	if form.validate_on_submit():
		name=form.name.data
		form.name.data=''
		flash("Your Form Was Submitted Successfully!")
		
	return render_template("name.html",
		name=name,
		form=form)

# /
# Create an url for db
@app.route('/user/add', methods=['GET', 'POST'])
def add_user():
	name = None
	form = UserForm()

	# Validate Form
	if form.validate_on_submit():

		user = Users.query.filter_by(email=form.email.data).first()
		if user is None:
			user = Users(name=form.name.data, email=form.email.data)
			db.session.add(user)
			db.session.commit()

		name = form.name.data
		form.name.data = ''
		form.email.data = ''

		flash("Your Form Was Submitted Successfully!")
		
	our_users = Users.query.order_by(Users.date_added)
		
	return render_template("add_user.html",
		form=form,
		name=name,
		Users=Users,
		our_users=our_users)













