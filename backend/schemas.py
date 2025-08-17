# schemas.py

from pydantic import BaseModel,StrictStr, validator
from typing import List, Optional
from datetime import date,time

# ======================================
#       Database Schema
# ======================================

class Department(BaseModel):
    Did: Optional[int] = None
    dep: StrictStr
    role: StrictStr

    @validator('dep')
    def dep_must_be_alpha(cls, v):
        if not v.isalpha():
            raise ValueError('Department must contain only alphabetic characters')
        return v

    @validator('role')
    def role_must_be_alpha(cls, v):
        if not v.isalpha():
            raise ValueError('Role must contain only alphabetic characters')
        return v

    class Config:
        orm_mode = True

class Teacher(BaseModel):
    Tid: Optional[int]
    Did : Optional[int]
    name: str
    name_code : str
    email: str
    pw: Optional[str] = None
    role: Optional[str]   # user inputs role instead of Did

    class Config:
        orm_mode = True

class Student(BaseModel):
    Sid: Optional[int] 
    Did: Optional[int]
    dep: Optional[str] = None   # <-- FIXED: make optional so POST works
    name: str
    email: str
    pw: Optional[str] = None
    u_roll: str
    c_roll: Optional[str] = None
    year: int
    sem: int
    role :str

    class Config:
        orm_mode = True
      
class Subject(BaseModel):
    Sub_id: Optional[int]
    Did: Optional[int] = None       # <-- keep Did for POST
    dep: Optional[str] = None       # <-- dep optional for GET/display only
    sub_name: str
    sub_code: str
    year: int
    sem: int

    class Config:
        orm_mode = True

class SubjectTeacher(BaseModel):
    STid : Optional[int]
    Sub_id :Optional[int]
    Tid : Optional[int]
    
    sub_name :Optional[str]
    sub_code :Optional[str]
    dep :Optional[str]
    year :Optional[int]
    sem :Optional[int]
    name_code :Optional[str]
    name :Optional[str]
    subject: Optional[str] 
    teacher: Optional[str] 

    class Config :
        orm_mode =True
        
class Slot(BaseModel):
    Sl_id: Optional[int]
    start: time
    end: time
    day: str
    sl_name: str

    class Config:
        orm_mode = True


    #  


# ===============..... Done .....====================

class Attendance(BaseModel):
    Aid: Optional[int] = None
    Sub_id: Optional[int] = None
    Sid: Optional[int] = None
    Tid :int
    date: date
    status: str

    class Config:
        orm_mode = True
        

# class Routine(BaseModel):
#     r_id: Optional[int] = None
#     sl_id: int
#     d_id: int
#     t_id: int
#     item3: Optional[str] = None

#     class Config:
#         orm_mode = True



# ==============================================
#    Authentication
# ==============================================
        
class Login(BaseModel):
    username: str
    password: str

        
class TokenData(BaseModel):
    email: Optional[str] = None


class Token(BaseModel):
    access_token: str
    token_type: str
    
class ResetPwRequest(BaseModel):
    old_pw: str
    new_pw: str
# ===============..... Done .....====================



        










