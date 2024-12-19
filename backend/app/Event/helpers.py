class helper:
    def convert_time_to_int(time):
        hrs = (time//100)
        mins = time%100/60
        return hrs+mins