$(document).ready(function() {
    
    var schedule = new Schedule({
        days:[
        {
            date : 4,
            streams : [
            {
                time : "00:00:00 GMT",
                daw : "Live",
                genre : "Dubstep"
            },
            {
                time : "00:00:00 GMT",
                daw : "Cubase",
                genre : "Dubstep"
            },
            {
                time : "00:00:00 GMT",
                daw : "Reason",
                genre : "Dubstep"
            },
            {
                time : "00:00:00 GMT",
                daw : "Logic",
                genre : "Dubstep"
            },
            {
                time : "00:00:00 GMT",
                daw : "FLStudio",
                genre : "Dubstep"
            },
            ]
        }
        ]
    });
    initSchedule(schedule);
});

function initSchedule(schedule) {
    var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
    ]
    $("#calendarHeader").html(schedule.month+", "+schedule.year);
    for (var day in Array.range(0,6)) {
        $("#weekDay_"+day).html(days[day]);
    }
    var date = 1;
    day = schedule.startDay
    for (var week in Array.range(0,4)) {
        for (; day < 7 && date <= schedule.dayCount; ++day, ++date) {
            $("#week_"+week+"_day_"+day+" .calendarDayHeader").html(date);
        }
        day = 0;
    }
    var maxStreams = 5;
    for (day in schedule.days) {
        day = schedule.days[day];
        if (day.streams.length > maxStreams) {
            var streamSpill = $("#streamSpillTemplate").clone().removeAttr("id");
            var spillLink = $("#streamTemplate").clone();
            spillLink.addClass("spillLink");
            spillLink.hover(function(){
                $(this).find(".streamSpill").show();
            },
            function(){
                $(this).find(".streamSpill").hide();
            });
            spillLink.html("+"+(day.streams.length-maxStreams+1)+" more");
            spillLink.append(streamSpill);
            var addSpill = true;
        }
        for (var s = 0; s < day.streams.length; ++s) {
            var stream = day.streams[s];
            week = Math.floor((day.date + schedule.startDay - 1) / 7);
            var weekDay = (day.date + schedule.startDay - 1) % 7;
            var event = $("#streamTemplate").clone().removeAttr('id');
            event.html('<div class="icon'+stream.daw+'">&nbsp;</div>'+stream.genre);
            var calendarDay = $("#week_"+week+"_day_"+weekDay+" .calendarDayBody");
            if (day.streams.length <= maxStreams || s < maxStreams-1) {
                calendarDay.append(event);
            } else {
                if (addSpill) {
                    calendarDay.append(spillLink);
                    addSpill = false;
                    
                    console.log(spillLink);
                } 
                streamSpill.append(event);
            } 
        }
        
    }
}