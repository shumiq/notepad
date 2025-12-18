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

export async function getNote() {
  const note = (await noteTable?.toArray())?.[0];
  return {
    title: note?.title || "untitled.txt",
    content: note?.content || "",
  };
}

export async function setNote({
  title = "untitled.txt",
  content = "",
}: {
  title: string;
  content: string;
}) {
  await noteTable.put({ id: 0, title, content });
}
