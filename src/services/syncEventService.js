import { poolSync } from "../config/db.js";

export async function createSyncEvent({
  sourceService,
  targetService,
  entity,
  recordId,
  action,
  payload,
}) {
  const eventKey = `${sourceService}-${entity}-${recordId}-${action}-${Date.now()}`;

  await poolSync.query(
    `INSERT INTO sync_events
     (source_service, target_service, entity, record_id, action, payload, event_key)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      sourceService,
      targetService,
      entity,
      recordId,
      action,
      JSON.stringify(payload),
      eventKey,
    ]
  );
}
