'use strict';

import dgram from 'dgram';
import ByteBuffer from 'bytebuffer';
import dns from 'dns';
import { UnconnectedPing } from './packets/UnconnectedPing';
import { UnconnectedPong } from './packets/UnconnectedPong';
import { Challenge } from './packets/Challenge';
import { ChallengeResponse } from './packets/ChallengeResponse';
import { StatRequest } from './packets/StatRequest';
import { StatResponse } from './packets/StatResponse';
import { RAKNET } from './protocol/raknet';
import { QUERY } from './protocol/query';
import type { PingCallback, PingError, PingResponse, QueryResponse } from './types';

const START_TIME = new Date().getTime();

const ping = (server: string, port: number | PingCallback, callback?: PingCallback, timeout?: number, fullQuery?: boolean): void => {
  if (typeof timeout === "boolean" && typeof fullQuery === "undefined") {
    fullQuery = timeout;
    timeout = undefined;
  }
  const MCPE_DEFAULT_PORT = 19132;
  if (typeof port === "function") {
    callback = port;
    port = MCPE_DEFAULT_PORT;
  }

  if (typeof port !== "number") {
    port = MCPE_DEFAULT_PORT;
  }

  if (typeof timeout === "undefined") {
    timeout = 5000;
  }
  
  if (!callback) {
    throw new Error("Callback is required");
  }
  
  if (checkIsIPV4(server)) {
    if (fullQuery) {
      query(server, port, callback, timeout);
    } else {
      pingIP(server, port, callback, timeout);
    }
  } else {
    dns.lookup(server, (err, res) => {
      if (err === null && callback) {
        if (fullQuery) {
          query(res, port as number, callback, timeout as number);
        } else {
          pingIP(res, port as number, callback, timeout as number);
        }
      } else if (callback) {
        callback({ error: true, description: "DNS lookup failed." }, undefined);
      }
    });
  }
};

const query = (server: string, port: number, callback: PingCallback, timeout: number): void => {
  const client = dgram.createSocket("udp4");
  client.on("message", ((msg: Buffer, rinfo: dgram.RemoteInfo) => {
    const buf = new ByteBuffer().append(msg, "hex").flip();
    const id = buf.buffer[0];
    switch (id) {
      case QUERY.HANDSHAKE:
        const pong = new ChallengeResponse(buf);
        pong.decode();

        const statRequest = new StatRequest(pong.challengeToken);
        statRequest.encode();
        client.send(statRequest.bb.buffer, 0, statRequest.bb.buffer.length, port, server);
        break;
      case QUERY.STATISTIC:
        const stats = new StatResponse(buf);
        stats.decode();
        const clientData: QueryResponse = {
          rinfo,
          hostname: stats.data.hostname,
          gametype: stats.data.gametype,
          game: stats.data.gameId,
          version: stats.data.version,
          serverEngine: stats.data['server_engine'],
          plugins: stats.data.plugins,
          map: stats.data.map,
          currentPlayers: stats.data.numplayers,
          maxPlayers: stats.data.maxplayers,
          whitelist: (stats.data.whitelist === "on"),
          hostIp: stats.data.hostip,
          hostPort: stats.data.hostport,
          ackId: new Date().getTime() - START_TIME,
          players: stats.players,
          connected: true
        };
        client.close();
        callback(null, clientData);
        break;
      default:
        callback({ error: true, description: "Bad packet response." }, undefined);
        client.close();
        break;
    }
  }).bind(this));
  
  try {
    const challenge = new Challenge();
    challenge.encode();
    client.send(challenge.bb.buffer, 0, challenge.bb.buffer.length, port, server);
  } catch (e) {
    client.close();
    callback({ error: true, description: "Error sending ping." }, undefined);
  }
};

const pingIP = (server: string, port: number, callback: PingCallback, timeout: number): void => {
  const client = dgram.createSocket("udp4");
  const broadcastPing = () => {
    try {
      const ping = new UnconnectedPing(new Date().getTime() - START_TIME);
      ping.encode();
      client.send(ping.bb.buffer, 0, ping.bb.buffer.length, port, server);
    } catch (e) {
      clearInterval(broadcastIntervalId);
      clearTimeout(timeoutId);
      client.close();
      callback({ error: true, description: "Error sending ping." }, undefined);
    }
  };
  
  broadcastPing();
  const broadcastIntervalId = setInterval(broadcastPing.bind(this), 400);
  const timeoutId = setTimeout(() => {
    clearInterval(broadcastIntervalId);
    client.close();
    callback({ error: true, description: "Ping session timed out." }, undefined);
  }, timeout);
  
  client.on("message", ((msg: Buffer, rinfo: dgram.RemoteInfo) => {
    const buf = new ByteBuffer().append(msg, "hex").flip();
    const id = buf.buffer[0];
    switch (id) {
      case RAKNET.UNCONNECTED_PONG:
        const pong = new UnconnectedPong(buf);
        pong.decode();
        const clientData: PingResponse = {
          rinfo,
          advertise: pong.advertiseString,
          serverId: pong.serverId,
          pingId: pong.pingId,
          game: pong.gameId,
          version: pong.gameVersion,
          name: pong.name,
          cleanName: pong.name.replace(/\xA7[0-9A-FK-OR]/ig, ''),
          currentPlayers: pong.currentPlayers,
          maxPlayers: pong.maxPlayers,
          ackId: new Date().getTime() - START_TIME,
          connected: true
        };
        clearInterval(broadcastIntervalId);
        clearTimeout(timeoutId);
        client.close();
        callback(null, clientData);
        break;
      default:
        console.log(id);
        break;
    }
  }).bind(this));
};

const checkIsIPV4 = (entry: string) => {
  const blocks = entry.split(".");
  if (blocks.length === 4) {
    return blocks.every(block => {
      return parseInt(block, 10) >= 0 && parseInt(block, 10) <= 255;
    });
  }
  return false;
};

export default ping;
export type { PingCallback, PingError, PingResponse, QueryResponse } from './types';