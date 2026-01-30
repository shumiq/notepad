import type { Accessor } from "solid-js";
import { Icon } from "./Icon";
import { ThemeController } from "./ThemeController";

interface ToolbarProps {
  title: Accessor<string>;
  onTitleInput: (val: string) => void;
  onRefresh: () => void;
  onOpen: () => void;
  onDownload: () => void;
  onAI: () => void;
  onSelectAll: () => void;
  onClear: () => void;
  onCopy: () => void;
  onPaste: () => void;
}

export function Toolbar(props: ToolbarProps) {
  return (
    <div class="bg-base-300 flex w-full items-center gap-1 overflow-y-hidden p-1">
      <input
        type="text"
        class="input input-bordered input-md w-[100px]"
        value={props.title()}
        onInput={async (e) => {
          props.onTitleInput(e.currentTarget.value);
        }}
        onBlur={() => {
          props.onRefresh();
        }}
      />
      <button class="btn btn-md btn-square" onclick={props.onOpen}>
        <Icon name="folder_open" />
      </button>
      <button class="btn btn-md btn-square" onclick={props.onDownload}>
        <Icon name="download" />
      </button>
      <button class="btn btn-md btn-square" onclick={props.onAI}>
        <Icon name="wand_shine" />
      </button>
      <div class="bg-base-content/20 mx-1 h-6 w-px"></div>
      <button class="btn btn-md btn-square" onclick={props.onSelectAll}>
        <Icon name="select_all" />
      </button>
      <button class="btn btn-md btn-square" onclick={props.onClear}>
        <Icon name="delete" />
      </button>
      <button class="btn btn-md btn-square" onclick={props.onCopy}>
        <Icon name="content_copy" />
      </button>
      <button class="btn btn-md btn-square" onclick={props.onPaste}>
        <Icon name="content_paste" />
      </button>
      <div class="ml-auto">
        <ThemeController />
      </div>
    </div>
  );
}
