# create_tables.py
from db import engine, Base, SessionLocal
import models
from methods.hashing import Hash
import json


models.Base.metadata.create_all(bind=engine)


with open('pw.json', "r") as file:
    data = json.load(file)

admin_pw = data.get("admin_password")

                
def insert_defaults():
    db = SessionLocal()
    try:
        # 1️⃣ Create default department if not exists
        dept = db.query(models.Department).filter_by(dep="ADMIN").first()
        if not dept:
            dept = models.Department(dep="ADMIN", role="Admin")
            db.add(dept)
            db.commit()
            db.refresh(dept)
            print("✅ Default department created")
        
        # 2️⃣ Create default teacher if not exists
        dept = db.query(models.Department).filter(models.Department.role == "Admin").first()
        default_teacher = db.query(models.Teacher).filter_by(name="default", Did=dept.Did).first() # type: ignore
        if not default_teacher:
            
            teacher = models.Teacher(
                Did=dept.Did,  # type: ignore    # FK to ADMIN department
                name="default",
                name_code="default",
                email="admin@123",
                pw = Hash.bcrypt(admin_pw)  # 🔒 Use a hashed password in production
            )
            db.add(teacher)
            db.commit()
            print("✅ Default teacher created")
        else:
            print("ℹ Default teacher already exists")
    finally:
        db.close()

insert_defaults()