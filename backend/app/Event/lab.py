import json

class Lab:
    weekdays = ['monday','tuesday','wednesday','thursday','friday']

    def __init__(self, json_info):
        self.name = "test"
        self.json = json_info

        self.lab_name = self.json["lab_name"]
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
        total_lab_time = 0
        if self.frequency[day]["class_enabled"] == True:
            date_lab_time = self.convert_time_to_int(self.frequency[day]["end-time"]) - self.convert_time_to_int(self.frequency[day]["start-time"])
            total_lab_time = total_lab_time + date_lab_time  
        return total_lab_time

    def get_total_time(self):
        total_lab_time = 0
        for day in Lab.weekdays:
            if self.frequency[day]["class_enabled"] == True:
                date_lab_time = self.convert_time_to_int(self.frequency[day]["end-time"]) - self.convert_time_to_int(self.frequency[day]["start-time"])
                total_lab_time = total_lab_time + date_lab_time  
        return total_lab_time        

    def get_name(self):
        return self.lab_name

    def get_location(self):
        return self.location["building"] + " - " + self.location["room"]

    def get_frequency(self):
        for day in Lab.weekdays:
            print(day)
            if self.frequency[day]["class_enabled"] == True:
                print(self.frequency[day])
