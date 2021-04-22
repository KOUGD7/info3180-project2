"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/
This file creates your application.
"""

from app import app
from flask import render_template, request

import os
from werkzeug.utils import secure_filename
from .forms import UploadForm
from .forms import CarForm
from flask import send_from_directory
from flask import jsonify

###
# Routing for your application.
###

@app.route('/api/upload', methods=['POST'])
def upload():
    myform = UploadForm()
    if request.method == 'POST':
        if myform.validate_on_submit():
            # Get file data and save to your uploads folder
            description = myform.description.data
            photo = myform.photo.data

            filefolder = app.config['UPLOAD_FOLDER']
            filename = secure_filename(photo.filename)

            #rootdir = os.getcwd()
            photo.save(os.path.join(filefolder,filename))

            info = {'message': 'File Upload Successful', 'filename': filename, 'description': description}
            return  jsonify(info=info)
            
        error = form_errors(myform)
        return jsonify(error= error)

@app.route('/api/cars', methods=['POST', 'GET'])
def cars():
    myform = CarForm()
    if request.method == 'POST': 
        if myform.validate_on_submit():
            # Get file data and save to your uploads folder
            Make = myform.Make.data
            Model = myform.Model.data
            Colour = myform.Colour.data
            Year = myform.Year.data
            Price = myform.Price.data
            Type = myform.Car_Type.data
            Tran = myform.Transmission.data
            Descrip = myform.Description.data
            photo = myform.photo.data

            filefolder = app.config['UPLOAD_FOLDER']
            filename = secure_filename(photo.filename)

            #rootdir = os.getcwd()
            photo.save(os.path.join(filefolder,filename))

            car = {'message': 'Car Successful Added', 'Make': Make, 'Model': Model, 'Colour': Colour, 'Year': Year, 'Price': Price, 'Type': Type, 'Transmission': Tran, 'Description': Descrip }
            info = {'message': 'File Upload Successful', 'filename': filename, 'description': Descrip}
            return  jsonify(car=car)

        error = form_errors(myform)
        return jsonify(error= error)

    if request.method == 'GET':
        cars = [
            {
                "id": 123,
                "description": "4-cyl, Gas, 2.5L, 4WD/AWD, All Wheel Drive, Automatic Transmission",
                "year": "2014",
                "make": "Subaru",
                "model": "Forrester",
                "colour": "Gray",
                "transmission": "Automatic",
                "car_type": "SUV",
                "price": 17998.99,
                "photo": "http://localhost/images/subaru.jpg",
                "user_id": 1
            },
            {
                "id": 207,
                "description": "The best electic car anyone can buy. With the longest range and quickest acceleration of any electric vehicle in production, Model S Plaid is the highest performing sedan ever built",
                "year": "2018",
                "make": "Tesla",
                "model": "Model S Plaid",
                "colour": "Red",
                "transmission": "Automatic",
                "car_type": "Sedan",
                "price": 32998.99,
                "photo": "http://localhost/images/tesla.jpg",
                "user_id": 2
            }
        ]

        return  jsonify(cars=cars)
    error = form_errors(myform)
    return jsonify(error= error)

@app.route("/api/car/<car_id>", methods=["GET"])
def car(car_id):
    #myform =
    car = {
        "id": 123,
        "description": "4-cyl, Gas, 2.5L, 4WD/AWD, All Wheel Drive",
        "year": "2014",
        "make": "Subaru",
        "model": "Forrester",
        "colour": "Gray",
        "transmission": "Automatic",
        "car_type": "SUV",
        "price": 17998.99,
        "photo": "http://localhost/images/subaru.jpg",
        "user_id": 1
    }
    return  jsonify(car=car)
    #error = form_errors(myform)
    #return jsonify(error= error)

@app.route("/api/car/<car_id>/favourite", methods=["POST"])
def carFav(car_id):
    #myform = 
    if request.method == 'POST': 
        info = {
                "message": "Car Successfully Favourited",
                "car_id": 1
        }
        return  jsonify(info=info)
    else:
        info = {
                "message": "Car Failed to be Favourited",
                "car_id": 1
        }
        return  jsonify(info=info)

    #error = form_errors(myform)
    #return jsonify(error= error)

@app.route("/api/search", methods=["GET"])
def search():
    results = [
        {
            "id": 123,
            "description": "4-cyl, Gas, 2.5L, 4WD/AWD, All Wheel Drive, Automatic Transmission",
            "year": "2014",
            "make": "Subaru",
            "model": "Forrester",
            "colour": "Gray",
            "transmission": "Automatic",
            "car_type": "SUV",
            "price": 17998.99,
            "photo": "http://localhost/images/subaru.jpg",
            "user_id": 1
        },
        {
            "id": 207,
            "description": "The best electic car anyone can buy. With the longest range and quickest acceleration of any electric vehicle in production, Model S Plaid is the highest performing sedan ever built",
            "year": "2018",
            "make": "Tesla",
            "model": "Model S Plaid",
            "colour": "Red",
            "transmission": "Automatic",
            "car_type": "Sedan",
            "price": 32998.99,
            "photo": "http://localhost/images/tesla.jpg",
            "user_id": 2
        }
    ]
    return  jsonify(cars=results)

@app.route("/api/users/<user_id>", methods=["GET"])
def users(user_id):
    user = {
        "id": 1,
        "username": "car_expert",
        "name": "Danica Patrick",
        "photo": "http://localhost/images/photo.jpg",
        "email": "dpatrick@example.com",
        "location": "Wisconsin, USA",
        "biography": "I am a former professional racing driver and the most successful woman in the history of American open-wheel racing. I love cars and driving fast.",
        "date_joined": "2021-04-05 17:53:00"
    }
    return  jsonify(user=user)

@app.route("/api/car/<user_id>/favourites", methods=["GET"])
def userFav(user_id):
    results = [
        {
            "id": 123,
            "description": "4-cyl, Gas, 2.5L, 4WD/AWD, All Wheel Drive, Automatic Transmission",
            "year": "2014",
            "make": "Subaru",
            "model": "Forrester",
            "colour": "Gray",
            "transmission": "Automatic",
            "car_type": "SUV",
            "price": 17998.99,
            "photo": "http://localhost/images/subaru.jpg",
            "user_id": 1
        },
        {
            "id": 207,
            "description": "The best electic car anyone can buy. With the longest range and quickest acceleration of any electric vehicle in production, Model S Plaid is the highest performing sedan ever built",
            "year": "2018",
            "make": "Tesla",
            "model": "Model S Plaid",
            "colour": "Red",
            "transmission": "Automatic",
            "car_type": "Sedan",
            "price": 32998.99,
            "photo": "http://localhost/images/tesla.jpg",
            "user_id": 2
        }
    ]
    return  jsonify(cars=results)


# Please create all new routes and view functions above this route.
# This route is now our catch all route for our VueJS single page
# application.
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    """
    Because we use HTML5 history mode in vue-router we need to configure our
    web server to redirect all routes to index.html. Hence the additional route
    "/<path:path".

    Also we will render the initial webpage and then let VueJS take control.
    """
    return render_template('index.html')


# Here we define a function to collect form errors from Flask-WTF
# which we can later use
def form_errors(form):
    error_messages = []
    """Collects form errors"""
    for field, errors in form.errors.items():
        for error in errors:
            message = u"Error in the %s field - %s" % (
                    getattr(form, field).label.text,
                    error
                )
            error_messages.append(message)

    return error_messages


###
# The functions below should be applicable to all Flask apps.
###


@app.route('/<file_name>.txt')
def send_text_file(file_name):
    """Send your static text file."""
    file_dot_text = file_name + '.txt'
    return app.send_static_file(file_dot_text)


@app.after_request
def add_header(response):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also tell the browser not to cache the rendered page. If we wanted
    to we could change max-age to 600 seconds which would be 10 minutes.
    """
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response


@app.errorhandler(404)
def page_not_found(error):
    """Custom 404 page."""
    return render_template('404.html'), 404


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port="8080")
