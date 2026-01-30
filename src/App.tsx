import {
  createEffect,
  createResource,
  createSignal,
  on,
  Show,
  Suspense,
} from "solid-js";
import { AIModal } from "./components/AIModal";
import { Editor } from "./components/Editor";
import { Footer } from "./components/Footer";
import { getTheme } from "./components/ThemeController";
import { Toolbar } from "./components/Toolbar";
import { useAI } from "./hooks/useAI";
import { useFileHandlers } from "./hooks/useFileHandlers";
import { getNote, setNote } from "./utils/db";
import { loading } from "./utils/global";

function App() {
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

  const {
    showAIModal,
    instruction,
    setInstruction,
    openAIModal,
    handleCancel,
    handleSend,
  } = useAI({
    content,
    onContentChange: handleContentInput,
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
        <Toolbar
          title={title}
          onTitleInput={handleTitleInput}
          onRefresh={refetch}
          onOpen={openHandler}
          onDownload={saveHandler}
          onAI={openAIModal}
        />
        <Editor content={content} onContentInput={handleContentInput} />
        <Footer />
        <Show when={loading()}>
          <div class="fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-black/50">
            <span class="loading loading-spinner"></span>
          </div>
        </Show>
        <AIModal
          show={showAIModal()}
          instruction={instruction()}
          onInstructionChange={setInstruction}
          onCancel={handleCancel}
          onSend={handleSend}
        />
      </Suspense>
    </div>
  );
}

export default App;
