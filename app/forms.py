from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired, FileAllowed
from wtforms import StringField, SelectField, PasswordField 
from wtforms.fields.html5 import EmailField
from wtforms.widgets import TextArea
from wtforms.validators import DataRequired, InputRequired



class UploadForm (FlaskForm):
    description = StringField('Description', widget=TextArea(), validators=[DataRequired()])
    photo = FileField('Photo', validators=[
        FileRequired(),
        FileAllowed(['jpg', 'png', 'Images only!'])
    ])


class LoginForm (FlaskForm):
    Username = StringField('Username', validators=[DataRequired()])
    Password = PasswordField('Password', validators=[DataRequired()])


class RegistrationForm (FlaskForm):
    Username = StringField('Username', validators=[DataRequired()])
    Password = PasswordField('Password', validators=[DataRequired()])
    Name = StringField('Name', validators=[DataRequired()])
    Email = EmailField('Email', validators=[DataRequired()])
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

class SearchForm(FlaskForm):
    model = StringField('model')
    make = StringField('make') 