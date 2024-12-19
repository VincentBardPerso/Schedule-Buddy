
class CalendarEvent:
    def __init__(self, name, type, start, end, location, colour):
        self.name = name
        self.type = type
        self.start = start
        self.end = end
        self.location = location
        self.colour = colour

    def __str__(self):
        return f"{self.name} - {self.type} \n {self.start} - {self.end}"    