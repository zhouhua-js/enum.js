/**
 * Created by zhouhua on 2016/12/6.
 */
import { expect } from 'chai';
import Enum from '../src/enum';

let enums;
let fake;

describe('Constructor', () => {
    it('construct from objects', () => {
        enums = new Enum(
            { name: 'RED', value: 'red', text: 'Red' },
            { name: 'BLUE', value: 'blue', text: 'Blue' },
            { name: 'GREEN', value: 'green', text: 'Green' }
        );
        expect(enums.RED).to.equal('red');
        expect(enums).to.be.frozen;
    });
    it('construct from object array', () => {
        enums = new Enum([
            { name: 'RED', value: 'red', text: 'Red' },
            { name: 'BLUE', value: 'blue', text: 'Blue' },
            { name: 'GREEN', value: 'green', text: 'Green' }
        ]);
        expect(enums.RED).to.equal('red');
        expect(enums).to.be.frozen;
    });
    it('construct from nested array', () => {
        enums = new Enum([[
            { name: 'RED', value: 'red', text: 'Red' },
            { name: 'BLUE', value: 'blue', text: 'Blue' },
            { name: 'GREEN', value: 'green', text: 'Green' }
        ]]);
        expect(enums.RED).to.equal('red');
        expect(enums).to.be.frozen;
    });
    it('construct from values', () => {
        enums = new Enum('RED', 'GREEN', 'BLUE');
        expect(enums.RED).to.equal('RED');
        expect(enums).to.be.frozen;
    });
    it('construct from single value(Object)', () => {
        enums = new Enum({ name: 'RED', value: 'red', text: 'Red' });
        expect(enums.RED).to.equal('red');
        expect(enums).to.be.frozen;
    });
    it('construct from value array', () => {
        enums = new Enum(['RED', 'GREEN', 'BLUE']);
        expect(enums.RED).to.equal('RED');
        expect(enums).to.be.frozen;
    });
    it('construct from key-value', () => {
        enums = new Enum({ RED: 'red', GREEN: 'green', BLUE: 'blue' });
        expect(enums.RED).to.equal('red');
        expect(enums).to.be.frozen;
    });
    it('construct with chain apis', () => {
        enums = new Enum();
        expect(enums).to.not.be.frozen;
        enums.add('RED').add().add(1).add({ test: 'test' })
            .add('GREEN')
            .add('BLUE')
            .end();
        expect(enums.RED).to.equal('RED');
        expect(enums).to.be.frozen;
    });
});

describe('Iterable', () => {
    it('normal case', () => {
        enums = new Enum(['RED', 'GREEN', 'BLUE']);
        expect(enums.length).to.equal(3);
        expect(enums.count()).to.equal(3);
    });
    it('normal case', () => {
        enums = new Enum(['RED', 'RED', 'RED']);
        expect(enums.length).to.equal(1);
        expect(enums.count()).to.equal(1);
    });
    it('iterate with for...in', () => {
        enums = new Enum(['RED', 'GREEN', 'BLUE']);
        for (const key of Object.keys(enums)) {
            expect(key).to.be.oneOf(['RED', 'GREEN', 'BLUE']);
        }
    });
    it('iterate with Object.keys', () => {
        enums = new Enum(['RED', 'GREEN', 'BLUE']);
        expect(Object.keys(enums)).to.be.members(['RED', 'GREEN', 'BLUE']);
    });
});

describe('GETs', () => {
    beforeEach(() => {
        enums = new Enum(
            { name: 'RED', value: 'red', text: 'Red' },
            { name: 'BLUE', value: 'blue', text: 'Blue' },
            { name: 'GREEN', value: 'green', text: 'Green' }
        );
    });
    it('Enum.getValue/Enum.getValueByName', () => {
        expect(enums.RED).to.equal('red');
        expect(enums.getValue('RED')).to.equal('red');
        expect(enums.getValueByName('RED')).to.equal('red');
        expect(enums.getValueByName('RED1')).to.be.undefined;
    });
    it('Enum.get/Enum.getByName', () => {
        expect(enums.get('RED').value).to.equal('red');
        expect(enums.getByName('RED').value).to.equal('red');
        expect(enums.getByName('RED1')).to.be.undefined;
    });
    it('Enum.getByValue', () => {
        expect(enums.getByValue('red').value).to.equal('red');
        expect(enums.getByValue('red1')).to.be.undefined;
    });
    it('Enum.getNameByValue', () => {
        expect(enums.getNameByValue('red')).to.equal('RED');
        expect(enums.getNameByValue('red1')).to.be.undefined;
    });
    it('Enum.getTextByValue', () => {
        expect(enums.getTextByValue('red')).to.equal('Red');
        expect(enums.getTextByValue('red1')).to.be.undefined;
    });
    it('Enum.getTextByName', () => {
        expect(enums.getTextByName('RED')).to.equal('Red');
        expect(enums.getTextByName('RED1')).to.be.undefined;
    });
});

describe('Checking', () => {
    beforeEach(() => {
        enums = new Enum(
            { name: 'RED', value: 'red', text: 'Red' },
            { name: 'BLUE', value: 'blue', text: 'Blue' },
            { name: 'GREEN', value: 'green', text: 'Green' }
        );
    });
    it('Enums.keys', () => {
        expect(enums.keys()).to.be.members(['RED', 'GREEN', 'BLUE']);
    });
    it('Enums.hasKey', () => {
        expect(enums.hasKey('RED')).to.be.true;
        expect(enums.hasKey('RED1')).to.be.false;
    });
    it('Enums.has/Enums.include/Enums.contains', () => {
        expect(enums.has('red')).to.be.true;
        expect(enums.has('red1')).to.be.false;
        expect(enums.include('red')).to.be.true;
        expect(enums.include('red1')).to.be.false;
        expect(enums.contain('red')).to.be.true;
        expect(enums.contain('red1')).to.be.false;
    });
});

describe('Making arrays', () => {
    beforeEach(() => {
        enums = new Enum(
            { name: 'RED', value: 'red', text: 'Red' },
            { name: 'BLUE', value: 'blue', text: 'Blue' },
            { name: 'GREEN', value: 'green', text: 'Green' }
        );
    });
    it('export all members', () => {
        const arr = enums.toArray();
        expect(arr.length).to.equal(3);
    });
    it('export particular members', () => {
        let arr = enums.toArray('RED');
        expect(arr.length).to.equal(1);
        expect(arr[0].text).to.equal('Red');
        arr = enums.toArray(['RED']);
        expect(arr.length).to.equal(1);
        expect(arr[0].text).to.equal('Red');
    });
    it('export particular members with invalid keys', () => {
        let arr = enums.toArray('RED', 'RED1');
        expect(arr.length).to.equal(1);
        expect(arr[0].text).to.equal('Red');
        arr = enums.toArray(['RED', 'RED1']);
        expect(arr.length).to.equal(1);
        expect(arr[0].text).to.equal('Red');
    });
});

describe('Secure', () => {
    beforeEach(() => {
        enums = new Enum(
            { name: 'RED', value: 'red', text: 'Red' },
            { name: 'BLUE', value: 'blue', text: 'Blue' },
            { name: 'GREEN', value: 'green', text: 'Green' }
        );
        fake = 'fake';
    });
    it('touch enum object', () => {
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
    it('touch the results from GET apis', () => {
        const item = enums.get('RED');
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
    it('touch private properties', () => {
        try {
            enums.store.forEach(item => {
                item.value = fake;
            });
        }
        catch (e) {
            console.log('should throw an error');
        }
        finally {
            expect(enums.RED).to.equal('red');
            expect(() => {
                enums.store.push({ name: 'PINK', value: 'pink', text: 'Pink' });
            }).to.throw(Error);
            expect(() => {
                enums.store.pop();
            }).to.throw(Error);
        }
    });
});
