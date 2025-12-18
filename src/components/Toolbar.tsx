import type { Accessor } from "solid-js";
import { ThemeController } from "./ThemeController";

interface ToolbarProps {
  title: Accessor<string>;
  onTitleInput: (val: string) => void;
  onRefresh: () => void;
  onOpen: () => void;
  onDownload: () => void;
}

export function Toolbar(props: ToolbarProps) {
  return (
    <div class="bg-base-300 flex w-full items-center gap-1 overflow-y-hidden p-1">
      <input
        type="text"
        class="input input-bordered input-xs w-[100px]"
        value={props.title()}
        onInput={async (e) => {
          props.onTitleInput(e.currentTarget.value);
        }}
        onBlur={() => {
          props.onRefresh();
        }}
      />
      <button class="btn btn-xs" onclick={props.onOpen}>
        Open
      </button>
      <button class="btn btn-xs" onclick={props.onDownload}>
        Download
      </button>
      <div class="ml-auto">
        <ThemeController />
      </div>
    </div>
  );
}
