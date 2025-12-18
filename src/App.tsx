import { createEffect, createResource, Suspense } from "solid-js";
import { getTheme, ThemeController } from "./components/ThemeController";
import { getNote, setNote } from "./utils/db";

function App() {
  const [note, { refetch }] = createResource(getNote);
  const saveHandler = async () => {
    const fileName = window.prompt(
      "Enter file name",
      note()?.title ?? "untitled.txt",
    );
    if (!fileName) return;
    const file = new Blob([note()?.content ?? ""], {
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
  return (
    <div
      class="flex h-screen w-screen flex-col gap-0 overflow-hidden"
      data-theme={getTheme()}
    >
      <Suspense
        fallback={
          <div class="flex h-screen w-screen items-center justify-center">
            <span class="loading loading-spinner"></span>
          </div>
        }
      >
        <div class="flex w-full items-center gap-1 overflow-y-hidden p-1">
          <input
            type="text"
            class="input input-bordered input-xs w-[100px]"
            value={note()?.title ?? "untitled.txt"}
            onInput={async (e) => {
              await setNote({
                title: e.currentTarget.value,
                content: note()?.content ?? "",
              });
            }}
            onBlur={() => {
              refetch();
            }}
          />
          <button class="btn btn-xs" onclick={openHandler}>
            Open
          </button>
          <button class="btn btn-xs" onclick={saveHandler}>
            Download
          </button>
          <div class="ml-auto">
            <ThemeController />
          </div>
        </div>
        <div class="flex-1 overflow-x-hidden overflow-y-hidden">
          <textarea
            class="m-0 h-full w-full resize-none border-none bg-transparent p-2 focus:outline-none"
            autofocus
            value={note()?.content ?? ""}
            onInput={async (e) => {
              await setNote({
                title: note()?.title ?? "untitled.txt",
                content: e.currentTarget.value,
              });
            }}
          ></textarea>
        </div>
      </Suspense>
    </div>
  );
}

export default App;
