from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired, FileAllowed
from wtforms import StringField
from wtforms import SelectField
from wtforms import PasswordField
from wtforms.widgets import TextArea
from wtforms.validators import DataRequired, InputRequired



class UploadForm (FlaskForm):
    description = StringField('Description', widget=TextArea(), validators=[DataRequired()])
    photo = FileField('Photo', validators=[
        FileRequired(),
        FileAllowed(['jpg', 'png', 'Images only!'])
    ])


class LoginForm(FlaskForm):
    username = StringField('Username', validators=[InputRequired()])
    password = PasswordField('Password', validators=[InputRequired()])

class RegistrationForm (FlaskForm):
    Username = StringField('Username', validators=[DataRequired()])
    Password = PasswordField('Password', validators=[DataRequired()])
    Name = StringField('Name', validators=[DataRequired()])
    Email = StringField('Email', validators=[DataRequired()])
    Location = StringField('Location', validators=[DataRequired()])
    
    Biography = StringField('Biography', widget=TextArea(), validators=[DataRequired()])

    photo = FileField('Photo', validators=[
        FileRequired(),
        FileAllowed(['jpg', 'png', 'Images only!'])
    ])

class CarForm (FlaskForm):
    Make = StringField('Make', validators=[DataRequired()])
    Model = StringField('Model', validators=[DataRequired()])
    Colour = StringField('Colour', validators=[DataRequired()])
    Year = StringField('Year', validators=[DataRequired()])
    Price = StringField('Price', validators=[DataRequired()])
    
    choices1 = [('SUV', 'SUV'), ('Sedan', 'Sedan'), ('Hatch', 'Hatch'), ('Truck','Truck')]
    Car_Type = SelectField("Car Type", choices = choices1, default = ['SUV'])

    choices2 = [('Automatic', 'Automatic'), ('Manual', 'Manual')]
    Transmission = SelectField("Transmission", choices = choices2, default = ['Automatic'])
    
    Description = StringField('Description', widget=TextArea(), validators=[DataRequired()])

    photo = FileField('Photo', validators=[
        FileRequired(),
        FileAllowed(['jpg', 'png', 'Images only!'])
    ])