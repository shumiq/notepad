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
  let textareaRef: HTMLTextAreaElement | undefined;

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

  const handleSelectAll = () => {
    if (textareaRef) {
      textareaRef.select();
      textareaRef.focus();
    }
  };

  const handleClear = async () => {
    setContent("");
    await setNote({
      title: title(),
      content: "",
    });
    if (textareaRef) {
      textareaRef.focus();
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content());
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setContent(text);
      await setNote({
        title: title(),
        content: text,
      });
      if (textareaRef) {
        textareaRef.focus();
      }
    } catch (err) {
      console.error("Failed to paste:", err);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    // Ctrl/Cmd + Shift + X: Clear all
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "X") {
      e.preventDefault();
      handleClear();
    }
    // Ctrl/Cmd + Shift + C: Copy all
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "C") {
      e.preventDefault();
      handleCopy();
    }
    // Ctrl/Cmd + Shift + V: Paste all
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "V") {
      e.preventDefault();
      handlePaste();
    }
  };

  return (
    <div
      class="flex h-screen w-screen flex-col gap-0 overflow-hidden"
      data-theme={getTheme()}
      onKeyDown={handleKeyDown}
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
          onSelectAll={handleSelectAll}
          onClear={handleClear}
          onCopy={handleCopy}
          onPaste={handlePaste}
        />
        <Editor
          content={content}
          onContentInput={handleContentInput}
          ref={(el) => {
            textareaRef = el;
          }}
        />
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
