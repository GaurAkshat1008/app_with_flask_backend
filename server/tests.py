from db import sess, User, Post

posts = sess.query(Post).all()
for post in posts:
    print(post.title, post.content, post.author.name)

# users = sess.query(User).all()
# for user in users:
#     print(user.name)