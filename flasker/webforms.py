from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, PasswordField, BooleanField, ValidationError
from wtforms.validators import DataRequired, EqualTo, Length
from wtforms.widgets import TextArea


#################################
# Create FlaskForm Classes
#################################

# Create a User Form Class
class UserForm(FlaskForm):
	name = StringField("Name", validators=[DataRequired()])
	username = StringField("Username", validators=[DataRequired()])
	email = StringField("Email", validators=[DataRequired()])
	favorite_color = StringField("Favorite Color")
	password_hash = PasswordField('Password', validators=[DataRequired(), EqualTo('password_hash2', message='Passowrds Must Match!!!')])
	password_hash2 = PasswordField('Confirm Password', validators=[DataRequired()])
	submit = SubmitField("Submit")

# Create a Namer Form Class
class NamerForm(FlaskForm):
	name = StringField("What's your name homie? ", validators=[DataRequired()])
	submit = SubmitField("Submit")


# Create a Password Form Class
class PasswordForm(FlaskForm):
	email = StringField("What's your Email? ", validators=[DataRequired()])
	password_hash = PasswordField("What's your Password? ", validators=[DataRequired()])
	submit = SubmitField("Submit")

# Create a Posts Form
class PostForm(FlaskForm):
	title = StringField("Title", validators=[DataRequired()])
	content = StringField("Content", validators=[DataRequired()], widget=TextArea())
	# author = StringField("Author", validators=[DataRequired()])
	slug = StringField("Slug", validators=[DataRequired()])
	submit = SubmitField("Submit")

# Create Login Form
class LoginForm(FlaskForm):
	username = StringField("Username", validators=[DataRequired()])
	password = PasswordField("Password", validators=[DataRequired()])
	submit = SubmitField("Submit")
