// filepath: /mcpe-ping-ts/mcpe-ping-ts/src/protocol/query.ts
import ByteBuffer from 'bytebuffer';

export const QUERY = {
  STATISTIC: 0x00,
  HANDSHAKE: 0x09,
  MAGIC: 'fefd',
  KEYVAL_START: 128,
  KEYVAL_END: 1
};

export function readString(bb: ByteBuffer): string {
  const start = bb.offset;
  let b = bb.readUint8();
  while (b !== 0x0) {
    b = bb.readUint8();
  }
  return bb.slice(start, bb.offset - 1).toString('utf8');
}

export class Challenge {
  bb: ByteBuffer;

  constructor() {
    this.bb = new ByteBuffer();
  }

  encode(): void {
    this.bb
      .append(QUERY.MAGIC, "hex")
      .writeByte(QUERY.HANDSHAKE)
      .writeInt32(1)
      .flip()
      .compact();
  }
}

export class ChallengeResponse {
  bb: ByteBuffer;
  clientId!: number;
  challengeToken!: number;

  constructor(buf: ByteBuffer) {
    this.bb = buf;
    this.bb.offset = 1;
  }

  decode(): void {
    this.clientId = this.bb.readInt32();
    const bb = this.bb.slice(5);
    this.challengeToken = parseInt(bb.toString('utf8'), 10);
  }
}

export class StatRequest {
  bb: ByteBuffer;
  challengeToken: number;

  constructor(challengeToken: number) {
    this.bb = new ByteBuffer();
    this.challengeToken = challengeToken;
  }

  encode(): void {
    this.bb
      .append(QUERY.MAGIC, "hex")
      .writeByte(QUERY.STATISTIC)
      .writeInt32(1)
      .writeInt32(this.challengeToken)
      .writeInt32(0)
      .flip()
      .compact();
  }
}

export class StatResponse {
  bb: ByteBuffer;
  data: Record<string, string>;
  players: string[];

  constructor(buf: ByteBuffer) {
    this.bb = buf;
    this.bb.offset = 16;
    this.data = {};
    this.players = [];
  }

  decode(): void {
    let key: string;
    let value: string;
    while (this.bb.readUint16(this.bb.offset) !== QUERY.KEYVAL_END) {
      key = readString(this.bb);
      value = readString(this.bb);
      this.data[key] = value;
    }
    this.bb.offset += 11;

    let player = readString(this.bb);
    while (player.length >= 1) {
      this.players.push(player);
      player = readString(this.bb);
    }
  }
}