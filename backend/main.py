# from urllib import response
from fastapi import FastAPI, Depends, status, HTTPException, Query, Response,Query
from fastapi.middleware.cors import CORSMiddleware
import os
# from sqlalchemy.orm import Session
# from models import Department ,Teacher,Student,Subject,SubjectTeacher
# from db import SessionLocal, engine
# import schemas,models


from routers import department, teacher, student, subject,sub_teacher,slot,comp,authentication,attendance,routine,notice
# from fastapi.staticfiles import StaticFiles
app = FastAPI()

# ==========================
# CORS setup
# ==========================
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://attendance-manage-rdyu.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Range"]  # important
)

# app.mount("/static", StaticFiles(directory="uploads"), name="static")
# ==========================
app.include_router(authentication.router)
app.include_router(comp.router)
app.include_router(department.router)
app.include_router(teacher.router)
app.include_router(student.router)
app.include_router(subject.router)
app.include_router(sub_teacher.router)
app.include_router(slot.router)
app.include_router(attendance.router)
app.include_router(routine.router)
app.include_router(notice.router)

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port)