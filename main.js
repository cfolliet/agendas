

function Agendas() {
    let meetings = [];

    function addMeeting(m) {
        meetings.push(m)
    }

    function toString() {
        meetings.forEach(m => {
            console.log(m.name, utils().getTime(m.start), '-', utils().getTime(m.end), m.guests)
        })
    }

    return {
        meetings,
        addMeeting,
        toString
    }
}

function utils() {
    function getTime(t) {
        let hours = Math.trunc(t / 60)
        let minutes = t % 60
        return hours.toString().padStart(2, 0) + ':' + minutes.toString().padStart(2, 0)
    }

    function setTime(t) {
        let raw = t.split(':')
        let hours = parseInt(raw[0])
        let minutes = parseInt(raw[1])
        return minutes + hours * 60
    }

    function getRandomDuration() {
        const durations = [30, 45, 60, 90, 120];
        const random = Math.floor(Math.random() * durations.length)
        return durations[random];
    }

    function getRandomTime(){
        return Math.floor((Math.random() * 96)) * 15; // 96*15min in a day
    }

    return {
        getTime,
        setTime,
        getRandomDuration,
        getRandomTime
    }
}

function Meeting(_name, _gests, _day, _start, _duration) {
    // duration in minutes
    let name = _name
    let guests = _gests; // ['guest1', 'guests2', ...]
    let day = _day
    let start = _start
    let end = _start + _duration
    let duration = _duration

    return { name, guests, day, start, end, duration }
}

function defineNeeds() {
    let n = [
        ['1:1 theo', ['clement', 'theo'], 30],
        ['1:1 maxime', ['clement', 'maxime'], 30],
        ['squad meeting', ['clement', 'theo', 'maxime'], 60],
        ['EM chapter', ['clement', 'virgile'], 45]
    ]

    return n;
}

function Generator() {

    function generateRandom(needs) {
        let a = Agendas()
        needs.forEach(n => {
            let m = Meeting(n[0], n[1], 0, utils().getRandomTime(), utils().getRandomDuration(), n[2])
            a.addMeeting(m)
        })
        return a
    }

    return {
        generateRandom
    }
}

function Tests() {

    function addMeeting() {
        let a = Agendas()
        a.addMeeting()
        if (a.meetings.length !== 1) throw 'addMeeting'
    }

    function setTime() {
        // get a time "9:30" or "14:15" and translate it into nb of minutes starting at "0:00"
        if (utils().setTime('00:30') != 30) throw 'setTime'
        if (utils().setTime('01:00') != 60) throw 'setTime'
        if (utils().setTime('02:00') != 120) throw 'setTime'
        if (utils().setTime('20:00') != 1200) throw 'setTime'
        if (utils().setTime('20:30') != 1230) throw 'setTime'
    }

    function getTime() {
        // nb of minutes starting at "0:00" translate it into a time like "9:30" or "14:15"
        if (utils().getTime(30) != '00:30') throw 'getTime'
        if (utils().getTime(60) != '01:00') throw 'getTime'
        if (utils().getTime(120) != '02:00') throw 'getTime'
        if (utils().getTime(1200) != '20:00') throw 'getTime'
        if (utils().getTime(1230) != '20:30') throw 'getTime'
    }

    function run() {
        addMeeting(null)
        getTime()
        setTime()
        console.log('all good')
    }

    return {
        run
    }

}


Tests().run()
Generator().generateRandom(defineNeeds()).toString()