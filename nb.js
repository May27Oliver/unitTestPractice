fs = require('fs');

//處理方向
//1.全域變數是否能收攏進物件內？
//2.是否能將每個函式再進行顆粒化？
//3.是否能讓函式內的私有變數讓其他函式調用？
// songs

function Nb(){//重構第一步：先將全域變數收攏到物件內
    let vm = this;
    vm.imagine = ['c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7'];
    vm.somewhere_over_the_rainbow  = ['c', 'em', 'f', 'g', 'am'];
    vm.tooManyCooks  = ['c', 'g', 'f'];
    vm.iWillFollowYouIntoTheDark  = ['f', 'dm', 'bb', 'c', 'a', 'bbm'];
    vm.babyOneMoreTime  = ['cm', 'g', 'bb', 'eb', 'fm', 'ab'];
    vm.creep  = ['g', 'gsus4', 'b', 'bsus4', 'c', 'cmsus4', 'cm6'];
    vm.army  = ['ab', 'ebm7', 'dbadd9', 'fm7', 'bbm', 'abmaj7', 'ebm'];
    vm.paperBag  = ['bm7', 'e', 'c', 'g', 'b7', 'f', 'em', 'a', 'cmaj7',
        'em7', 'a7', 'f7', 'b'
    ];
    vm.toxic  = ['cm', 'eb', 'g', 'cdim', 'eb7', 'd7', 'db7', 'ab', 'gmaj7',
        'g7'
    ];
    vm.bulletproof  = ['d#m', 'g#', 'b', 'f#', 'g#m', 'c#'],
    vm.songs  = [];
    vm.labels  = [];
    vm.allChords  = [];
    vm.labelCounts  = [];
    vm.labelProbabilities  = {};
    vm.chordCountsInLabels  = {};  
    vm.probabilityOfChordsInLabels  = {};
    //train
    vm.train =(chords, label)=>{
        vm.trainSongs([label, chords])
        vm.trainLabels(label);
        vm.trainAllChords(chords);
        vm.trainLabelCounts(label);
    }
    //將原本的train拆分成四個function，針對四個function進行測試
    vm.trainSongs = (info)=>{
        vm.songs.push(info)
        return vm.songs;
    }
    vm.trainLabels =(label)=>{
        vm.labels.push(label);
        return vm.labels
    }
    vm.trainAllChords = (chords) =>{
        chords.forEach(item=>{
            if (!vm.allChords.includes(item)) {
                vm.allChords = [...vm.allChords,item]
            }
        })
        return vm.allChords;
    }
    vm.trainLabelCounts = (label) => {
        if (!!(Object.keys(vm.labelCounts).includes(label))) {
            vm.labelCounts[label] = vm.labelCounts[label] + 1;
        } else {
            vm.labelCounts[label] = 1;
        }
        return vm.labelCounts;
    }

    //setLabelProbabilities
    vm.setLabelProbabilities = () =>{
        Object.keys(vm.labelCounts).forEach( label => {
            vm.labelProbabilities[label] = vm.labelCounts[label] / vm.songs.length;
        });
        return vm.labelProbabilities;
    }

    //setChordCountsInLabels
    vm.setChordCountsInLabels = () =>{
        vm.songs.forEach(function (song) {
            if (!vm.chordCountsInLabels[song[0]]) {
                vm.chordCountsInLabels[song[0]] = {};
            }
            song[1].forEach(function (chord) {
                if (vm.chordCountsInLabels[song[0]][chord] > 0) {
                    vm.chordCountsInLabels[song[0]][chord] = vm.chordCountsInLabels[song[0]][chord] + 1;
                } else {
                    vm.chordCountsInLabels[song[0]][chord] = 1;
                }
            });
        });
        return vm.chordCountsInLabels;
    }

    //setProbabilityOfChordsInLabels
    vm.setProbabilityOfChordsInLabels=()=>{
        vm.probabilityOfChordsInLabels = vm.chordCountsInLabels;
        Object.keys(vm.probabilityOfChordsInLabels).forEach( p => {
            Object.keys(vm.probabilityOfChordsInLabels[p]).forEach(chordNum => {
                vm.probabilityOfChordsInLabels[p][chordNum] = vm.probabilityOfChordsInLabels[p][chordNum] * 1.0 / vm.songs.length;
            });
        });
        return vm.probabilityOfChordsInLabels;
    }

    vm.classify = (chords) => {
        let classified = {};
        Object.keys(vm.labelProbabilities).forEach( obj => {
            let first = vm.labelProbabilities[obj] + 1.01;
            classified[obj] = vm.countClassifiedResult(chords,obj,first);
        });
        return classified;
    }
    //classify拆出countClassifiedResult
    vm.countClassifiedResult = (chords,obj,first) => {
        chords.forEach( chord => {
            if (!vm.probabilityOfChordsInLabels[obj][chord]) {
                first + 1.01;
            } else {
                first = first * (vm.probabilityOfChordsInLabels[obj][chord] + 1.01);
            }
        });
        return first;
    }
}

const nb = new Nb();
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

// console.log('a',a,'b',b,'c',c)

nb.classify(['d', 'g', 'e', 'dm']);
nb.classify(['f#m7', 'a', 'dadd9', 'dmaj7', 'bm', 'bm7', 'd', 'f#m']);

module.exports = {
    nb
};