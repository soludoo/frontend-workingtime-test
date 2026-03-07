/* eslint-disable @typescript-eslint/no-explicit-any */
import { WorkSession } from "@/type/work-session";
import { getDB } from "./db";

export async function getActiveSession() {
  const db = await getDB();
  const result = await db.allDocs({
    include_docs: true,
  });

  const sessions = result.rows.map((r: any) => r.doc);

  return sessions.find(
    (s: any) => s.status === "running" || s.status === "on_break",
  );
}

export async function getTodaySession() {
  const db = await getDB();

  const result = await db.allDocs({
    include_docs: true,
  });

  const sessions = result.rows.map((r: any) => r.doc);

  const today = new Date().toISOString().split("T")[0];

  return sessions
    .filter(
      (s: any) => s.date === today && s.status === "stopped" && s.clock_out,
    )
    .sort(
      (a: any, b: any) =>
        new Date(b.clock_out).getTime() - new Date(a.clock_out).getTime(),
    )[0];
}

export async function startWorking(payload: {
  projectId?: number;
  locationId?: string;
  notes?: string;
}) {
  const db = await getDB();

  const active = await getActiveSession();

  if (active) {
    throw new Error("Active session already running");
  }

  const now = new Date();
  const today = now.toISOString().split("T")[0];

  const session: WorkSession = {
    _id: `session_${Date.now()}`,
    clock_in: now.toISOString(),
    date: today,
    work_duration_seconds: 0,
    total_paused_seconds: 0,
    duration_minutes: 0,
    project_id: payload.projectId,
    work_location: payload.locationId,
    description: payload.notes,
    source: "PWA",
    status: "running",
    breaks: [],
    syncs: "pending",
  };

  await db.put(session);

  return session;
}

export async function pauseWorking(breakData: {
  breakType?: string;
  breakTypeId?: string;
  notes?: string;
}) {
  const active = await getActiveSession();
  const db = await getDB();

  if (!active) return;

  active.breaks.push({
    start_time: new Date().toISOString(),
    break_type: breakData.breakType,
    break_type_id: breakData.breakTypeId,
    description: breakData.notes,
  });

  active.status = "on_break";

  await db.put(active);
}

export async function resumeWorking() {
  const active = await getActiveSession();
  const db = await getDB();

  if (!active) return;

  const lastBreak = active.breaks[active.breaks.length - 1];

  if (lastBreak && !lastBreak.end_time) {
    const end = new Date();

    lastBreak.end_time = end.toISOString();

    lastBreak.duration_seconds =
      (end.getTime() - new Date(lastBreak.start_time).getTime()) / 1000;

    active.total_paused_seconds += lastBreak.duration_seconds;
  }

  active.status = "running";

  await db.put(active);
}

export async function stopWorking() {
  const active = await getActiveSession();
  const db = await getDB();

  if (!active) return;

  const now = new Date();

  active.clock_out = now.toISOString();
  active.status = "stopped";

  const totalSeconds =
    (now.getTime() - new Date(active.clock_in).getTime()) / 1000;

  active.work_duration_seconds = totalSeconds - active.total_paused_seconds;

  active.duration_minutes = Math.floor(active.work_duration_seconds / 60);

  await db.put(active);

  await syncPendingSessions();
}

export async function getPendingSessions() {
  const db = await getDB();
  const result = await db.allDocs({
    include_docs: true,
  });

  return result.rows
    .map((r: any) => r.doc)
    .filter((d: any) => d.syncs === "pending" && d.status === "stopped");
}
export async function trySync() {
  if (!navigator.onLine) return;
  const db = await getDB();

  const result = await db.allDocs({
    include_docs: true,
  });

  const pending = result.rows
    .map((r: any) => r.doc)
    .filter((d: any) => d.syncs === "pending" && d.status === "stopped");

  for (const session of pending) {
    try {
      const res = await fetch("/api/timer/sync", {
        method: "POST",
        body: JSON.stringify(session),
      });

      if (!res.ok) continue;

      session.syncs = "synced";

      await db.put(session);
    } catch (err) {
      console.log("sync failed", err);
    }
  }
}

function buildPayload(sessions: any[]) {
  return {
    entries: sessions.map((s) => ({
      clock_in: s.clock_in,
      clock_out: s.clock_out,
      date: s.date,
      work_duration_seconds: s.work_duration_seconds,
      total_paused_seconds: s.total_paused_seconds,
      duration_minutes: s.duration_minutes,
      project_id: s.project_id,
      work_location: s.work_location,
      description: s.description,
      notes: s.notes,
      source: s.source,
      breaks: s.breaks,
    })),
  };
}

async function syncPendingSessions() {
  if (!navigator.onLine) return;
  const db = await getDB();

  const pending = await getPendingSessions();

  if (!pending.length) return;

  const payload = buildPayload(pending);

  try {
    const res = await fetch("https://apilayer.vercel.app/api/me/timer/stop", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) return;

    for (const session of pending) {
      session.syncs = "synced";
      await db.put(session);
    }
  } catch (err) {
    console.log("sync failed", err);
  }
}
