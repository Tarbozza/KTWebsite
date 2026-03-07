import ByteBuffer from 'bytebuffer';

export class ChallengeResponse {
    public bb: ByteBuffer;
    public clientId: number;
    public challengeToken: number;

    constructor(buf: ByteBuffer) {
        this.bb = buf;
        this.bb.offset = 1;
    }

    public decode(): void {
        this.clientId = this.bb.readInt32();
        const bb = this.bb.slice(5);
        this.challengeToken = parseInt(bb.toString('utf8'), 10);
    }
}