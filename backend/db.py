# db.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Replace with your actual DB details
# DATABASE_URL = "mysql+pymysql://root:0070100@localhost:3306/test_db"
# DATABASE_URL = "mysql+pymysql://root:0070100@localhost:3306/attendance"
# DATABASE_URL ="mysql+pymysql://root:drIagipxGmNezAANGfJHBYSqIuKBPKKq@shuttle.proxy.rlwy.net:55161/railway"
DATABASE_URL= "mysql+pymysql://root:PlscfCucfsqZqKtZOxzNtzIpanACbDAY@hopper.proxy.rlwy.net:55427/railway"
engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
