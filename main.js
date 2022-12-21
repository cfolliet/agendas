

function Agendas() {
    let meetings = [];

    function addMeeting(m) {
        meetings.push(m)
    }

    return {
        meetings,
        addMeeting
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

    return {
        getTime,
        setTime
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
