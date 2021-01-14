const { TestWatcher } = require('jest');
const {nb} = require('./nb');

test('測試是否Pass',()=>{
    expect(nb.setLabelProbabilities()).toStrictEqual({
        easy: 0.3333333333333333,   
        medium: 0.3333333333333333, 
        hard: 0.3333333333333333    
    });
    expect(nb.classify(['d', 'g', 'e', 'dm'])).toStrictEqual({easy: 2.023094827160494, medium: 1.855758613168724, hard: 1.855758613168724});
})
