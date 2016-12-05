/**
 * Created by zhouhua on 2016/11/28.
 */

const isType = (type, value) => typeof value === type;
const isString = value => isType('string', value);
const isObject = value => isType('object', value);
const isArray = value => Array.isArray(value);

export default class Enum {
    /**
     * Construct an enum object.
     * `const color = new Enum('RED', 'GREEN', 'BLUE'); `
     * or `const color = new Enum(['RED', 'GREEN', 'BLUE']);`
     * or `const color = new Enum({RED: 1, GREEN: 2, BLUE: 3});`
     * or `const color = new Enum([
     *     {name: 'RED', value: 1, text: 'Red'},
     *     {name: 'GREEN', value: 2, text: 'Green'},
     *     {name: 'BLUE', value: 3, text: 'Blue'}
     * ]);`
     * @prams {Array | Object | undefined} items. These are Enum items.
     * If passed enum items, this enum object will be immutable, and couldn't be changed any more.
     * @return {Enum} An Enum object
     */
    constructor(...items) {
        Object.defineProperty(this, 'store', {
            value: []
        });
        Object.defineProperty(this, 'length', {
            get: () => this.store.length
        });
        if (items.length === 1) {
            if (isArray(items[0])) {
                items = items[0];
            }
            else if (isObject(items[0]) && !items[0].hasOwnProperty('value')) {
                items = Object.keys(items[0]).map(key => ({name: key, value: items[0][key]}));
            }
        }
        if (items.length) {
            items.forEach(item => this.add(item));
            return this.end();
        }
        return this;
    }

    /**
     * Add an enum item. Only can be invoked when the enum object hasn't been frozen.
     *
     *
     * @prams {String | Object} item. an enum item.
     * @return {Enum} this.
     */
    add(item) {
        if (!item) {
            return this;
        }
        let innerItem = {};
        if (isString(item)) {
            innerItem = {value: item};
        }
        else {
            innerItem = {...item};
        }
        innerItem.name = innerItem.name || innerItem.value;
        innerItem.text = innerItem.text || innerItem.name;
        if ({}.hasOwnProperty.call(this, innerItem.name)) {
            console.warn(`Enum item ${item.name} is duplicated, ignored.`);
        }
        else {
            Object.freeze(innerItem);
            this.store.push(innerItem);
            Object.defineProperty(this, innerItem.name, {
                value: innerItem.value,
                enumerable: true
            });
        }
        return this;
    }

    /**
     * Freeze it.
     *
     * @return {Enum} this.
     */
    end() {
        Object.freeze(this.store);
        Object.freeze(this);
        return this;
    }

    /**
     * `enum.getValue(name)`, or just `enum[name]`
     *
     * @params {String} name
     * @return {value}
     */
    getValue(name) {
        return this[name];
    }

    getValueByName(name) {
        return this[name];
    }

    get(name) {
        return this.getByName(name);
    }

    getByName(name) {
        const res = this.store.filter(item => item.name === name);
        if (res.length) {
            return res[0];
        }
        return null;
    }

    getByValue(value) {
        const res = this.store.filter(item => item.value === value);
        if (res.length) {
            return res[0];
        }
        return null;
    }

    getNameByValue(value) {
        const res = this.getByValue(value);
        if (res) {
            return res.name;
        }
        return null;
    }

    getTextByValue(value) {
        const res = this.getByValue(value);
        if (res) {
            return res.text;
        }
        return null;
    }

    getTextByName(name) {
        const res = this.get(name);
        if (res) {
            return res.text;
        }
        return null;
    }

    /**
     * Convert to array
     *
     * @params {String...} names
     * @return {Array}
     */
    toArray(...names) {
        if (names.length) {
            return names.map(name => ({...this.getByName(name)}));
        }
        return this.store.map(item => ({...item}));
    }

    /**
     * Get all keys of enum items
     *
     * @return {Array} collection of keys
     */
    keys() {
        return this.store.map(({name}) => name);
    }

    /**
     * Test if there's an item with the same key name which provided;
     *
     * @params {String} key
     * @return {Bool}
     */
    hasKey(key) {
        return this.store.some(({name}) => name === key);
    }

    /**
     * Test if there's an item with the same value which provided;
     *
     * @params {Value} Value
     * @return {Bool}
     */
    has(v) {
        return this.store.some(({value}) => value === v);
    }

    include(v) {
        return this.has(v);
    }

    contain(v) {
        return this.has(v);
    }

    /**
     * Get the count of enum items;
     *
     * @return {Number}
     */
    count() {
        return this.store.length;
    }
}
