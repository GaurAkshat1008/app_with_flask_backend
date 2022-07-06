from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

engine = create_engine('sqlite:///user.db', echo=True, connect_args={'check_same_thread': False})
Base = declarative_base()
Session = sessionmaker(bind=engine)
session = Session()


class User(Base):
  __tablename__ = 'users'
  id = Column(Integer, primary_key=True, autoincrement=True)
  name = Column(String(30), nullable=False)
  email = Column(String(50), unique=True, nullable=False)
  password = Column(String, nullable=False)
  def __init__(self, name, email, password):
    self.name = name
    self.email = email
    self.password = password
  def __repr__(self):
    return '<User %r>' % (self.name)

Base.metadata.create_all(engine)
