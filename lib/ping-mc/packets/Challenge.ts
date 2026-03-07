import ByteBuffer from 'bytebuffer';
import { QUERY } from '../protocol/query';

export class Challenge {
  public bb: ByteBuffer;

  constructor() {
    this.bb = new ByteBuffer();
  }

  public encode(): void {
    this.bb
      .append(QUERY.MAGIC, "hex")
      .writeByte(QUERY.HANDSHAKE)
      .writeInt32(1)
      .flip()
      .compact();
  }
}