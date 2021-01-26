fs = require('fs');

//處理方向
//1.全域變數是否能收攏進物件內？
//2.是否能將每個函式再進行顆粒化？
//3.是否能讓函式內的私有變數讓其他函式調用？

function SongCalc(){//重構第一步：先將全域變數收攏到物件內
    let self = this;
    self.songs  = [];
    self.labels  = [];
    self.allChords  = [];
    self.labelCounts  = [];
    self.labelProbabilities  = {};
    self.chordCountsInLabels  = {};  
    self.probabilityOfChordsInLabels  = {};

    //業務邏輯區
    //train
    self.train =(chords, label)=>{
        self.trainSongs([label, chords])
        self.trainLabels(label);
        self.trainAllChords(chords);
        self.trainLabelCounts(label);
    }

    //trainLabelCounts
    self.trainLabelCounts = (label) => {
        if (!!(Object.keys(self.labelCounts).includes(label))) {
            self.labelCounts[label] = self.labelCounts[label] + 1;
        } else {
            self.labelCounts[label] = 1;
        }
        return self.labelCounts;
    }
    
    //setLabelProbabilities
    self.setLabelProbabilities = () =>{
        Object.keys(self.labelCounts).forEach( label => {
            self.labelProbabilities[label] = self.labelCounts[label] / self.songs.length;
        });
        return self.labelProbabilities;
    }

    //setChordCountsInLabels
    self.setChordCountsInLabels = () =>{
        self.songs.forEach(function (song) {
            if (!self.chordCountsInLabels[song[0]]) {
                self.chordCountsInLabels[song[0]] = {};
            }
            song[1].forEach(function (chord) {
                if (self.chordCountsInLabels[song[0]][chord] > 0) {
                    self.chordCountsInLabels[song[0]][chord] = self.chordCountsInLabels[song[0]][chord] + 1;
                } else {
                    self.chordCountsInLabels[song[0]][chord] = 1;
                }
            });
        });
        return self.chordCountsInLabels;
    }

    //setProbabilityOfChordsInLabels
    self.setProbabilityOfChordsInLabels=()=>{
        self.probabilityOfChordsInLabels = self.chordCountsInLabels;
        Object.keys(self.probabilityOfChordsInLabels).forEach( p => {
            Object.keys(self.probabilityOfChordsInLabels[p]).forEach(chordNum => {
                self.probabilityOfChordsInLabels[p][chordNum] = self.probabilityOfChordsInLabels[p][chordNum] * 1.0 / self.songs.length;
            });
        });
        return self.probabilityOfChordsInLabels;
    }

    self.classify = (chords) => {
        let classified = {};
        Object.keys(self.labelProbabilities).forEach( obj => {
            let first = self.labelProbabilities[obj] + 1.01;
            classified[obj] = self.countClassifiedResult(chords,obj,first);
        });
        return classified;
    }

    //元件區
    //將原本的train拆分成四個function，針對四個function進行測試
    self.trainSongs = (info)=>{
        self.songs.push(info)
        return self.songs;
    }
    self.trainLabels =(label)=>{
        self.labels.push(label);
        return self.labels
    }
    self.trainAllChords = (chords) =>{
        console.log('chords',chords);
        chords.forEach(item=>{
            if (!self.allChords.includes(item)) {
                self.allChords = [...self.allChords,item]
            }
        })
        return self.allChords;
    }
    
    //classify拆出countClassifiedResult
    self.countClassifiedResult = (chords,obj,first) => {
        chords.forEach( chord => {
            if (!self.probabilityOfChordsInLabels[obj][chord]) {
                first + 1.01;
            } else {
                first = first * (self.probabilityOfChordsInLabels[obj][chord] + 1.01);
            }
        });
        return first;
    }
}

// songs
let songCollection = {
    imagine : ['c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7'],
    somewhere_over_the_rainbow  : ['c', 'em', 'f', 'g', 'am'],
    tooManyCooks  : ['c', 'g', 'f'],
    iWillFollowYouIntoTheDark  : ['f', 'dm', 'bb', 'c', 'a', 'bbm'],
    babyOneMoreTime  : ['cm', 'g', 'bb', 'eb', 'fm', 'ab'],
    creep  : ['g', 'gsus4', 'b', 'bsus4', 'c', 'cmsus4', 'cm6'],
    army  : ['ab', 'ebm7', 'dbadd9', 'fm7', 'bbm', 'abmaj7', 'ebm'],
    paperBag  : ['bm7', 'e', 'c', 'g', 'b7', 'f', 'em', 'a', 'cmaj7','em7', 'a7', 'f7', 'b'],
    toxic  : ['cm', 'eb', 'g', 'cdim', 'eb7', 'd7', 'db7', 'ab', 'gmaj7','g7'],
    bulletproof  : ['d#m', 'g#', 'b', 'f#', 'g#m', 'c#']
}


const songCalc = new SongCalc();
songCalc.train(songCollection.imagine, 'easy');
songCalc.train(songCollection.somewhere_over_the_rainbow, 'easy');
songCalc.train(songCollection.tooManyCooks, 'easy');
songCalc.train(songCollection.iWillFollowYouIntoTheDark, 'medium');
songCalc.train(songCollection.babyOneMoreTime, 'medium');
songCalc.train(songCollection.creep, 'medium');
songCalc.train(songCollection.paperBag, 'hard');
songCalc.train(songCollection.toxic, 'hard');
songCalc.train(songCollection.bulletproof, 'hard');
songCalc.setLabelProbabilities();
songCalc.setChordCountsInLabels();
songCalc.setProbabilityOfChordsInLabels();

songCalc.classify(['d', 'g', 'e', 'dm']);
songCalc.classify(['f#m7', 'a', 'dadd9', 'dmaj7', 'bm', 'bm7', 'd', 'f#m']);

module.exports = {
    songCalc,songCollection
};