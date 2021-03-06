"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/
This file creates your application.
"""

from app import app, db, login_manager
from flask import render_template, request, send_from_directory, jsonify, url_for

import os
from werkzeug.utils import secure_filename
from .forms import CarForm, RegistrationForm, LoginForm, SearchForm

from flask_login import login_user, logout_user, current_user, login_required
from app.models import Users, Cars, Favourites
from werkzeug.security import check_password_hash

from datetime import date
from functools import wraps
import jwt

# Create a JWT @requires_auth decorator
# This decorator can be used to denote that a specific route should check
# for a valid JWT token before displaying the contents of that route.
def requires_auth(f):
  @wraps(f)
  def decorated(*args, **kwargs):
    auth = request.headers.get('Authorization', None) # or request.cookies.get('token', None)

    if not auth:
      return jsonify({'code': 'authorization_header_missing', 'description': 'Authorization header is expected'}), 401

    parts = auth.split()

    if parts[0].lower() != 'bearer':
      return jsonify({'code': 'invalid_header', 'description': 'Authorization header must start with Bearer'}), 401
    elif len(parts) == 1:
      return jsonify({'code': 'invalid_header', 'description': 'Token not found'}), 401
    elif len(parts) > 2:
      return jsonify({'code': 'invalid_header', 'description': 'Authorization header must be Bearer + \s + token'}), 401

    token = parts[1]
    try:
        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])

    except jwt.ExpiredSignatureError:
        return jsonify({'code': 'token_expired', 'description': 'token is expired'}), 401
    except jwt.DecodeError:
        return jsonify({'code': 'token_invalid_signature', 'description': 'Token signature is invalid'}), 401

    #g.current_user = user = payload
    return f(*args, **kwargs)

  return decorated

###
# Routing for your application.
###

@app.route("/api/register", methods=["POST"])
def register():
    myform = RegistrationForm()
    if request.method == 'POST' and myform.validate_on_submit():
        # Get file data and save to your uploads folder
        username = myform.Username.data
        password = myform.Password.data
        name = myform.Name.data
        email = myform.Email.data
        loc = myform.Location.data
        bio = myform.Biography.data
        photo = myform.photo.data
        date_joined = date.today()

        if not checkLen(bio):
            info = {"message": "Max Bio: 500 characters"}
            return  jsonify(error=info)

        num = Users.query.filter_by(username = username).all()
        l = len(num)
        if l > 0:
            info = {
            "message": "Username already taken: " +username
            }
            return  jsonify(error=info)


        filefolder = app.config['UPLOAD_FOLDER']
        filename = secure_filename(photo.filename)

        #username, password, name, email, loca, bio, url, date
        user = Users (username, password, name, email, loc, bio, filename, date_joined)
        db.session.add(user)
        db.session.commit()

        photo.save(os.path.join(filefolder,filename))

        info = {
            "id": user.id,
            "username": user.username,
            "name": user.name,
            "photo": user.photo,
            "email": user.email,
            "location": user.location,
            "biography": user.biography,
            "date_joined": user.date_joined
            }

        return  jsonify(info=info)

    error = form_errors(myform)
    return jsonify(error= error)


@app.route('/api/cars', methods=['POST', 'GET'])
@login_required
@requires_auth
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
            uid = myform.User.data
            photo = myform.photo.data

            #validate Price and Description
            if not checkPrice(Price):
                info = {"message": "Invalid Price"}
                return  jsonify(error=info)

            if not checkLen(Descrip):
                info = {"message": "Max Description: 500 characters"}
                return  jsonify(error=info)
            
            filefolder = app.config['UPLOAD_FOLDER']
            filename = secure_filename(photo.filename)

            #descrip, make, model, col, year, tran, type1, price, url, uid
            car = Cars (Descrip, Make, Model, Colour, Year, Tran, Type, Price, filename, uid)
            db.session.add(car)
            db.session.commit()

            #rootdir = os.getcwd()
            photo.save(os.path.join(filefolder,filename))

            car = {
                'description': car.description,
                'year': car.year, 
                'make': car.make, 
                'model': car.model, 
                'colour': car.colour,
                'transmission': car.transmission,
                'type': car.price,
                'price': car.price, 
                'photo': url_for('get_image', filename="" + car.photo),
                'user_id': car.user_id
            }

            return  jsonify(car=car)
        error = form_errors(myform)
        return jsonify(error= error)

    if request.method == 'GET':
        carsResult = db.session.query(Cars).all()
        cars = []
        for c in carsResult:
            car = {
                "id": c.id,
                "description": c.description,
                "year": c.year,
                "make": c.make,
                "model": c.model,
                "colour": c.colour,
                "transmission": c.transmission,
                "car_type": c.car_type,
                "price": c.price,
                "photo": url_for('get_image', filename="" + c.photo),
                "user_id": current_user.id
            }
            cars.append(car)
        
        return  jsonify(cars=cars)
    error = form_errors(myform)
    return jsonify(error= error)


@app.route("/api/cars/<car_id>", methods=["GET"])
@login_required
@requires_auth
def car(car_id):
    if request.method == 'GET':
        c = Cars.query.get(car_id)
        car = {
            "id": c.id,
            "description": c.description,
            "year": c.year,
            "make": c.make,
            "model": c.model,
            "colour": c.colour,
            "transmission": c.transmission,
            "car_type": c.car_type,
            "price": c.price,
            "photo": url_for('get_image', filename="" + c.photo),
            "user_id": c.user_id
        }

        return  jsonify(car=car)
    error = form_errors(myform)
    return jsonify(error= error)


@app.route("/api/cars/<car_id>/favourite", methods=["POST"])
@login_required
@requires_auth
def carFav(car_id):
    if request.method == 'POST':
        num = Favourites.query.filter_by(car_id = car_id).filter_by(user_id = current_user.id).all()
        l = len(num)
        if l > 0:
            info = {
            "message": "Car Already Favourited",
            "car_id": car_id
            }
            return  jsonify(info=info)
        fav = Favourites(car_id, current_user.id)
        db.session.add(fav)
        db.session.commit()
        info = {
            "message": "Car Successfully Favourited",
            "car_id": fav.car_id
        }
        return  jsonify(info=info)
    info = {"message": "Car Failed to be Favourited" }
    return  jsonify(info=info)


@app.route("/api/search", methods=["GET"])
@login_required
@requires_auth
def search():
    myform = SearchForm()
    if request.method == 'GET':
        smodel = request.args.get('model')
        smake = request.args.get('make')

        smodel = "%{}%".format(smodel)
        smake = "%{}%".format(smake)
        
        results = Cars.query.filter(Cars.model.ilike(smodel), Cars.make.ilike(smake)).all()
        cars = []
        for c in results:
            car = {
                "id": c.id,
                "description": c.description,
                "year": c.year,
                "make": c.make,
                "model": c.model,
                "colour": c.colour,
                "transmission": c.transmission,
                "car_type": c.car_type,
                "price": c.price,
                "photo": url_for('get_image', filename="" + c.photo),
                "user_id": c.user_id
            }
            cars.append(car)

        return  jsonify(cars=cars)
    error = form_errors(myform)
    return jsonify(error= error)


@app.route("/api/users/<user_id>", methods=["GET"])
@login_required
@requires_auth
def users(user_id):
    userq = Users.query.get(int(user_id))
    user = {
        "id": userq.id,
        "username": userq.username,
        "name": userq.name,
        "photo": url_for('get_image', filename="" + userq.photo),
        "email": userq.email,
        "location": userq.location,
        "biography": userq.biography,
        "date_joined": userq.date_joined
    }
    return  jsonify(user=user)


@app.route("/api/users/<user_id>/favourites", methods=["GET"])
@login_required
@requires_auth
def userFav(user_id):
    results = Favourites.query.filter_by(user_id = user_id).all()
    cars = []
    for r in results:
        
        c = Cars.query.get(r.car_id)
        car = {
            "id": c.id,
            "description": c.description,
            "year": c.year,
            "make": c.make,
            "model": c.model,
            "colour": c.colour,
            "transmission": c.transmission,
            "car_type": c.car_type,
            "price": c.price,
            "photo": url_for('get_image', filename="" + c.photo),
            "user_id": c.user_id
        }
        cars.append(car)

    return  jsonify(cars=cars)


@app.route("/api/auth/login", methods=["POST"])
def login():
    myform = LoginForm()
    if request.method == "POST":
        # change this to actually validate the entire form submission
        # and not just one field
        #if form.username.data:
        if myform.validate_on_submit():
            usern = myform.Username.data
            passw = myform.Password.data

            user = Users.query.filter_by(username= usern)

            # Get the username and password values from the form.
            user = Users.query.filter_by(username= usern).first()
            # using your model, query database for a user based on the username
            # and password submitted. Remember you need to compare the password hash.
            # You will need to import the appropriate function to do so.
            # Then store the result of that query to a `user` variable so it can be
            # passed to the login_user() method below.
            
            if user and check_password_hash(user.password, passw):
                # get user id, load into session
                login_user(user)
                
                secret = app.config['SECRET_KEY']
                payload = {'id': user.id, 'name': user.name}
                encoded_jwt = jwt.encode(payload, secret, algorithm='HS256')
                
                info = {
                    "message": "Login Successful",
                    "token": encoded_jwt.decode('UTF-8')
                 }

                # remember to flash a message to the user
                #flash('Logged in successfully.', 'success')
                #return redirect(url_for("secure_page"))  # they should be redirected to a secure-page route instead
                return  jsonify(info=info)
            info = {"message": "Invalid Username/ Password"}
            return  jsonify(error=info)
    #return render_template("login.html", form=form)
    error = form_errors(myform)
    return jsonify(error= error)


@app.route("/api/auth/logout")
@login_required
@requires_auth
def logout():
    # Logout the user and end the session
    logout_user()
    info = [{"message": "You were sucessfully logged out"}]
    return  jsonify(info=info)
    #return redirect(url_for('index'))

@app.route('/images/<filename>')
def get_image(filename):
    rootdir = os.getcwd()
    return send_from_directory(os.path.join(rootdir, app.config['UPLOAD_FOLDER']), filename)

@app.route('/icon/<filename>')
def get_icon(filename):
    rootdir = os.getcwd()
    return send_from_directory(os.path.join(rootdir, app.config['ICON_FOLDER']), filename)

def checkPrice(P):
    P = P.replace(',', '')
    status = True
    try:
        float(P)
        status = True
    except:
        status = False
    return status

def checkLen(s):
    if len(s)>=500:
        return False
    else:
        return True

# user_loader callback. This callback is used to reload the user object from
# the user ID stored in the session
@login_manager.user_loader
def load_user(id):
    return Users.query.get(int(id))


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
