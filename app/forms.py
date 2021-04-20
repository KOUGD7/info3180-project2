from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired, FileAllowed
from wtforms import StringField
from wtforms import SelectField
from wtforms.widgets import TextArea
from wtforms.validators import DataRequired



class UploadForm (FlaskForm):
    description = StringField('Description', widget=TextArea(), validators=[DataRequired()])
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