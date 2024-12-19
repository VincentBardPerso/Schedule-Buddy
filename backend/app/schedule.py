import json
import io
import os
import sys
import yaml
import datetime
from math import ceil
import base64
import matplotlib.pyplot as plt
from namedlist import namedlist
from PIL import Image, ImageDraw
from ics import Calendar, Event
from app.Event.course import Course
from app.Event.lab import Lab
from app.Event.work import Work
from app.Event.calendar import CalendarEvent



class Schedule:
    weekdays = ['monday','tuesday','wednesday','thursday','friday']
    weekends = ['saturday','sunday']
    days = weekdays + weekends

    lunch_start = 1200
    lunch_end = 1300

    min_step = 30

    list_of_intervals = []

    Event = namedlist('Event', 'name, days, startH, startM, endH, endM, color')
    latest = 22
    earliest = 8

    def __init__(self, json_data):
        self.courses = []
        self.labs = []
        self.jobs = []

        self.want = []

        self.schedule = {}
        self.hours_used = {}

        self.start_time = json_data['want']['options']['waketime']
        self.end_time = json_data['want']['options']['sleeptime']

        print(self.start_time, self.end_time)

        number = self.start_time
        Schedule.list_of_intervals = []

        while(number != self.end_time):
            Schedule.list_of_intervals.append(number)
            number = self.add_half_hour(number)

        print(Schedule.list_of_intervals)

        for day in Schedule.days:
            self.schedule[day] = []
            self.hours_used[day] = 0

        for obj in json_data["want"]["courses"]:
            self.want.append(obj)    

        for obj in json_data["have"]["courses"]:
            self.courses.append(Course(obj))

        for obj in json_data["have"]["labs"]:
            self.labs.append(Lab(obj))

        for obj in json_data["have"]["work"]:
            self.jobs.append(Work(obj)) 

    def add_courses(self):
        for course in self.courses:
            # print(course.get_name())
            for day in Schedule.weekdays:
                if (course.frequency[day]["class_enabled"] == True):
                    start = course.frequency[day]["start-time"]
                    end = course.frequency[day]["end-time"]
                    event = CalendarEvent(course.get_name(), course.__class__.__name__, start, end, course.get_location(), course.get_colour())

                    if (not (self.find_collision(day, start, end))):
                        self.hours_used[day] = self.hours_used[day] + course.get_time_per_day(day)
                        self.schedule[day].append(event)
                    else:
                        print("Coliding Elements")
                    # print(day + " " + str(self.hours_used[day]))

    def add_labs(self):
        for lab in self.labs:
            # print(lab.get_name())
            for day in Schedule.weekdays:
                if (lab.frequency[day]["class_enabled"] == True):
                    start = lab.frequency[day]["start-time"]
                    end = lab.frequency[day]["end-time"]
                    event = CalendarEvent(lab.get_name(), lab.__class__.__name__, start, end, lab.get_location(), lab.get_colour())

                    if (not (self.find_collision(day, start, end))):
                        self.schedule[day].append(event)
                        self.hours_used[day] = self.hours_used[day] + lab.get_time_per_day(day)
                    # else:
                    #     print("Coliding Elements")
                    # print(day + " " + str(self.hours_used[day]))

    def add_work(self):
        for job in self.jobs:
            # print(lab.get_name())
            for day in Schedule.days:
                if (job.frequency[day]["am_working"] == True):
                    start = job.frequency[day]["start-time"]
                    end = job.frequency[day]["end-time"]
                    event = CalendarEvent(job.get_name(), job.__class__.__name__, start, end, job.get_location(), job.get_colour())

                    if (not (self.find_collision(day, start, end))):
                        self.schedule[day].append(event)
                        self.hours_used[day] = self.hours_used[day] + job.get_time_per_day(day)
                    else:
                        print("Coliding Elements")
                    # print(day + " " + str(self.hours_used[day]))            
                
    def find_collision(self, day, start, end):
        does_collide = False
        for event in self.schedule[day]:
            if start in range(event.start, event.end):
                does_collide = True
            if end in range(event.start, event.end):
                does_collide = True      

        return does_collide

    def add_half_hour(self, number):
        hrs = (number//100)
        mins = number%100/60

        if (mins == 0.5):
            return (hrs+1) * 100
        else:
            return hrs * 100 + 30

    def add_event_interval(self, item):
        for day in Schedule.days:
                for interval in Schedule.list_of_intervals:
                    event_start = interval
                    event_stop = self.add_half_hour(event_start)

                    event = CalendarEvent(item["course_name"], "Study", event_start, event_stop, "", item["colour"])

                    if (not (self.find_collision(day, event_start, event_stop))):
                        self.schedule[day].append(event)
                        self.hours_used[day] = self.hours_used[day] + 0.5
                        return
    def autotime(self, name):
        #returns number of slots of 30 mins
        #Hard Coded for demo
        if name.upper() == "EED5120":
            return 12
        if name.upper() == "ELG5301":
            return 6
        if name.upper() == "ELG5124":
            return 8    

        number = ''.join(x for x in name if x.isdigit())
        coursecode = ''.join(x for x in name if x.isalpha())

        if len(number) == 0 or len(coursecode) == 0:
            return 6
        else:
            number = int(number)
            if number > 4999:
                return 10
            if number > 3999:
                return 9
            if number > 2999:
                return 8
            if number > 1999:
                return 7  

        return 6

    def add_events(self):
        for item in self.want:
            
            if self.want[0].get("automatictime") == True:
                number_of_slots = self.autotime(self.want[0].get("course_name"))
            else:
                number_of_slots = int(item["estimated_time_needed"] * 2) 
            print(number_of_slots)

            for _i in range(number_of_slots):
                self.add_event_interval(item)

        return 0


    def sort(self):
        for day in Schedule.days:
            self.schedule[day].sort(key=lambda x: x.start, reverse=False)
            

    def print(self):
        for day in Schedule.days:
            print(day)
            for event in self.schedule[day]:
                print(event)


    def combine(self):
        for day in Schedule.days:
            recheck = True
            while (recheck):
                recheck = False
                for event in self.schedule[day]:
                    if recheck == False:
                        if self.schedule[day].index(event) != (len(self.schedule[day]) -1):
                            next_event = self.schedule[day][self.schedule[day].index(event) + 1]
                            
                            if event.name == next_event.name and event.type == next_event.type and event.end == next_event.start:
                                self.schedule[day][self.schedule[day].index(event)].end = self.schedule[day][self.schedule[day].index(next_event)].end
                                self.schedule[day].remove(self.schedule[day][self.schedule[day].index(next_event)])
                                recheck=True
                                
        return 0


    def create_ics(self):
        c = Calendar()
        term_start =  datetime.datetime(2023, 1, 9, 00, 00)
        term_end =  datetime.datetime(2023, 4, 13, 00, 00)

        curr_date = term_start

        while curr_date!=term_end:
            day_name = curr_date.strftime('%A').lower()

            for event in self.schedule[day_name]:
                start_hour = str(event.start//100).zfill(2)
                start_min = str(event.start%100).zfill(2)

                end_hour = str(event.end//100).zfill(2)
                end_min = str(event.end%100).zfill(2)

                date_format = curr_date.strftime("%Y-%m-%d")

                e = Event()
                e.name = event.name + " " + event.type
                e.begin = str(date_format)+" "+start_hour+":"+start_min+":00"
                e.end = str(date_format)+" "+end_hour+":"+end_min+":00"
                c.events.add(e)

            curr_date = curr_date + datetime.timedelta(days=1)
        return c.serialize()
        
    def getDay(self,prefix):
        for d in Schedule.days:
            if d.startswith(prefix):
                return d
        raise UserWarning("Invalid day: {0}".format(prefix))
    
    def create_img(self):
        fig = plt.figure(figsize=(18, 9))
        output = io.BytesIO()
        plt.title('Weekly Schedule', y=1, fontsize=14)
        ax=fig.add_subplot(1, 1, 1)
        ax.set_xlim(0.5, len(Schedule.days) + 0.5)
        ax.set_xticks(range(1, len(Schedule.days) + 1))
        ax.set_xticklabels(Schedule.days)
        ax.set_ylim(self.end_time/100, self.start_time/100)
        ax.set_yticks(range(ceil(self.start_time/100), ceil(self.end_time/100)))
        ax.set_yticklabels(["{0}:00".format(h) for h in range(ceil(self.start_time/100), ceil(self.end_time/100))])
        ax.grid(axis='y', linestyle='--', linewidth=0.5)
        ax.set(xlabel=None)


        for day in Schedule.days:
            for event in self.schedule[day]:
                e = Schedule.Event('', '', '', '', '', '', '')
                e.name = event.name + " " + event.type
                e.days = [self.getDay(day)]
            
                start_hour = str(event.start//100).zfill(2)
                start_min = str(event.start%100).zfill(2)
                end_hour = str(event.end//100).zfill(2)
                end_min = str(event.end%100).zfill(2)
                e.startH = int(start_hour)
                e.startM = int(start_min)
                e.endH = int(end_hour)
                e.endM = int(end_min)
                e.color = "skyblue"
                
                for day in e.days:
                    d = Schedule.days.index(day) + 0.52
                    start = float(e.startH) + float(e.startM) / 60
                    end = float(e.endH) + float(e.endM) / 60
                    plt.fill_between([d, d + 0.96], [start, start], [end, end], color=event.colour)
                    plt.text(d + 0.02, start + 0.02, '{0}:{1:0>2}'.format(e.startH, e.startM), va='top', fontsize=8)
                    plt.text(d + 0.48, (start + end) * 0.502, e.name, ha='center', va='center', fontsize=10)

        plt.savefig(output, dpi=200, format='JPEG',bbox_inches='tight')
        plt.savefig("test.jpeg", dpi=200, format='JPEG',bbox_inches='tight')

        with open("test.jpeg", "rb") as img_file:
            my_string = base64.b64encode(img_file.read())
        return my_string                        

