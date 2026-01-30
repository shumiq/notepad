import {
  createEffect,
  createResource,
  createSignal,
  on,
  Show,
  Suspense,
} from "solid-js";
import { Editor } from "./components/Editor";
import { Footer } from "./components/Footer";
import { getTheme } from "./components/ThemeController";
import { Toolbar } from "./components/Toolbar";
import { useFileHandlers } from "./hooks/useFileHandlers";
import { getNote, setNote } from "./utils/db";
import { loading, setLoading } from "./utils/global";

function App() {
  const [note, { refetch }] = createResource(getNote);
  const [content, setContent] = createSignal("");
  const [title, setTitle] = createSignal("");
  const [showAIModal, setShowAIModal] = createSignal(false);
  const [instruction, setInstruction] = createSignal("");

  createEffect(
    on(note, (n) => {
      if (n) {
        setContent(n.content);
        setTitle(n.title);
      }
    }),
  );

  const { saveHandler, openHandler } = useFileHandlers({
    title,
    content,
    refetch,
  });

  const handleTitleInput = async (val: string) => {
    setTitle(val);
    await setNote({
      title: val,
      content: content(),
    });
  };

  const handleContentInput = async (val: string) => {
    setContent(val);
    await setNote({
      title: title(),
      content: val,
    });
  };

  const aiHandler = () => {
    setShowAIModal(true);
  };

  const handleAICancel = () => {
    setShowAIModal(false);
    setInstruction("");
  };

  const handleAISend = async () => {
    try {
      setLoading(true);
      setShowAIModal(false);
      const combinedPrompt = `Instruction: ${instruction()}\n\nContent: ${content()}`;
      const response = await fetch("/api/v1/ai/prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: combinedPrompt }),
      });
      const data = await response.json();
      if (typeof data.output === "string") {
        setContent(data.output);
        handleContentInput(data.output);
      }
    } finally {
      setLoading(false);
      setInstruction("");
    }
  };

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
        <Toolbar
          title={title}
          onTitleInput={handleTitleInput}
          onRefresh={refetch}
          onOpen={openHandler}
          onDownload={saveHandler}
          onAI={aiHandler}
        />
        <Editor content={content} onContentInput={handleContentInput} />
        <Footer />
        <Show when={loading()}>
          <div class="fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-black/50">
            <span class="loading loading-spinner"></span>
          </div>
        </Show>
        <Show when={showAIModal()}>
          <div class="fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-black/50">
            <div class="bg-base-100 rounded-box flex w-full max-w-lg flex-col gap-4 p-6 shadow-lg">
              <h3 class="text-lg font-bold">AI Instructions</h3>
              <textarea
                class="textarea textarea-bordered h-32 w-full"
                placeholder="Enter your instructions for the AI..."
                value={instruction()}
                onInput={(e) => setInstruction(e.currentTarget.value)}
              />
              <div class="flex justify-end gap-2">
                <button class="btn btn-ghost" onClick={handleAICancel}>
                  Cancel
                </button>
                <button class="btn btn-primary" onClick={handleAISend}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </Show>
      </Suspense>
    </div>
  );
}

export default App;
