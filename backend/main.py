# from urllib import response
from fastapi import FastAPI, Depends, status, HTTPException, Query, Response,Query
from fastapi.middleware.cors import CORSMiddleware
# from sqlalchemy.orm import Session
# from models import Department ,Teacher,Student,Subject,SubjectTeacher
# from db import SessionLocal, engine
# import schemas,models


from routers import department, teacher, student, subject,sub_teacher,slot,comp,authentication,attendance

app = FastAPI()

# ==========================
# CORS setup
# ==========================
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Content-Range"]  # important
)


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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)