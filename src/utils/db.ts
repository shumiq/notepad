import { createResource } from "solid-js";

import { Dexie, type Table } from "dexie";

const db = new Dexie("notepad");
db.version(1).stores({
  notes: "++id, title, content",
});
// @ts-expect-error notes type is not defined
const noteTable = db?.notes as Table<{
  id: number;
  title: string;
  content: string;
}>;

export const [getNote] = createResource(async () => {
  return (await noteTable?.toArray())?.[0]?.content || "";
});

export async function setNote(content: string) {
  await noteTable.put({ id: 0, title: "default", content });
}
