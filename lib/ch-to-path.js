'use strict';

const assert = require('assert');
const path = require('path');
const opentype = require('opentype.js');

const fontPath = path.join(__dirname, '../fonts/Comismsh.ttf');
const font = opentype.loadSync(fontPath);
const ascender = font.ascender;
const descender = font.descender;

module.exports = function(text, options) {
    options = options === undefined ? {} : options;

    const ch = text.trim()[0];
    assert(ch, 'expect a string');

    const fontSize = options.fontSize || 72;
    const fontScale = 1 / font.unitsPerEm * fontSize;

    const glyph = font.stringToGlyphs(ch)[0];
    const width = glyph.advanceWidth ? glyph.advanceWidth * fontScale : 0;
    const left = 0 - (width / 2);

    const height = (ascender + descender) * fontScale;
    const baseline = (options.y || 0) + (height / 2);
    const path = font.getPath(ch, left, baseline, fontSize, {
        kerning: true
    });

    let pathData = path.toPathData();

    pathData = pathData.replace(/[\d]+(\.[\d]+)?/g, (val) => {
        let v = parseFloat(val) + Math.random() * Math.random() * 7;
        return v.toFixed(2);
    });

    return pathData;
};
