export const sampleGames = [
    {
        _id: '1',
        title: 'JW',
        description: 'Este es un pasapalabra que incluye conceptos teocráticos y de la biblia.',
        owner: {
            _id: '1',
            username: 'TextC0de'
        },
        contributors: [
            { _id: '2', username: 'profelester' },
            { _id: '3', username: 'jalyguzman' }
        ],
        tags: ['Biblia', 'Historia', 'Geografía'],
        likes: 0,
        timesPlayed: 0,
        minigames: {
            guessing: {
                topic: 'Lo/La conoces',
                answer: 'Jonás',
                hints: [
                    'Era un profeta',
                    'Fue tragado por un pez',
                    'Su oración traspasó carne, cielo y mar',
                    'Huyó de su asignación',
                    'Sintió pena por una calabaza vinatera'
                ]
            },
            hangman: {
                topic: 'Conoces estos lugares',
                words: ['Ninive', 'Babilonia', 'Belen', 'Jerusalen', 'Juda']
            },
            alphabet: {
                topic: 'Historia y geografia bíblica',
                letters: {
                    A: {
                        answer: 'Arándano',
                        definition: 'Fruta'
                    },
                    B: {
                        answer: 'Banana',
                        definition: 'Fruta'
                    }
                }
            }
        }
    },
    {
        _id: '2',
        title: 'JW #2',
        description: 'Este es un pasapalabra que incluye conceptos teocráticos y de la biblia.',
        owner: {
            _id: '2',
            username: 'profelester'
        },
        contributors: [{ _id: '2', username: 'profelester' }],
        tags: ['Biblia', 'Historia', 'Geografía'],
        likes: 0,
        timesPlayed: 0
    },
    {
        _id: '3',
        title: 'JW #3',
        description: 'Este es un pasapalabra que incluye conceptos teocráticos y de la biblia.',
        owner: {
            _id: '3',
            username: 'jalyguzman'
        },
        contributors: [],
        tags: ['Biblia', 'Historia', 'Geografía'],
        likes: 62,
        timesPlayed: 158
    }
];

export const sampleUsers = [
    {
        _id: '1',
        username: 'TextC0de'
    }
];
