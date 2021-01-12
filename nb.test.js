const { TestWatcher } = require('jest');
const {classify} = require('./nb');

test('Should get Chrods',()=>{
    expect(classify(['d', 'g', 'e', 'dm'])).toStrictEqual({easy: 2.023094827160494, medium: 1.855758613168724, hard: 1.855758613168724});
})
