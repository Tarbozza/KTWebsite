// This file defines the UnconnectedPong class, which decodes the server's pong response.

import ByteBuffer from 'bytebuffer';

export class UnconnectedPong {
    public bb: ByteBuffer;
    public pingId: number;
    public serverId: number;
    public advertiseString: string;
    public gameId: string;
    public name: string;
    public unknownId: string;
    public gameVersion: string;
    public currentPlayers: string;
    public maxPlayers: string;

    constructor(buf: ByteBuffer) {
        this.bb = buf;
        this.bb.offset = 1;
    }

    public decode(): void {
        this.pingId = this.bb.readLong();
        this.serverId = this.bb.readLong();
        this.bb.offset += 16;
        const nameLength = this.bb.readShort();
        try {
            this.advertiseString = this.bb.readUTF8String(nameLength);
        } catch (e) {
            this.advertiseString = this.bb.readUTF8String(parseInt(e.message.substr(e.message.indexOf(",") + 2, 3)));
        }
        const splitString = this.advertiseString.split(/;/g);
        this.gameId = splitString[0];
        this.name = splitString[1];
        this.unknownId = splitString[2];
        this.gameVersion = splitString[3];
        this.currentPlayers = splitString[4];
        this.maxPlayers = splitString[5];
    }
}