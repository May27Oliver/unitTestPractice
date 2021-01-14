fs = require('fs');

//處理方向
//1.全域變數是否能收攏進物件內？
//2.是否能將每個函式再進行顆粒化？
//3.是否能讓函式內的私有變數讓其他函式調用？
// songs

function Nb(){//重構第一步：先將全域變數收攏到物件內
    this.imagine = ['c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7'],
    this.somewhere_over_the_rainbow  = ['c', 'em', 'f', 'g', 'am'],
    this.tooManyCooks  = ['c', 'g', 'f'],
    this.iWillFollowYouIntoTheDark  = ['f', 'dm', 'bb', 'c', 'a', 'bbm'],
    this.babyOneMoreTime  = ['cm', 'g', 'bb', 'eb', 'fm', 'ab'],
    this.creep  = ['g', 'gsus4', 'b', 'bsus4', 'c', 'cmsus4', 'cm6'],
    this.army  = ['ab', 'ebm7', 'dbadd9', 'fm7', 'bbm', 'abmaj7', 'ebm'],
    this.paperBag  = ['bm7', 'e', 'c', 'g', 'b7', 'f', 'em', 'a', 'cmaj7',
        'em7', 'a7', 'f7', 'b'
    ],
    this.toxic  = ['cm', 'eb', 'g', 'cdim', 'eb7', 'd7', 'db7', 'ab', 'gmaj7',
        'g7'
    ],
    this.bulletproof  = ['d#m', 'g#', 'b', 'f#', 'g#m', 'c#'],
    this.song_11  = [],
    this.songs  = [],
    this.labels  = [],
    this.allChords  = [],
    this.labelCounts  = [], 
    this.labelProbabilities  = [],
    this.chordCountsInLabels  = {},  
    this.probabilityOfChordsInLabels  = {},
    this.train =(chords, label)=>{
        console.log('this',this);
        this.songs.push([label, chords]);
        this.labels.push(label);
        for (var i = 0; i < chords.length; i++) {
            if (!this.allChords.includes(chords[i])) {
                this.allChords.push(chords[i]);
            }
        }
        if (!!(Object.keys(this.labelCounts).includes(label))) {
            this.labelCounts[label] = this.labelCounts[label] + 1;
        } else {
            this.labelCounts[label] = 1;
        }
    }
}

const nb = new Nb();
nb.train(nb.imagine, 'easy');
console.log('nb.songs',nb.songs)

imagine = ['c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7'];
somewhere_over_the_rainbow = ['c', 'em', 'f', 'g', 'am'];
tooManyCooks = ['c', 'g', 'f'];
iWillFollowYouIntoTheDark = ['f', 'dm', 'bb', 'c', 'a', 'bbm'];
babyOneMoreTime = ['cm', 'g', 'bb', 'eb', 'fm', 'ab'];
creep = ['g', 'gsus4', 'b', 'bsus4', 'c', 'cmsus4', 'cm6'];
army = ['ab', 'ebm7', 'dbadd9', 'fm7', 'bbm', 'abmaj7', 'ebm'];
paperBag = ['bm7', 'e', 'c', 'g', 'b7', 'f', 'em', 'a', 'cmaj7',
    'em7', 'a7', 'f7', 'b'
];
toxic = ['cm', 'eb', 'g', 'cdim', 'eb7', 'd7', 'db7', 'ab', 'gmaj7',
    'g7'
];
bulletproof = ['d#m', 'g#', 'b', 'f#', 'g#m', 'c#'];
song_11 = [];
var songs = [];
var labels = [];
var allChords = [];
var labelCounts = [];
var labelProbabilities = [];
var chordCountsInLabels = {};  
var probabilityOfChordsInLabels = {};

// function train(chords, label) {
//     songs.push([label, chords]);
//     labels.push(label);
//     for (var i = 0; i < chords.length; i++) {
//         if (!allChords.includes(chords[i])) {
//             allChords.push(chords[i]);
//         }
//     }
//     if (!!(Object.keys(labelCounts).includes(label))) {
//         labelCounts[label] = labelCounts[label] + 1;
//     } else {
//         labelCounts[label] = 1;
//     }
// };
//train用到的function
const putInfoIntoArr = (arr,info) =>[...arr,info];
const putInfoIntoAllChords = (chords,allChords)=>{
    for (var i = 0; i < chords.length; i++) {
        if (!allChords.includes(chords[i])) {
            allChords = [...allChords, chords[i]];
        }
    }
    return allChords;
}
const dealLabelCounts =(arr,lab)=>{
    if (!!(Object.keys(arr).includes(lab))) {
        arr[lab] = arr[lab] + 1;
    } else {
        arr[lab] = 1;
    }
}

//getNumberOfSongs
function getNumberOfSongs() {
    return songs.length;
};

function setLabelProbabilities() {
    Object.keys(labelCounts).forEach(function (label) {
        var numberOfSongs = getNumberOfSongs();
        labelProbabilities[label] = labelCounts[label] / numberOfSongs;
    });
};

function setChordCountsInLabels() {
    songs.forEach(function (i) {
        if (chordCountsInLabels[i[0]] === undefined) {
            chordCountsInLabels[i[0]] = {};
        }
        i[1].forEach(function (j) {
            if (chordCountsInLabels[i[0]][j] > 0) {
                chordCountsInLabels[i[0]][j] =
                    chordCountsInLabels[i[0]][j] + 1;
            } else {
                chordCountsInLabels[i[0]][j] = 1;
            }
        });
    });
}

function setProbabilityOfChordsInLabels() {
    probabilityOfChordsInLabels = chordCountsInLabels;
    Object.keys(probabilityOfChordsInLabels).forEach(function (i) {
        Object.keys(probabilityOfChordsInLabels[i]).forEach(function (j) {
            probabilityOfChordsInLabels[i][j] = probabilityOfChordsInLabels[i][j] * 1.0 / songs.length;
        });
    });
}
// train(imagine, 'easy');
// train(somewhere_over_the_rainbow, 'easy');
// train(tooManyCooks, 'easy');
// train(iWillFollowYouIntoTheDark, 'medium');
// train(babyOneMoreTime, 'medium');
// train(creep, 'medium');
// train(paperBag, 'hard');
// train(toxic, 'hard');
// train(bulletproof, 'hard');
// setLabelProbabilities();
// setChordCountsInLabels();
// setProbabilityOfChordsInLabels();

function classify(chords) {
    var ttal = labelProbabilities;
    console.log(ttal);
    var classified = {};
    Object.keys(ttal).forEach(function (obj) {
        var first = labelProbabilities[obj] + 1.01;
        chords.forEach(function (chord) {
            var probabilityOfChordInLabel =
                probabilityOfChordsInLabels[obj][chord];
            if (probabilityOfChordInLabel === undefined) {
                first + 1.01;
            } else {
                first = first * (probabilityOfChordInLabel + 1.01);
            }
        });
        classified[obj] = first;
    });
    console.log(classified);
    return classified;//增加return
};
// classify(['d', 'g', 'e', 'dm']);
// classify(['f#m7', 'a', 'dadd9', 'dmaj7', 'bm', 'bm7', 'd', 'f#m']);

module.exports = {
    nb
};