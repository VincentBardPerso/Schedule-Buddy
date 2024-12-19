import json

class Work:
    weekdays = ['monday','tuesday','wednesday','thursday','friday']
    weekends = ['saturday','sunday']

    days = weekdays + weekends

    def __init__(self, json_info):
        self.name = "test"
        self.json = json_info

        self.job_name = self.json["job_name"]
        self.location = self.json["location"]
        self.frequency = self.json["frequency"]
        self.colour = self.json["colour"]

        self.total_time = self.get_total_time()

    def convert_time_to_int(self,time):
        hrs = (time//100)
        mins = time%100/60
        return hrs+mins

    def get_colour(self):
        return self.colour

    def get_time_per_day(self, day):
        total_work_time = 0
        if self.frequency[day]["am_working"] == True:
            date_work_time = self.convert_time_to_int(self.frequency[day]["end-time"]) - self.convert_time_to_int(self.frequency[day]["start-time"])
            total_work_time = total_work_time + date_work_time  
        return total_work_time    

    def get_total_time(self):
        total_work_time = 0
        for day in Work.days:
            if self.frequency[day]["am_working"] == True:
                date_work_time = self.convert_time_to_int(self.frequency[day]["end-time"]) - self.convert_time_to_int(self.frequency[day]["start-time"])
                total_work_time = total_work_time + date_work_time  
        return total_work_time        

    def get_name(self):
        return self.job_name

    def get_location(self):
        return self.location

    def get_frequency(self):
        for day in Work.weekdays:
            print(day)
            if self.frequency[day]["class_enabled"] == True:
                print(self.frequency[day])
