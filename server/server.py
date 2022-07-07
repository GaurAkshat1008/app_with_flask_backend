from flask import Flask, request, jsonify, session
from flask_session import Session
from db import User, sess, Post
from flask_cors import CORS, cross_origin
from flask_bcrypt import Bcrypt
import redis

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)
app.secret_key = 'scasdcsadcscvsdfcv'
app.config['SESSION_COOKIE_NAME'] = 'qid'
app.config['SESSION_TYPE'] = 'redis'
app.config['PERMANENT_SESSION_LIFETIME'] = 60 * 60 * 24 * 365
app.config['SESSION_REDIS'] = redis.from_url('redis://localhost:6379')
Session(app)


def checkInDb(username):
    user = sess.query(User).filter(User.email == username).first()
    if user:
        return True
    else:
        return False


def me():
    return session['user']


def isAuthenticated():
    if 'user' in session:
        return True
    else:
        return False


@app.route('/api/user/register', methods=['POST'])
@cross_origin(supports_credentials=True)
def register():
    try:
        name = request.json['name']
        email = request.json['email']
        password = request.json['password']
        if checkInDb(email):
            return jsonify('email', 'User already exists')
        else:
            user = User(name=name, email=email,
                        password=bcrypt.generate_password_hash(password))
            sess.add(user)
            sess.commit()
            session['user'] = user.id
            return 'User registered'
    except Exception as e:
        print(e)
        return str(e)


@app.route('/api/user/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login():
    try:
        email = request.json['email']
        password = request.json['password']
        user = sess.query(User).filter(User.email == email).first()
        if user:
            if bcrypt.check_password_hash(user.password, password):
                session['user'] = user.id
                print(session['user'])
                print(me())
                return jsonify('user', 'Login successful')
            else:
                return jsonify('password', 'Wrong password')
        else:
            return jsonify('email', 'User does not exist')
    except Exception as e:
        print(e)


@app.route('/api/user/me', methods=['GET'])
@cross_origin(supports_credentials=True)
def getUser():
    try:
        if isAuthenticated():
            user = sess.query(User).filter(User.id == me()).first()
            print(session['user'])
            return jsonify(user.name, user.email)
        else:
            return jsonify('user', 'Not authenticated')
    except Exception as e:
        print("e"+str(e))
        return "Error"


@app.route('/api/user/logout', methods=['GET'])
@cross_origin(supports_credentials=True)
def logout():
    if isAuthenticated():
        session.pop('user', None)
        return jsonify('user', 'Logout successful')
    else:
        return jsonify('user', 'Not authenticated')


@app.route('/api/post/create', methods=['POST'])
@cross_origin(supports_credentials=True)
def createPost():
    try:
        title = request.json['title']
        content = request.json['content']
        user_id = me()
        post = Post(title=title, content=content, user_id=user_id)
        sess.add(post)
        sess.commit()
        return jsonify('post', 'Post created')
    except Exception as e:
        return str(e)


@app.route('/api/post/get', methods=['GET'])
@cross_origin(supports_credentials=True)
def getPosts():
    try:
        posts = sess.query(Post).all()
        all_posts = []
        for post in posts:
            all_posts.append((post.id, post.title, post.content,
                             post.author.name, post.created, post.updated))
        return jsonify(all_posts)
    except Exception as e:
        return str(e)


@app.route('/api/post/get/<int:post_id>', methods=['GET'])
@cross_origin(supports_credentials=True)
def getPost(post_id):
    try:
        if post_id != -1:
            post = sess.query(Post).filter(Post.id == post_id).first()
        if post:
            return jsonify(post.title, post.content, post.author.name, post.created, post.updated)
        else:
            return jsonify('post', 'Post does not exist')
    except Exception as e:
        return str(e)


@app.route('/api/post/get/me', methods=['GET'])
@cross_origin(supports_credentials=True)
def getMyPosts():
    try:
        user_id = me()
        posts = sess.query(Post).filter(Post.user_id == user_id).all()
        all_posts = []
        for post in posts:
            all_posts.append((post.id, post.title, post.content,
                             post.author.name, post.created, post.updated))
        return jsonify(all_posts)
    except Exception as e:
        return str(e)


@app.route('/api/post/update/<int:post_id>', methods=['POST'])
@cross_origin(supports_credentials=True)
def updatePost(post_id):
    try:
        title = request.json['title']
        content = request.json['content']
        post = sess.query(Post).filter(Post.id == post_id).first()
        if post:
            post.title = title
            post.content = content
            sess.commit()
            return jsonify('post', 'Post updated')
        else:
            return jsonify('post', 'Post does not exist')
    except Exception as e:
        return str(e)


@app.route('/api/post/delete/<int:post_id>', methods=['GET'])
@cross_origin(supports_credentials=True)
def deletePost(post_id):
    try:
        post = sess.query(Post).filter(Post.id == post_id).first()
        if post:
            sess.delete(post)
            sess.commit()
            return jsonify('post', 'Post deleted')
        else:
            return jsonify('post', 'Post does not exist')
    except Exception as e:
        return str(e)


if __name__ == '__main__':
    app.run(debug=True)
