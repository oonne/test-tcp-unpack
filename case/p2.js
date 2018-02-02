let util = require('../util');
let data = require('./data');

// 获取数据
const body1 = Buffer.from(data.data1, 'utf-8');
const body2 = Buffer.from(data.data2, 'utf-8');

// 每个包的数据内容前面加上4个字节，申明内容数据的长度
const buffer1 = Buffer.concat([ util.pad(body1.length, 4), body1 ]);
const buffer2 = Buffer.concat([ util.pad(body2.length, 4), body2 ]);

// 连起来作为粘包数据
const buffer = Buffer.concat([ buffer1, buffer2 ]);

// 转化成ArrayBuffer进行传输
let buf = util.bufferToArrayBuffer(buffer);

let pack = [buf];

module.exports = pack;