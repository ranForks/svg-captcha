'use strict';

const assert = require('assert');
const svgCaptcha = require('../');

const xmlReg = /^<svg[\s\S]+\/svg>$/;
const textTagReg = /text/;

describe('svg captcha', () => {
    it('should generate random text', () => {
        for (let i = 0; i < 62; i++) {
            const text = svgCaptcha.randomText();
            assert(/^[0-9a-zA-Z]+$/.test(text));
        }
    });

    it('should filter unwanted chars', () => {
        const opt = {
            ignoreChars: '0123456789'
        };
        for (let i = 0; i < 62; i++) {
            const text = svgCaptcha.randomText(opt);
            assert(/^[a-zA-Z]+$/.test(text));
        }
    });

    it('should generate svg', () => {
        assert(xmlReg.test(svgCaptcha()));
        assert(xmlReg.test(svgCaptcha({
            text: 'abcd'
        })));
    });

    it('should generate path', () => {
        assert(!textTagReg.test(svgCaptcha({
            text: 'text'
        })));
    });

    it('should be fast', () => {
        for (let i = 0; i < 100; i++) {
            const text = svgCaptcha.randomText();
            svgCaptcha(text);
        }
    }, {
        slow: 50,
        timeout: 100
    });
});

const random = require('../lib/random');

describe('random function', () => {
    it('should generate random integer', () => {
        for (let i = 0; i < 10; i++) {
            const num = random.int(0, 10);
            assert(num >= 0 && num <= 10);
        }
    });

    it('should generate grey color', () => {
        assert(random.greyColor());
        assert(random.greyColor(3, 4));
    });
});
