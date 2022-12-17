

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
        ['squad meeting', ['clement', 'theo','maxime'], 60],
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

    function setTime (t) {
        // todo get a time "9:30" or "14:15" and translate it into nb of minutes starting at "0:00"
    }

    function getTime (t) {
        // todo nb of minutes starting at "0:00" translate it into a time like "9:30" or "14:15"
    }

    function run() {
        addMeeting(null)

        console.log('all good')
    }

    return {
        run
    }

}


Tests().run()
