export type Break = {
  start_time: string;
  end_time?: string;
  duration_seconds?: number;
  break_type?: string;
  description?: string;
};

export type WorkSession = {
  _id: string;

  clock_in: string;
  clock_out?: string;

  date: string;

  work_duration_seconds: number;
  total_paused_seconds: number;
  duration_minutes: number;

  project_id?: number;
  work_location?: string;
  description?: string;
  notes?: string;

  source: "PWA";

  status: "running" | "on_break" | "stopped";

  breaks: Break[];

  syncs: "pending" | "synced";
};
