

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

function Meeting(day, start, end, _gests) {
    let guests = _gests; // ['guest1', 'guests2', ...]
    let interval = [day, start, end]; // [day, start, end] == [0, 900, 1030] == monday from 9 to 10:30

    return { guests, interval }
}


function Tests() {

    function addMeeting() {
        let a = Agendas()
        a.addMeeting()
        if (a.meetings.length !== 1) throw 'addMeeting'
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
