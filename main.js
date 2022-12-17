

function agendas() {
    let meetings = [];

    function addMeeting() {
        meetings.push({})
    }

    return {
        meetings,
        addMeeting
    }
}


function tests() {

    function addMeeting() {
        let a = agendas()
        a.addMeeting()
        if (a.meetings.length !== 1) throw 'addMeeting'
    }

    function run() {
        addMeeting()

        console.log('all good')
    }

    return {
        run
    }

}


tests().run()
