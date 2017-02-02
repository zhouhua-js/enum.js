/**
 * Created by zhouhua on 2016/12/6.
 */
/* eslint-disable */
import {expect} from 'chai';
import Enum from '../src/enum.js';

let enums;
let fake;

describe('Constructor', function () {
    it('construct from objects', function () {
        enums = new Enum(
            {name: 'RED', value: 'red', text: 'Red'},
            {name: 'BLUE', value: 'blue', text: 'Blue'},
            {name: 'GREEN', value: 'green', text: 'Green'}
        );
        expect(enums.RED).to.equal('red');
        expect(enums).to.be.forzen;
    });
    it('construct from object array', function () {
        enums = new Enum([
            {name: 'RED', value: 'red', text: 'Red'},
            {name: 'BLUE', value: 'blue', text: 'Blue'},
            {name: 'GREEN', value: 'green', text: 'Green'}
        ]);
        expect(enums.RED).to.equal('red');
        expect(enums).to.be.forzen;
    });
    it('construct from nested array', function () {
        enums = new Enum([[
            {name: 'RED', value: 'red', text: 'Red'},
            {name: 'BLUE', value: 'blue', text: 'Blue'},
            {name: 'GREEN', value: 'green', text: 'Green'}
        ]]);
        expect(enums.RED).to.equal('red');
        expect(enums).to.be.forzen;
    });
    it('construct from values', function () {
        enums = new Enum('RED', 'GREEN', 'BLUE');
        expect(enums.RED).to.equal('RED');
        expect(enums).to.be.forzen;
    });
    it('construct from single value(Object)', function () {
        enums = new Enum({name: 'RED', value: 'red', text: 'Red'});
        expect(enums.RED).to.equal('red');
        expect(enums).to.be.forzen;
    });
    it('construct from value array', function () {
        enums = new Enum(['RED', 'GREEN', 'BLUE']);
        expect(enums.RED).to.equal('RED');
        expect(enums).to.be.forzen;
    });
    it('construct from key-value', function () {
        enums = new Enum({RED: 'red', GREEN: 'green', BLUE: 'blue'});
        expect(enums.RED).to.equal('red');
        expect(enums).to.be.forzen;
    });
    it('construct with chain apis', function () {
        enums = new Enum();
        expect(enums).to.not.be.forzen;
        enums.add('RED').add().add(1).add({test: 'test'}).add('GREEN').add('BLUE').end();
        expect(enums.RED).to.equal('RED');
        expect(enums).to.be.forzen;
    });
});

describe('Iterable', function () {
    it('normal case', function () {
        enums = new Enum(['RED', 'GREEN', 'BLUE']);
        expect(enums.length).to.equal(3);
        expect(enums.count()).to.equal(3);
    });
    it('normal case', function () {
        enums = new Enum(['RED', 'RED', 'RED']);
        expect(enums.length).to.equal(1);
        expect(enums.count()).to.equal(1);
    });
    it('iterate with for...in', function () {
        enums = new Enum(['RED', 'GREEN', 'BLUE']);
        for (let key in enums) {
            expect(key).to.be.oneOf(['RED', 'GREEN', 'BLUE']);
        }
    });
    it('iterate with Object.keys', function () {
        enums = new Enum(['RED', 'GREEN', 'BLUE']);
        expect(Object.keys(enums)).to.be.members(['RED', 'GREEN', 'BLUE']);
    })
});

describe('GETs', function () {
    beforeEach(function () {
        enums = new Enum(
            {name: 'RED', value: 'red', text: 'Red'},
            {name: 'BLUE', value: 'blue', text: 'Blue'},
            {name: 'GREEN', value: 'green', text: 'Green'}
        );
    });
    it('Enum.getValue/Enum.getValueByName', function () {
        expect(enums.RED).to.equal('red');
        expect(enums.getValue('RED')).to.equal('red');
        expect(enums.getValueByName('RED')).to.equal('red');
        expect(enums.getValueByName('RED1')).to.be.undefined;
    });
    it('Enum.get/Enum.getByName', function () {
        expect(enums.get('RED').value).to.equal('red');
        expect(enums.getByName('RED').value).to.equal('red');
        expect(enums.getByName('RED1')).to.be.undefined;
    });
    it('Enum.getByValue', function () {
        expect(enums.getByValue('red').value).to.equal('red');
        expect(enums.getByValue('red1')).to.be.undefined;
    });
    it('Enum.getNameByValue', function () {
        expect(enums.getNameByValue('red')).to.equal('RED');
        expect(enums.getNameByValue('red1')).to.be.undefined;
    });
    it('Enum.getTextByValue', function () {
        expect(enums.getTextByValue('red')).to.equal('Red');
        expect(enums.getTextByValue('red1')).to.be.undefined;
    });
    it('Enum.getTextByName', function () {
        expect(enums.getTextByName('RED')).to.equal('Red');
        expect(enums.getTextByName('RED1')).to.be.undefined;
    });
});

describe('Checking', function () {
    beforeEach(function () {
        enums = new Enum(
            {name: 'RED', value: 'red', text: 'Red'},
            {name: 'BLUE', value: 'blue', text: 'Blue'},
            {name: 'GREEN', value: 'green', text: 'Green'}
        );
    });
    it('Enums.keys', function () {
        expect(enums.keys()).to.be.members(['RED', 'GREEN', 'BLUE']);
    });
    it('Enums.hasKey', function () {
        expect(enums.hasKey('RED')).to.be.TRUE;
        expect(enums.hasKey('RED1')).to.be.FALSE;
    });
    it('Enums.has/Enums.include/Enums.contains', function () {
        expect(enums.has('red')).to.be.TRUE;
        expect(enums.has('red1')).to.be.FALSE;
        expect(enums.include('red')).to.be.TRUE;
        expect(enums.include('red1')).to.be.FALSE;
        expect(enums.contain('red')).to.be.TRUE;
        expect(enums.contain('red1')).to.be.FALSE;
    });
});

describe('Making arrays', function () {
    beforeEach(function () {
        enums = new Enum(
            {name: 'RED', value: 'red', text: 'Red'},
            {name: 'BLUE', value: 'blue', text: 'Blue'},
            {name: 'GREEN', value: 'green', text: 'Green'}
        );
    });
    it('export all members', function () {
        let arr = enums.toArray();
        expect(arr.length).to.equal(3);
    });
    it('export particular members', function () {
        let arr = enums.toArray('RED');
        expect(arr.length).to.equal(1);
        expect(arr[0].text).to.equal('Red');
        arr = enums.toArray(['RED']);
        expect(arr.length).to.equal(1);
        expect(arr[0].text).to.equal('Red');
    });
    it('export particular members with invalid keys', function () {
        let arr = enums.toArray('RED', 'RED1');
        expect(arr.length).to.equal(1);
        expect(arr[0].text).to.equal('Red');
        arr = enums.toArray(['RED', 'RED1']);
        expect(arr.length).to.equal(1);
        expect(arr[0].text).to.equal('Red');
    });
});

describe('Secure', function () {
    beforeEach(function () {
        enums = new Enum(
            {name: 'RED', value: 'red', text: 'Red'},
            {name: 'BLUE', value: 'blue', text: 'Blue'},
            {name: 'GREEN', value: 'green', text: 'Green'}
        );
        fake = 'fake';
    });
    it('touch enum object', function () {
        try {
            enums.RED = fake;
            enums.fake = fake;
        }
        catch (e) {
            console.log('should throw an error');
        }
        finally {
            expect(enums.RED).to.equal('red');
            expect(enums.fake).to.be.undefined;
        }
    });
    it('touch the results from GET apis', function () {
        let item = enums.get('RED');
        try {
            item.value = fake;
        }
        catch (e) {
            console.log('should throw an error');
        }
        finally {
            expect(enums.get('RED').value).to.equal('red');
        }
    });
    it('touch private properties', function () {
        try {
            enums.store.forEach(item => item.value = fake);
        }
        catch (e) {
            console.log('should throw an error');
        }
        finally {
            expect(enums.RED).to.equal('red');
            expect(function () {
                enums.store.push({name: 'PINK', value: 'pink', text: 'Pink'});
            }).to.throw(Error);
            expect(function () {
                enums.store.pop();
            }).to.throw(Error);
        }
    });
});


