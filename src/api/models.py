from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, func


from datetime import datetime, timedelta

db = SQLAlchemy()



class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False, default=True)
    first_name = db.Column(db.String(50), unique=False, nullable=True)
    last_name = db.Column(db.String(50), unique=False, nullable=True)
    date_of_birth = db.Column(db.Date(), unique=False, nullable=True)
    address = db.Column(db.String(120), unique=False, nullable=True)
    city = db.Column(db.String(80), unique=False, nullable=True)
    country = db.Column(db.String(80), unique=False, nullable=True)
    phone_number = db.Column(db.String(20), unique=False, nullable=True)
    avatar = db.Column(db.String(120), unique=False, nullable=True)

    def __init__(self, email, password, is_active=True, first_name=None, last_name=None, date_of_birth=None,
                 address=None, city=None, country=None, phone_number=None, avatar=None, **kwargs):
        self.email = email
        self.password = password
        self.is_active = is_active
        self.first_name = first_name
        self.last_name = last_name
        self.date_of_birth = date_of_birth
        self.address = address
        self.city = city
        self.country = country
        self.phone_number = phone_number
        self.avatar = avatar
        super(User, self).__init__(**kwargs)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "date_of_birth": self.date_of_birth.strftime('%Y-%m-%d') if self.date_of_birth else None,
            "address": self.address,
            "city": self.city,
            "country": self.country,
            "phone_number": self.phone_number,
            "avatar": self.avatar
        }

