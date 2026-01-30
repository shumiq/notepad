import type { Accessor } from "solid-js";

interface EditorProps {
  content: Accessor<string>;
  onContentInput: (val: string) => void;
  ref?: (el: HTMLTextAreaElement) => void;
}

export function Editor(props: EditorProps) {
  let lineNumbersRef: HTMLDivElement | undefined;
  let textareaRef: HTMLTextAreaElement | undefined;

  return (
    <div class="flex-1 overflow-hidden">
      <div class="flex h-full w-full">
        <div
          ref={lineNumbersRef}
          class="bg-base-200 text-base-content/40 w-10 overflow-hidden py-2 text-right font-mono text-[13px] select-none"
        >
          <div class="flex flex-col pr-2">
            {Array.from({
              length: props.content().split("\n").length,
            }).map((_, i) => (
              <div class="h-[1.5rem] leading-[1.5rem]">{i + 1}</div>
            ))}
          </div>
        </div>
        <textarea
          ref={(el) => {
            textareaRef = el;
            if (props.ref) props.ref(el);
          }}
          class="m-0 h-full flex-1 resize-none overflow-x-auto border-none bg-transparent p-2 font-mono text-[13px] leading-[1.5rem] whitespace-pre focus:outline-none"
          autofocus
          value={props.content()}
          onScroll={() => {
            if (lineNumbersRef && textareaRef) {
              lineNumbersRef.scrollTop = textareaRef.scrollTop;
            }
          }}
          onInput={async (e) => {
            props.onContentInput(e.currentTarget.value);
          }}
        ></textarea>
      </div>
    </div>
  );
}
