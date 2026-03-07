import ByteBuffer from 'bytebuffer';
import { QUERY } from '../protocol/query';

export class StatRequest {
  public bb: ByteBuffer;
  public challengeToken: number;

  constructor(challengeToken: number) {
    this.bb = new ByteBuffer();
    this.challengeToken = challengeToken;
  }

  public encode(): void {
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