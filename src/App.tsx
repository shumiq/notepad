import { Suspense } from "solid-js";
import { getTheme } from "./components/ThemeController";
import { getNote, setNote } from "./utils/db";

function App() {
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
        {/* <div class="w-full overflow-y-hidden">
          <div class="flex w-full items-center">
            <div class="">
              <h1>Notepad</h1>
            </div>
            <div class="ml-auto">
              <ThemeController />
            </div>
          </div>
        </div> */}
        <div class="flex-1 overflow-x-hidden overflow-y-hidden">
          <textarea
            class="m-0 h-full w-full resize-none border-none bg-transparent p-2 focus:outline-none"
            autofocus
            value={getNote()}
            onInput={(e) => setNote(e.currentTarget.value)}
          ></textarea>
        </div>
      </Suspense>
    </div>
  );
}

export default App;
