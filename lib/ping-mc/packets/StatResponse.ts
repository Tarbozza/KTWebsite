import ByteBuffer from 'bytebuffer';
import { QUERY, readString } from '../protocol/query';

export class StatResponse {
  public bb: ByteBuffer;
  public data: Record<string, string>;
  public players: string[];

  constructor(buf: ByteBuffer) {
    this.bb = buf;
    this.bb.offset = 16;
    this.data = {};
    this.players = [];
  }

  public decode(): void {
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