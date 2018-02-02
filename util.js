var util = {
	pad: (num, byteSize) => {
	    var arrayBuffer = new ArrayBuffer(byteSize);  // 4个字节
	    var view = new DataView(arrayBuffer);

	    view.setInt32(0, num, true);  // true 为 little-endian , false 为 big-endian
	    var buff = Buffer.from(view.buffer);

	    return buff;
	},
	bufferToArrayBuffer: (buff) => {
		let len = buff.length;
		var view = new Uint8Array(len);
		for (let i = 0; i < len; i++) {
			view[i] = buff[i];
		}
		return view;
	}
}

module.exports = util;