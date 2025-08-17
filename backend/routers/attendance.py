from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from datetime import date as date_type
import models, schemas
from db import get_db


router  = APIRouter(
    prefix="/attendance",
    tags=["Attendance"]
)




@router.post("/", status_code=status.HTTP_201_CREATED)
def add_attendance(attn: schemas.Attendance , db: Session = Depends(get_db)):
    sub_tch = db.query(models.SubjectTeacher).filter(
        models.SubjectTeacher.Tid == attn.Tid,
        models.SubjectTeacher.Sub_id == attn.Sub_id  
    ).first()
    
    
    new_attn = models.Attendance(
        STid = sub_tch.STid, #type:ignore
        Sid = attn.Sid,
        date = attn.date,
        status = attn.status     
    )
    db.add(new_attn)
    db.commit()
    db.refresh(new_attn)
    
    return {
        "id" : new_attn.A_id,
        "date": new_attn.date,
        "status" :new_attn.status
    }
    


