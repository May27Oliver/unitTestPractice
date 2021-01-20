const { TestWatcher } = require('jest');
const {nb} = require('./nb');

//測試trainSongs
// test("測試Train內的trainSongs能否在輸入項為nb.imagine,'easy'時產出[ [ 'easy', [ 'c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7' ] ] ]",
//     ()=>{
//         expect(nb.trainSongs(['easy',nb.imagine])).toEqual(//toEqual深度比對
//             expect.arrayContaining([ [ 'easy', [ 'c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7' ] ] ])
//         )
//     }
// )

// //測試trainLabels
// test("測試Train內的trainLabels能否在輸入項為'easy'時產出[ 'easy' ]",
//     ()=>{
//         expect(nb.trainLabels('easy')).toEqual(//toEqual深度比對
//             expect.arrayContaining([ 'easy' ])
//         )
//     }
// )

// //測試trainAllChords
// test("測試Train內的trainAllChords能否在輸入項為nb.imagine時產出[ 'c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7' ]",
//     ()=>{
//         expect(nb.trainAllChords(nb.imagine)).toEqual(//toEqual深度比對
//             expect.arrayContaining([ 'c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7' ])
//         )
//     }
// )

// //測試trainLabelCounts
// test("測試Train內的trainLabelCounts能否在輸入項為'easy'時產出[ 'c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7' ]",
//     ()=>{
//         expect(nb.trainAllChords(nb.imagine)).toEqual(//toEqual深度比對
//             expect.arrayContaining([ 'c', 'cmaj7', 'f', 'am', 'dm', 'g', 'e7' ])
//         )
//     }
// )

//測試setLabelProbabilities()
test('測試setLabelProbabilities()是否能得到{easy: 0.3333333333333333,medium: 0.3333333333333333,hard: 0.3333333333333333}',
    ()=>{
        expect(nb.setLabelProbabilities()).toStrictEqual({
            easy: 0.3333333333333333,   
            medium: 0.3333333333333333, 
            hard: 0.3333333333333333    
        });
    }
)

//測試classify
test("測試nb.classify(['d', 'g', 'e', 'dm'])是否結果為{easy: 2.023094827160494, medium: 1.855758613168724, hard: 1.855758613168724}",
()=>{
    expect(nb.classify(['d', 'g', 'e', 'dm'])).toStrictEqual({easy: 2.023094827160494, medium: 1.855758613168724, hard: 1.855758613168724});
})
