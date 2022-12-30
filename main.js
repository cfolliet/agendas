function Agenda(_times) {
    const meetings = defineNeeds()
    const times = _times || [] // pair of {day, timeInMinutes} for each meeting

    function toString() {
        meetings.map((m, i) => {
            return { meeting: m, time: times[i] }
        })
            .sort((a, b) => a.time.time - b.time.time)
            .sort((a, b) => a.time.day - b.time.day)
            .map(m => {
                console.log(m.meeting.name, m.time.day, utils().getTime(m.time.time), '-', utils().getTime(m.time.time + m.meeting.duration), m.meeting.guests)
            })
    }

    return { meetings, times, toString }
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
        { name: 'Clem Devs', guests: ['clement', 'clem', 'robert', 'theo', 'diane', 'victoire', 'pierre', 'maxime', 'yann', 'sebastien', 'sylvain', 'guillaume', 'mathys', 'isaac'], duration: 29 },
        { name: 'EM Weekly', guests: ['clement', 'virgile', 'florian'], duration: 44 },
        { name: '1:1 clem', guests: ['clement', 'clem'], duration: 29 },
        { name: 'Daily WTTJ', guests: wttjTeam, duration: 14 }, //todo x3
        { name: 'Daily WK', guests: wkteam, duration: 14 }, //todo x3
        { name: '1:1 seb', guests: ['clement', 'sebastien'], duration: 29 },
        { name: '1:1 gui', guests: ['clement', 'guillaume'], duration: 29 },
        { name: '1:1 diane', guests: ['clement', 'diane'], duration: 29 },
        { name: '1:1 sylvain', guests: ['clement', 'sylvain'], duration: 29 },
        { name: 'Squad Workshop', guests: wttjTeam, duration: 59 },
        { name: 'WTTJ replenishment', guests: wttjTeam, duration: 29 },
        { name: 'EM Chapter', guests: ['clement', 'florian', 'virgile', 'kleroy'], duration: 59 },
        { name: '1:1 Maxime', guests: ['clement', 'maxime'], duration: 29 },
        { name: '1:1 theo', guests: ['clement', 'theo'], duration: 29 },
        { name: 'Monthly stagiaire', guests: ['victoire', 'mathys', 'pierre', 'isaac'], duration: 29 },
        { name: 'Tech manager bimonthly', guests: ['kleroy', 'florian', 'virgile', 'clement'], duration: 89 },
        { name: 'Weekly WK', guests: wkteam, duration: 89 },
        { name: 'weekly jero', guests: ['clement', 'jero'], duration: 29 },
        { name: 'weekly aurele', guests: ['clement', 'aurele', 'arthur'], duration: 29 },
        { name: '1:1 kleroy', guests: ['clement', 'kleroy'], duration: 29 },
        { name: 'Weekly aurelie', guests: ['clement', 'aurelie'], duration: 29 },
        { name: 'Eng leader', guests: ['clement', 'florian', 'virgile', 'kleroy', 'stephane', 'klacointe', 'david', 'robert', 'pix'], duration: 44 },
        { name: '1:1 yann', guests: ['clement', 'yann'], duration: 29 },
        { name: '1:1 robert', guests: ['clement', 'robert'], duration: 29 }
    ]

    return n2;
}

function getRandomAgendas(nb) {
    const agendas = []
    for (let index = 0; index < nb; index++) {
        const agenda = Agenda()
        agenda.meetings.forEach(() => {
            agenda.times.push({ day: utils().getRandomDay(), time: utils().getRandomTime() })
        })
        agendas.push(agenda)
    }
    return agendas
}

function fitness(agenda) {
    let score = 0

    agenda.meetings.forEach((m, i) => {
        let startDay = 9 * 60 // 9h
        let endDay = 18 * 60 // 18h
        const day = agenda.times[i].day
        const start = agenda.times[i].time
        const end = agenda.times[i].time + m.duration
        let isWorkingInWorkingHours = end <= endDay && startDay <= start
        if (isWorkingInWorkingHours) {
            agenda.meetings.forEach((m2, i2) => {
                let isSameMeeting = m == m2
                if (!isSameMeeting) {

                    const day2 = agenda.times[i2].day
                    const start2 = agenda.times[i2].time
                    const end2 = agenda.times[i2].time + m.duration

                    let isSameTime = day == day2 && (start <= end2 && start2 <= end)
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

import pkg from 'genalgo';
async function runGenetic() {

    const { GenAlgo, lesser, tournament3Single, tournament3Pair, fittestRandomPair } = pkg;

    // Create a GenAlgo object with simple parameters
    const algo = new GenAlgo({
        mutationProbability: 0.8,
        crossoverProbability: 0.2,
        iterationNumber: 1000,
        resultSize: 1
    });

    // Function used to mutate an individual
    const mutation = agenda => {
        let a = Agenda(agenda.times)

        a.times.forEach(t => {
            if (Math.random() > 0.5) {
                t.time = utils().getRandomTime()
            }
        })

        return a
    };

    // Function used to crossover two individuals
    const crossover = (agenda1, agenda2) => {
        let child1 = Agenda(agenda1.times)
        let child2 = Agenda(agenda2.times)

        for (let index = 0; index < agenda1.meetings.length; index++) {
            if (index % 0) {
                child1.times[index] = child2.times[index]
            } else {
                child2.times[index] = child1.times[index]
            }
        }

        return [child1, child2];
    };

    // Will be called at each iteration
    const iterationCallback = ({
        bestIndividual,
        elapsedTime,
        iterationNumber
    }) => {
        console.log("Iteration " + iterationNumber);
        console.log("Best fitness : " + bestIndividual.fitness);
        console.log("Elapsed time : " + elapsedTime);
        return true;
    };

    algo.setSeed(getRandomAgendas(300));

    algo.setFitnessEvaluator(fitness);

    algo.setMutationFunction(mutation);

    algo.setCrossoverFunction(crossover);

    algo.setSelectSingleFunction(tournament3Single);

    algo.setSelectPairFunction(fittestRandomPair);

    algo.setIterationCallback(iterationCallback);

    let result = await algo.start();
    result[0].entity.toString()
}

runGenetic()