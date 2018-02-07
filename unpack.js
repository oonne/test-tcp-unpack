let unpack = (packs) => {
    let res = [];
    
    let totalResBuff = Buffer.alloc(0);  // 当前正在取包的内容
    let totalResByteLen = 0;  // 当前正在取的包的完整包体长度
    let body = Buffer.alloc(0);  // 当前正在取的有效数据
    let bodyByteLen = 0;  // 当前正在取的有效数据的长度

    // 对接收到的数据进行处理
    let readData = (resBuffer) => {
        let resBuffLen = resBuffer.length;     

        // 如果这是收到的第一个数据包，读取前四个字节，获取body的完整长度
        if (totalResBuff.byteLength === 0) {
            // 有效数据 长度
            bodyByteLen = new DataView(resBuffer.buffer.slice(0, 4)).getInt32(0, true);
            // 完整包体 长度
            totalResByteLen = bodyByteLen + 4;
        }

        // 对拆包和粘包进行处理
        let remaining = resBuffLen; //剩余未解析的数据长度
        while (remaining > 0){ //只要还有剩余的数据没取完，就继续获取

            console.log('resBuffLen:'+resBuffLen);  //接受到的数据长度
            console.log('start:'+(resBuffLen-remaining));  //从resBuffer中开始读取数据的位置
            console.log('curBuffLen:'+totalResBuff.byteLength);  //当前包已解析的内容长度
            console.log('totalResByteLen:'+totalResByteLen);  //当前包包的总长度

            // 如果数据包的长度小于剩余的长度，说明发生粘包，取完这个数据包的内容之后，还得继续获取剩余的数据
            if (totalResByteLen<remaining) {
                let totalRemaining = totalResByteLen - totalResBuff.byteLength; //这个数据包还剩下的没有取到的数据长度

                // 获取这个数据包的内容
                totalResBuff = Buffer.concat([totalResBuff, resBuffer.slice(resBuffLen-remaining, totalRemaining)]);
                // 这个数据包的内容获取完成，开始处理数据                
                body = totalResBuff.slice(4, totalResByteLen);
                decodeBody(body);

                // 这个包已经处理完，获取剩余的字节数，作为下个包开始取的位置
                remaining = remaining - totalRemaining;
                
                // 清空当前的包，获取下一个包的大小
                totalResBuff = Buffer.alloc(0);
                body = Buffer.alloc(0);
                bodyByteLen = new DataView(resBuffer.buffer.slice(resBuffLen-remaining, resBuffLen-remaining+4)).getInt32(0, true);
                totalResByteLen = bodyByteLen + 4;
                continue;
            } else {
                // 当前剩余的都是同一个包的内容，直接获取到结束
                totalResBuff = Buffer.concat([totalResBuff, resBuffer.slice(resBuffLen-remaining, resBuffLen)]);
                remaining = 0;
            }

            // 当前已经取到的内容还不够完整的数据包长度，继续等SVR返回剩余的包
            if (totalResBuff.byteLength < totalResByteLen) {
                return;
            }

            // 这里已经取到完整的数据包，从包里获取内容进行处理
            body = totalResBuff.slice(4, totalResByteLen);
            decodeBody(body);

            // 当前包所有数据已经处理完，清空数据
            totalResBuff = Buffer.alloc(0);
            totalResByteLen = 0;
            body = Buffer.alloc(0);
            bodyByteLen = 0;
        }

    }

    // 解析包内容
    let decodeBody = (body) => {
        res.push(body.toString('utf-8'));
    }

 
    // 通过遍历packs数组，模拟实际传输过程中连续接收数据
    for(pack of packs) {
        readData(pack);
    }

    return res;
}

module.exports = unpack;

