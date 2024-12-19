from fastapi import FastAPI, Request
from fastapi.responses import ORJSONResponse
from fastapi.middleware.cors import CORSMiddleware

import json
from app.schedule import Schedule
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["POST", "GET"],
	allow_headers=["*"]
)

def time(input):
    mins = input%100
    hrs = (input//100)

    if (mins == 30 or mins == 0):
        return input
    if mins < 15:
        return hrs*100
    if mins > 30 and mins < 45:
        return hrs*100+30
    if mins > 45:
        hrs += 1
        mins = 0
        return hrs*100
    if mins < 30:
        return hrs*100+30


def convert(data):
    new_data = {}
    new_data["have"] = {}
    new_data["have"]["courses"] = []
    new_data["have"]["labs"] = []
    new_data["have"]["work"] = []

    new_data["want"] = {}
    
    # Courses
    courses = data.get("have").get("courses")
    count = 0

    for course in courses.get("course_name"):
        cstarttime = time(int(str(courses.get("time")[count][0]).replace(":", "")))
        cendtime = time(int(str(courses.get("time")[count][1]).replace(":", "")))
        course_obj = {}
        course_obj.update({"course_name": str(course)})
        course_obj.update({"colour": courses.get("colour")[count][0]})
        course_obj.update({"location": {
            "building": courses.get("location").get("building")[count],
            "room": courses.get("location").get("room")[count]
        }})
        course_obj.update({"frequency":
        {
            "monday":{
                "class_enabled": courses.get("frequency")[count][0],
                "start-time": cstarttime,
                "end-time": cendtime
            },
            "tuesday":{
                "class_enabled": courses.get("frequency")[count][1],
                "start-time": cstarttime,
                "end-time": cendtime
            },
            "wednesday":{
                "class_enabled": courses.get("frequency")[count][2],
                "start-time": cstarttime,
                "end-time": cendtime

               
            },
            "thursday":{
                "class_enabled": courses.get("frequency")[count][3],
                "start-time": cstarttime,
                "end-time": cendtime
            },
            "friday":{
                "class_enabled": courses.get("frequency")[count][4],
                "start-time": cstarttime,
                "end-time": cendtime
            }


        }})

        new_data["have"]["courses"].append(course_obj)
        count+=1


    # Labs
    labs = data.get("have").get("labs")
    count = 0

    for lab in labs.get("lab_name"):
        lstarttime = time(int(str(labs.get("time")[count][0]).replace(":", "")))
        lendtime = time(int(str(labs.get("time")[count][1]).replace(":", "")))
        lab_obj = {}
        lab_obj.update({"lab_name": str(lab)})
        lab_obj.update({"colour": labs.get("colour")[count][0]})
        lab_obj.update({"location": {
            "building": labs.get("location").get("building")[count],
            "room": labs.get("location").get("room")[count]
        }})
        lab_obj.update({"frequency":
        {
            "monday":{
                "class_enabled": labs.get("frequency")[count][0],
                "start-time": lstarttime,
                "end-time": lendtime
            },
            "tuesday":{
                "class_enabled": labs.get("frequency")[count][1],
                "start-time": lstarttime,
                "end-time": lendtime
            },
            "wednesday":{
                "class_enabled": labs.get("frequency")[count][2],
                "start-time": lstarttime,
                "end-time": lendtime
            },
            "thursday":{
                "class_enabled": labs.get("frequency")[count][3],
                "start-time": lstarttime,
                "end-time": lendtime
            },
            "friday":{
                "class_enabled": labs.get("frequency")[count][4],
                "start-time": lstarttime,
                "end-time": lendtime
            }


        }})

        new_data["have"]["labs"].append(lab_obj)
        count+=1


    # Work
    work = data.get("have").get("work")
    count = 0

    for job in work.get("job_position"):
        wstarttime = time(int(str(work.get("time")[count][0]).replace(":", "")))
        wendtime = time(int(str(work.get("time")[count][1]).replace(":", "")))
        work_obj = {}
        work_obj.update({"job_name": str(job)})
        work_obj.update({"colour": work.get("colour")[count][0]})
        work_obj.update({"location": str(work.get("location")[count])})
       
        work_obj.update({"frequency":
        {
            "monday":{
                "am_working": work.get("frequency")[count][0],
                "start-time": wstarttime,
                "end-time":  wendtime
            },
            "tuesday":{
                "am_working": work.get("frequency")[count][1],
                "start-time": wstarttime,
                "end-time":  wendtime
            },
            "wednesday":{
                "am_working": work.get("frequency")[count][2],
                "start-time": wstarttime,
                "end-time":  wendtime
            },
            "thursday":{
                "am_working": work.get("frequency")[count][3],
                "start-time": wstarttime,
                "end-time":  wendtime
            },
            "friday":{
                "am_working": work.get("frequency")[count][4],
                "start-time": wstarttime,
                "end-time":  wendtime
            },
            "saturday":{
                "am_working": work.get("frequency")[count][5],
                "start-time": wstarttime,
                "end-time":  wendtime
            },
            "sunday":{
                "am_working": work.get("frequency")[count][6],
                "start-time": wstarttime,
                "end-time":  wendtime
            }


        }})

        new_data["have"]["work"].append(work_obj)
        count+=1


    # want
    new_data["want"].update({"options":{
        "Max time per block": 30,
        "waketime": time(int(str(data.get("have").get("extras").get("waketime")[0][0]).replace(":", ""))),
        "sleeptime": time(int(str(data.get("have").get("extras").get("sleeptime")[0][0]).replace(":", ""))),
    }})

    new_data["want"]["courses"] = []



    count = 0
    for course in courses.get("course_name"):
        if courses.get("automated") is None:
            est_obj = {"course_name": str(course),"colour": courses.get("colour")[count][0],"estimated_time_needed": float(courses.get("estimated_time_needed")[count][0]),"automatictime":False}
        else:
            est_obj = {"course_name": str(course),"colour": courses.get("colour")[count][0],"estimated_time_needed": float(courses.get("estimated_time_needed")[count][0]),"automatictime":courses.get("automated")[count][0]}
        new_data["want"]["courses"].append(est_obj)
        count+=1
    
    print(new_data)    
    return new_data

@app.post("/api/generate-schedule/")
async def create_item(request: Request):
    data = await request.json()

    newdata = convert(data)
    
    s_1 = Schedule(newdata)
    s_1.add_courses()
    s_1.add_labs()
    s_1.add_work()
    s_1.add_events()

    s_1.sort()
    s_1.combine()
    # s_1.print()

    # Binary hex response of jpeg
    img = s_1.create_img()
    # print(img)
    
    ics = s_1.create_ics()
    
    # return 0

    return ORJSONResponse([{"weeklyschedule": (img.decode("utf-8")),
                            "icsfile": ics}])