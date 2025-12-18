import {
  createEffect,
  createResource,
  createSignal,
  on,
  Suspense,
} from "solid-js";
import { getTheme, ThemeController } from "./components/ThemeController";
import { getNote, setNote } from "./utils/db";

function App() {
  let lineNumbersRef: HTMLDivElement | undefined;
  let textareaRef: HTMLTextAreaElement | undefined;

  const [note, { refetch }] = createResource(getNote);
  const [content, setContent] = createSignal("");
  const [title, setTitle] = createSignal("");

  createEffect(
    on(note, (n) => {
      if (n) {
        setContent(n.content);
        setTitle(n.title);
      }
    }),
  );
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
        <div class="bg-base-300 flex w-full items-center gap-1 overflow-y-hidden p-1">
          <input
            type="text"
            class="input input-bordered input-xs w-[100px]"
            value={title()}
            onInput={async (e) => {
              const val = e.currentTarget.value;
              setTitle(val);
              await setNote({
                title: val,
                content: content(),
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
        <div class="flex-1 overflow-hidden">
          <div class="flex h-full w-full">
            <div
              ref={(el) => (lineNumbersRef = el)}
              class="bg-base-200 text-base-content/40 w-10 overflow-hidden py-2 text-right font-mono text-[13px] select-none"
            >
              <div class="flex flex-col pr-2">
                {Array.from({
                  length: content().split("\n").length,
                }).map((_, i) => (
                  <div class="h-[1.5rem] leading-[1.5rem]">{i + 1}</div>
                ))}
              </div>
            </div>
            <textarea
              ref={(el) => (textareaRef = el)}
              class="m-0 h-full flex-1 resize-none overflow-x-auto border-none bg-transparent p-2 font-mono text-[13px] leading-[1.5rem] whitespace-pre focus:outline-none"
              autofocus
              value={content()}
              onScroll={() => {
                if (lineNumbersRef && textareaRef) {
                  lineNumbersRef.scrollTop = textareaRef.scrollTop;
                }
              }}
              onInput={async (e) => {
                const val = e.currentTarget.value;
                setContent(val);
                await setNote({
                  title: title(),
                  content: val,
                });
              }}
            ></textarea>
          </div>
        </div>
      </Suspense>
    </div>
  );
}

export default App;
