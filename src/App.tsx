import {
  createEffect,
  createResource,
  createSignal,
  on,
  Suspense,
} from "solid-js";
import { getTheme } from "./components/ThemeController";
import { getNote, setNote } from "./utils/db";
import { Toolbar } from "./components/Toolbar";
import { Editor } from "./components/Editor";
import { useFileHandlers } from "./hooks/useFileHandlers";

import { Footer } from "./components/Footer";

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
        />
        <Editor content={content} onContentInput={handleContentInput} />
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
