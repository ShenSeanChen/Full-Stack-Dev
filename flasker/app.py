from flask import Flask, render_template, flash, request
from flask_wtf import FlaskForm
from numpy import record 
from wtforms import StringField, SubmitField, PasswordField, BooleanField, ValidationError
from wtforms.validators import DataRequired, EqualTo, Length
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

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

# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql:///root:password123@localhost/our_users'
# app.config['MYSQL_HOST'] = "localhost"
# app.config['MYSQL_USER'] = "root"
# # # app.config['MYSQL_USER'] = "shenseanchen"
# # # app.config['MYSQL_PASSWORD'] = "password123"

# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# /
# Old SQLite DB
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'

# Heroku Postgre DB
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://rmfscvvneeiuws:6cd683477a2d3085aad99e4c65a3bad9319c00dce55d974b693898ee6cba5839@ec2-23-23-182-238.compute-1.amazonaws.com:5432/d871h2f5h0vkav'

# /
# Initialize the database
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# /
# Create Users DB class
class Users(db.Model): #inherit db.Model
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(20), nullable=False) #string of 200 characters and don't want the names to be blank
	email = db.Column(db.String(120), nullable=False, unique=True)
	favorite_color = db.Column(db.String(120))
	date_added = db.Column(db.DateTime, default=datetime.utcnow)

	# Password
	password_hash = db.Column(db.String(128))

	@property
	def password(self):
		raise AttributeError('Password is not a readable attribute!')

	@password.setter
	def password(self, password):
		self.password_hash = generate_password_hash(password)

	def verify_password(self, password):
		return check_password_hash(self.password_hash, password)

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
	favorite_color = StringField("Favorite Color")
	password_hash = PasswordField('Password', validators=[DataRequired(), EqualTo('password_hash2', message='Passowrds Must Match!!!')])
	password_hash2 = PasswordField('Confirm Password', validators=[DataRequired()])
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
			# Hash the password
			hashed_pw = generate_password_hash(form.password_hash.data, "sha256")

			# user = Users(name=form.name.data, email=form.email.data, favorite_color=form.favorite_color.data, password_hash=form.password_hash.data)
			user = Users(name=form.name.data, email=form.email.data, favorite_color=form.favorite_color.data, password_hash=hashed_pw)
			
			db.session.add(user)
			db.session.commit()

		name = form.name.data
		form.name.data = ''
		form.email.data = ''
		form.favorite_color.data = ''
		flash("Your Form Was Submitted Successfully!")
	
	our_users = Users.query.order_by(Users.date_added)	
	return render_template("add_user.html",
		form=form,
		name=name,
		Users=Users,
		our_users=our_users)

# /
# Update Database record
@app.route('/update/<int:id>', methods=['GET', 'POST'])
def update(id):
	form = UserForm()
	name_to_update = Users.query.get_or_404(id)
	if request.method == "POST":
		name_to_update.name = request.form['name']
		name_to_update.email = request.form['email']
		name_to_update.favorite_color = request.form['favorite_color']
		try:
			db.session.commit()
			flash("User Updated Successfully!")
			return render_template("update.html",
									form=form,
									name_to_update=name_to_update)
		except:
			flash("Error! Looks like there was problem... Sean recommends that you try again:)))!")
			return render_template("update.html",
									form=form,
									name_to_update=name_to_update)
	else:
		return render_template("update.html",
									form=form,
									name_to_update=name_to_update,
									id=id)


# /
# Delete Database records
@app.route('/delete/<int:id>')
def delete(id):
	user_to_delete = Users.query.get_or_404(id)

	name="Sean"
	form=UserForm()

	try:
		db.session.delete(user_to_delete)
		db.session.commit()
		flash("User Deleted Success!!")
		
		our_users = Users.query.order_by(Users.date_added)	
		return render_template("add_user.html",
			form=form,
			name=name,
			Users=Users,
			our_users=our_users)

	except:
		flash("Whoops! There was a problem deleting user, try again plzzzz......")
		return render_template("add_user.html",
			form=form,
			name=name,
			Users=Users,
			our_users=our_users)

