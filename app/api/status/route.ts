import { NextResponse } from "next/server";
import mcpePing from "../../../lib/ping-mc";
import type {
  PingError,
  PingResponse,
  QueryResponse,
} from "../../../lib/ping-mc/types";

export async function GET() {
  const host = "15.235.132.72";
  const port = 20804;
  const discordInviteCode = "ktmcrp"; // Replace with your Discord invite code

  try {
    // Fetch Minecraft server status
    const mcResult = await new Promise<PingResponse | QueryResponse>(
      (resolve, reject) => {
        mcpePing(
          host,
          port,
          (err: PingError | null, res?: PingResponse | QueryResponse) => {
            if (err) {
              reject(err);
            } else if (res) {
              resolve(res);
            } else {
              reject(new Error("No response received"));
            }
          },
          2000,
        );
      },
    );

    console.log(mcResult);

    // Fetch Discord server stats
    let discordMembers = 0;
    let discordOnline = 0;

    try {
      const discordResponse = await fetch(
        `https://discord.com/api/v10/invites/${discordInviteCode}?with_counts=true`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (discordResponse.ok) {
        const discordData = await discordResponse.json();
        discordMembers = discordData.approximate_member_count || 0;
        discordOnline = discordData.approximate_presence_count || 0;
      }
    } catch (discordError) {
      console.error("Discord API error:", discordError);
      // Continue with default values
    }

    return NextResponse.json({
      online: true,
      players: mcResult.currentPlayers,
      maxPlayers: mcResult.maxPlayers,
      version: mcResult.version,
      discord: {
        members: discordMembers,
        online: discordOnline,
      },
    });
  } catch (error) {
    console.error("Ping error:", error);
    return NextResponse.json({
      online: false,
      players: 0,
      maxPlayers: 0,
      discord: {
        members: 0,
        online: 0,
      },
    });
  }
}
