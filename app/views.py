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

@app.route('/api/cars', methods=['POST'])
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
