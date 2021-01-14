fs = require('fs');

//處理方向
//1.全域變數是否能收攏進物件內？
//2.是否能將每個函式再進行顆粒化？
//3.是否能讓函式內的私有變數讓其他函式調用？
// songs

function Nb(){//重構第一步：先將全域變數收攏到物件內
    this.imagine = ['c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7'];
    this.somewhere_over_the_rainbow  = ['c', 'em', 'f', 'g', 'am'];
    this.tooManyCooks  = ['c', 'g', 'f'];
    this.iWillFollowYouIntoTheDark  = ['f', 'dm', 'bb', 'c', 'a', 'bbm'];
    this.babyOneMoreTime  = ['cm', 'g', 'bb', 'eb', 'fm', 'ab'];
    this.creep  = ['g', 'gsus4', 'b', 'bsus4', 'c', 'cmsus4', 'cm6'];
    this.army  = ['ab', 'ebm7', 'dbadd9', 'fm7', 'bbm', 'abmaj7', 'ebm'];
    this.paperBag  = ['bm7', 'e', 'c', 'g', 'b7', 'f', 'em', 'a', 'cmaj7',
        'em7', 'a7', 'f7', 'b'
    ];
    this.toxic  = ['cm', 'eb', 'g', 'cdim', 'eb7', 'd7', 'db7', 'ab', 'gmaj7',
        'g7'
    ];
    this.bulletproof  = ['d#m', 'g#', 'b', 'f#', 'g#m', 'c#'],
    this.song_11  = [];
    this.songs  = [];
    this.labels  = [];
    this.allChords  = [];
    this.labelCounts  = [];
    this.labelProbabilities  = {};
    this.chordCountsInLabels  = {};  
    this.probabilityOfChordsInLabels  = {};
    //train
    this.train =(chords, label)=>{
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
    //getNumberOfSongs
    this.getNumberOfSongs = () =>{
        return this.songs.length;
    }

    //setLabelProbabilities
    this.setLabelProbabilities = () =>{
        let vm = this;
        Object.keys(vm.labelCounts).forEach(function (label) {
            vm.labelProbabilities[label] = vm.labelCounts[label] / vm.getNumberOfSongs();
        });
        return vm.labelProbabilities;
    }

    //setChordCountsInLabels
    this.setChordCountsInLabels = () =>{
        let vm = this;
        vm.songs.forEach(function (i) {
            if (vm.chordCountsInLabels[i[0]] === undefined) {
                vm.chordCountsInLabels[i[0]] = {};
            }
            i[1].forEach(function (j) {
                if (vm.chordCountsInLabels[i[0]][j] > 0) {
                    vm.chordCountsInLabels[i[0]][j] = vm.chordCountsInLabels[i[0]][j] + 1;
                } else {
                    vm.chordCountsInLabels[i[0]][j] = 1;
                }
            });
        });
        return vm.chordCountsInLabels;
    }

    //setProbabilityOfChordsInLabels
    this.setProbabilityOfChordsInLabels=()=>{
        let vm = this;
        vm.probabilityOfChordsInLabels = this.chordCountsInLabels;
        Object.keys(vm.probabilityOfChordsInLabels).forEach(function (i) {
            Object.keys(vm.probabilityOfChordsInLabels[i]).forEach(function (j) {
                vm.probabilityOfChordsInLabels[i][j] = vm.probabilityOfChordsInLabels[i][j] * 1.0 / vm.songs.length;
            });
        });
        return vm.probabilityOfChordsInLabels;
    }

    this.classify = (chords) => {
        let vm = this;
        var ttal = vm.labelProbabilities;
        console.log(ttal);
        var classified = {};
        Object.keys(ttal).forEach(function (obj) {
            var first = vm.labelProbabilities[obj] + 1.01;
            chords.forEach(function (chord) {
                var probabilityOfChordInLabel =
                    vm.probabilityOfChordsInLabels[obj][chord];
                if (probabilityOfChordInLabel === undefined) {
                    first + 1.01;
                } else {
                    first = first * (probabilityOfChordInLabel + 1.01);
                }
            });
            classified[obj] = first;
        });
        console.log(classified);
        return classified;
    }
}

const nb = new Nb();
// nb.train(nb.imagine, 'easy');

nb.train(nb.imagine, 'easy');
nb.train(nb.somewhere_over_the_rainbow, 'easy');
nb.train(nb.tooManyCooks, 'easy');
nb.train(nb.iWillFollowYouIntoTheDark, 'medium');
nb.train(nb.babyOneMoreTime, 'medium');
nb.train(nb.creep, 'medium');
nb.train(nb.paperBag, 'hard');
nb.train(nb.toxic, 'hard');
nb.train(nb.bulletproof, 'hard');
nb.setLabelProbabilities();
nb.setChordCountsInLabels();
nb.setProbabilityOfChordsInLabels();

console.log('a',a,'b',b,'c',c)

nb.classify(['d', 'g', 'e', 'dm']);
nb.classify(['f#m7', 'a', 'dadd9', 'dmaj7', 'bm', 'bm7', 'd', 'f#m']);

module.exports = {
    nb
};