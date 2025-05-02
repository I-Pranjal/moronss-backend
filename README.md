# API Endpoints Documentation

## 1. Endpoint: `/api/users`
**Purpose:** Fetch all users.  
**Method:** GET  
**Expected Response Structure:**
```json
[
    {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@example.com"
    },
    ...
]
```
---

## 2. Endpoint: `/api/users`
**Purpose:** Create a new user.  
**Method:** POST  
**Data Format:**
```json
{
    "name": "John Doe",
    "email": "john.doe@example.com" , 
    "password" : "password"
}
```
**Expected Response Structure:**
```json
{
    "_id" : "a random  number" , 
    "name": "John Doe",
    "email": "john.doe@example.com"
}
```

---

## 3. Endpoint: `/api/forms/formone`
**Purpose:** Submit form one details   
**Method:** POST  
**Data Format:**
```json
{
    "name": "Pranjal Mishra",
    "mobileNo": "8858641124",
    "collegeName": "NIT Jamshedpur",
    "graduationYear": 2026,
    "randomInteger": 1746220172
}
```
**Expected Response Structure:**
```json
{
  "message": "Form One submitted successfully",
  "data": 1746220172
}
```

--- 
## 3. Endpoint: `/api/forms/formone`
**Purpose:** Submit form one details   
**Method:** POST  
**Data Format:**
```json
{
 "resumeURL" : "resumeURL is written here", 
 "whatsNotInResume" : "nothing" ,
 "whatDoYouWantToBe" : "SDE", 
 "approachTowardsIt" : "learning" , 
 "randomInteger" : "1746220172"
}
```
**Expected Response Structure:**
```json
{
  "message": "Form Two submitted successfully",
  "data": 1746220172
}
```

