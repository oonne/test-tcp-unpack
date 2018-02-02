let util = require('../util');
let data = require('./data');

// 获取数据
const body1 = Buffer.from(data.data1, 'utf-8');
const body2 = Buffer.from(data.data2, 'utf-8');

// 每个包的数据内容前面加上4个字节，申明内容数据的长度
const buffer1 = Buffer.concat([ util.pad(body1.length, 4), body1 ]);
const buffer2 = Buffer.concat([ util.pad(body2.length, 4), body2 ]);

// 先发生粘包，然后发生拆包
const pack1 = Buffer.concat([ buffer1, buffer2.slice(0, 100) ]);
const pack2 = buffer2.slice(100);

// 转化成ArrayBuffer进行传输
let buf1 = util.bufferToArrayBuffer(pack1);
let buf2 = util.bufferToArrayBuffer(pack2);

let pack = [buf1, buf2];

module.exports = pack;