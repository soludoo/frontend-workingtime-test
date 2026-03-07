/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

let db: any = null;

export async function getDB() {
  if (typeof window === "undefined") {
    return null;
  }

  if (!db) {
    const PouchDB = (await import("pouchdb-browser")).default;
    db = new PouchDB("working_app");
  }

  return db;
}
