"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface ServerStatus {
  playerCount: number | null;
  maxPlayers: number | null;
  gameVersion: string | null;
  discordMembers: number | null;
  discordOnline: number | null;
  isOnline: boolean | null;
}

const defaultStatus: ServerStatus = {
  playerCount: null,
  maxPlayers: null,
  gameVersion: null,
  discordMembers: null,
  discordOnline: null,
  isOnline: null,
};

const ServerStatusContext = createContext<ServerStatus>(defaultStatus);

export function ServerStatusProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<ServerStatus>(defaultStatus);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch("/api/status");
        if (!res.ok) return;
        const data = await res.json();

        setStatus({
          isOnline: data.online ?? false,
          playerCount: data.players ?? null,
          maxPlayers: data.maxPlayers ?? null,
          gameVersion: data.version ?? null,
          discordMembers: data.discord?.members ?? null,
          discordOnline: data.discord?.online ?? null,
        });
      } catch {
        // silently fail — status is non-critical
      }
    };

    fetchStatus();
  }, []);

  return (
    <ServerStatusContext.Provider value={status}>
      {children}
    </ServerStatusContext.Provider>
  );
}

export function useServerStatus() {
  return useContext(ServerStatusContext);
}
