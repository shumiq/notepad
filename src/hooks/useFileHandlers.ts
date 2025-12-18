import { createEffect } from "solid-js";
import { setNote } from "../utils/db";

interface FileHandlersProps {
  title: () => string;
  content: () => string;
  refetch: () => void;
}

export function useFileHandlers({
  title,
  content,
  refetch,
}: FileHandlersProps) {
  const saveHandler = async () => {
    const fileName = window.prompt(
      "Enter file name",
      title() || "untitled.txt",
    );
    if (!fileName) return;
    const file = new Blob([content()], {
      type: "text/plain",
    });
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const openHandler = async () => {
    if (!("showOpenFilePicker" in globalThis.window)) return;
    // @ts-expect-error showOpenFilePicker is not defined
    const file = await globalThis.window.showOpenFilePicker();
    const fileHandle = file[0];
    const fileStream = await fileHandle.getFile();
    const fileContent = (await fileStream.text()) as string;
    const textarea = document.querySelector("textarea");
    if (textarea) {
      if (textarea.value !== fileContent && textarea.value !== "") {
        const shouldReplce = window.confirm(
          "Do you want to replace the current note?",
        );
        if (!shouldReplce) return;
      }
      await setNote({
        title: fileHandle.name,
        content: fileContent,
      });
      refetch();
      textarea.focus();
      textarea.value = fileContent;
    }
  };

  createEffect(() => {
    const hotkeyListener = (e: KeyboardEvent) => {
      if (e.key === "s" && e.ctrlKey) {
        saveHandler();
        e.preventDefault();
      }
      if (e.key === "o" && e.ctrlKey) {
        openHandler();
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", hotkeyListener);
    return () => {
      document.removeEventListener("keydown", hotkeyListener);
    };
  });

  return { saveHandler, openHandler };
}
