from . import db
from werkzeug.security import generate_password_hash


class Users(db.Model):
    # You can use this to change the table name. The default convention is to use
    # the class name. In this case a class name of Users would create a
    # user_profile (singular) table, but if we specify __tablename__ we can change it
    # to `user_s` (plural) or some other name.
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    password = db.Column(db.String(255))
    name = db.Column(db.String(255))
    email = db.Column(db.String(255))
    location = db.Column(db.String(255))
    biography = db.Column(db.String(255))
    photo = db.Column(db.String(255))
    date_joined = db.Column(db.Date)
    
    def __init__(self, first_name, last_name, username, password):
        self.first_name = first_name
        self.last_name = last_name
        self.username = username
        self.password = generate_password_hash(password, method='pbkdf2:sha256')
        
    def __init__(self, username, password, name, email, loca, bio, url, date):
        self.first_name = first_name
        self.last_name = last_name
        self.username = username
        self.password = generate_password_hash(password, method='pbkdf2:sha256')
        self.name = name
        self.email = email
        self.location = loca
        self.biography = bio
        self.photo = url
        self.date_joined = date

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        try:
            return unicode(self.id)  # python 2 support
        except NameError:
            return str(self.id)  # python 3 support

    def __repr__(self):
        return '<User %r>' % (self.username)

class Cars(db.Model):

    __tablename__ = 'cars'

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(255))
    make = db.Column(db.String(80))
    model = db.Column(db.String(80))
    colour = db.Column(db.String(80))
    year = db.Column(db.String(80))
    transmission = db.Column(db.String(80))
    car_type = db.Column(db.String(80))
    price = db.Column(db.Float)
    photo = db.Column(db.String(80))
    user_id = db.Column(db.Integer)

    def __init__(self, descrip, make, model, col, year, tran, type1, price, url, uid):
        self.description = descrip
        self.make = make
        self.model = model
        self.colour = col
        self.year = year
        self.transmission = tran
        self.car_type = type1
        self.price = price
        self.photo = url
        self.user_id = uid

    def __repr__(self):
        return '<Car %r>' % (self.description)

class Favourites(db.Model):

    __tablename__ = 'favourites'

    id = db.Column(db.Integer, primary_key=True)
    car_id = db.Column(db.Integer)
    user_id = db.Column(db.Integer)
    
    def __init__(self, cid, uid):
        self.car_id = cid
        self.user_id = uid

    def __repr__(self):
        return '<Favourite %r>' % (self.id)