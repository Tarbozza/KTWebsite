import ByteBuffer from 'bytebuffer';
import { RAKNET } from '../protocol/raknet';

export class UnconnectedPing {
  public bb: ByteBuffer;
  public pingId: number;

  constructor(pingId: number) {
    this.bb = new ByteBuffer();
    this.bb.buffer[0] = RAKNET.UNCONNECTED_PING;
    this.bb.offset = 1;
    this.pingId = pingId;
  }

  public encode(): void {
    this.bb
      .writeLong(this.pingId)
      .append(RAKNET.MAGIC, "hex")
      .writeLong(0)
      .flip()
      .compact();
  }
}