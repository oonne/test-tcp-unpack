let util = require('../util');
let data = require('./data');

// 生成二进制数据
const body1 = Buffer.from(data.data1, 'utf-8');
const body2 = Buffer.from(data.data2, 'utf-8');

// 每个包的数据内容前面加上4个字节，申明内容数据的长度
const buffer1 = Buffer.concat([ util.pad(body1.length, 4), body1 ]);
const buffer2 = Buffer.concat([ util.pad(body2.length, 4), body2 ]);

// 转化成ArrayBuffer进行传输
let buf1 = util.bufferToArrayBuffer(buffer1);
let buf2 = util.bufferToArrayBuffer(buffer2);

let pack = [buf1, buf2];

module.exports = pack;