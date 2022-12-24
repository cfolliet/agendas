

function Agendas() {
    let meetings = [];

    function addMeeting(m) {
        meetings.push(m)
    }

    function toString() {
        meetings.sort((a, b) => a.start - b.start).sort((a, b) => a.day - b.day).forEach(m => {
            m.toString()
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

    function getRandomTime() {
        return Math.floor((Math.random() * 96)) * 15; // 96*15min in a day
    }

    function getRandomDay() {
        return Math.floor((Math.random() * 3)) // 3 days workweek
    }

    return {
        getTime,
        setTime,
        getRandomDuration,
        getRandomTime,
        getRandomDay
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

    function toString() {
        console.log(name, day, utils().getTime(start), '-', utils().getTime(end), guests)
    }

    return { name, guests, day, start, end, duration, toString }
}

function defineNeeds() {
    let n = [
        ['1:1 theo', ['clement', 'theo'], 29],
        ['1:1 maxime', ['clement', 'maxime'], 29],
        ['squad meeting', ['clement', 'theo', 'maxime'], 59],
        ['EM chapter', ['clement', 'virgile'], 44]
    ]

    let wttjTeam = ['clement', 'clem', 'robert', 'theo', 'diane', 'victoire', 'pierre', 'maxime', 'arthur', 'aurele']
    let wkteam = ['clement', 'yann', 'sebastien', 'sylvain', 'guillaume', 'mathys', 'isaac', 'jero']
    let n2 = [
        ['Clem Devs', ['clement', 'clem', 'robert', 'theo', 'diane', 'victoire', 'pierre', 'maxime', 'yann', 'sebastien', 'sylvain', 'guillaume', 'mathys', 'isaac'], 29],
        ['EM Weekly', ['clement', 'virgile', 'florian'], 44],
        ['1:1 clem', ['clement', 'clem'], 29],
        ['Daily WTTJ', wttjTeam, 14], //todo x3
        ['Daily WK', wkteam, 14], //todo x3
        ['1:1 seb', ['clement', 'sebastien'], 29],
        ['1:1 gui', ['clement', 'guillaume'], 29],
        ['1:1 diane', ['clement', 'diane'], 29],
        ['1:1 sylvain', ['clement', 'sylvain'], 29],
        ['Squad Workshop', wttjTeam, 59],
        ['WTTJ replenishment', wttjTeam, 29],
        ['EM Chapter', ['clement', 'florian', 'virgile', 'kleroy'], 59],
        ['1:1 Maxime', ['clement', 'maxime'], 29],
        ['1:1 theo', ['clement', 'theo'], 29],
        ['Monthly stagiaire', ['victoire', 'mathys', 'pierre', 'isaac'], 29],
        ['Tech manager bimonthly', ['kleroy', 'florian', 'virgile', 'clement'], 89],
        ['Weekly WK', wkteam, 89],
        ['weekly jero', ['clement', 'jero'], 29],
        ['weekly aurele', ['clement', 'aurele', 'arthur'], 29],
        ['1:1 kleroy', ['clement', 'kleroy'], 29],
        ['Weekly aurelie', ['clement', 'aurelie'], 29],
        ['Eng leader', ['clement', 'florian', 'virgile', 'kleroy', 'stephane', 'klacointe', 'david', 'robert', 'pix'], 45],
        ['1:1 yann', ['clement', 'yann'], 29],
        ['1:1 robert', ['clement', 'robert'], 29]
    ]

    return n2;
}

function Generator() {

    function generateRandom(needs) {
        let a = Agendas()
        needs.forEach(n => {
            let m = Meeting(n[0], n[1], utils().getRandomDay(), utils().getRandomTime(), n[2])
            a.addMeeting(m)
        })
        return a
    }

    function fitnessFunction(agenda) {
        let score = 0

        agenda.meetings.forEach(m => {
            let startDay = 9 * 60 // 9h
            let endDay = 18 * 60 // 18h
            let isWorkingInWorkingHours = m.end <= endDay && startDay <= m.start
            if (isWorkingInWorkingHours) {
                agenda.meetings.forEach(m2 => {
                    let isSameMeeting = m == m2
                    if (!isSameMeeting) {
                        let isSameTime = m.day == m2.day && (m.start <= m2.end && m2.start <= m.end)
                        let sameGuests = m.guests.filter(g => m2.guests.includes(g)).length;
                        if (!isSameTime || !sameGuests) {
                            score++
                        }
                    }
                })
            }

        })

        return score
    }

    return {
        generateRandom,
        fitnessFunction
    }
}

function Tests() {

    function addMeeting() {
        let a = Agendas()
        a.addMeeting(null)
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

    function fitnessFunction() {
        let a = Agendas()
        let m = Meeting("a", ['a', 'b'], 0, 540, 59)
        let m2 = Meeting("b", ['c', 'd'], 0, 600, 59)
        let m3 = Meeting("c", ['a', 'd'], 0, 660, 59)
        let m4 = Meeting("d", ['a', 'b'], 1, 540, 59)

        let m5 = Meeting("e", ['a', 'e'], 0, 540, 59)
        let m6 = Meeting("f", ['c', 'f'], 0, 630, 59)
        a.addMeeting(m)
        a.addMeeting(m2)
        if (2 != Generator().fitnessFunction(a)) throw 'fitnessFunction' // 2*2-2
        a.addMeeting(m3)
        if (6 != Generator().fitnessFunction(a)) throw 'fitnessFunction' // 3*3-3
        a.addMeeting(m4)
        if (12 != Generator().fitnessFunction(a)) throw 'fitnessFunction' // 4*4-4
        a.addMeeting(m5)
        if (18 != Generator().fitnessFunction(a)) throw 'fitnessFunction' //5*5-5-2
        a.addMeeting(m6)
        if (26 != Generator().fitnessFunction(a)) throw 'fitnessFunction' //6*6-6-2-2 = nbevent*nbevent-nbevent-2eventinsametime-2othereventinsametime
        
        // todo need to add test with meeting out of hours

    }

    function run() {
        addMeeting(null)
        getTime()
        setTime()
        fitnessFunction()
        console.log('all good')
    }

    return {
        run
    }

}


Tests().run()
let g = Generator()
let a = g.generateRandom(defineNeeds())
a.toString()
//console.log('best score with 24m', 24 * 24 - 24)
//console.log(g.fitnessFunction(a))