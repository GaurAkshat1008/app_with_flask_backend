from flask import Flask, request, jsonify
from db import User, session
from flask_cors import CORS, cross_origin
from flask_bcrypt import Bcrypt
app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

def checkInDb(username):
  user = session.query(User).filter(User.email == username).first()
  if user:
    return True
  else:
    return False

@app.route('/api/user/register', methods=['POST'])
@cross_origin()
def register():
  try: 
    name = request.json['name']
    email = request.json['email']
    password = request.json['password']
    if checkInDb(email):
      return jsonify('email', 'User already exists')
    else:
      user = User(name, email, bcrypt.generate_password_hash(password))
      session.add(user)
      session.commit()
      return 'User registered'
  except Exception as e:
    return str(e)

@app.route('/api/user/login', methods=['POST'])
@cross_origin()
def login():
  try:
    email = request.json['email']
    password = request.json['password']
    user = session.query(User).filter(User.email == email).first()
    if user:
      if bcrypt.check_password_hash(user.password, password):
        return jsonify('user','Login successful')
      else:
        return jsonify('password','Wrong password')
    else:
      return jsonify('email','User does not exist')
  except Exception as e:
    print(e)
    return ""


if __name__ == '__main__':
  app.run(debug=True)