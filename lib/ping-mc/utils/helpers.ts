// This file contains utility functions that assist with various tasks, such as reading strings from byte buffers.

import ByteBuffer from 'bytebuffer';

export function readString(bb: ByteBuffer): string {
    const start = bb.offset;
    let b = bb.readUInt8();
    while (b !== 0x0) {
        b = bb.readUInt8();
    }
    return bb.toString('utf8', start, bb.offset - 1);
}

export function checkIsIPV4(entry: string): boolean {
    const blocks = entry.split(".");
    if (blocks.length === 4) {
        return blocks.every(block => {
            const num = parseInt(block, 10);
            return num >= 0 && num <= 255;
        });
    }
    return false;
}