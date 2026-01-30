import { Show } from "solid-js";

interface AIModalProps {
  show: boolean;
  instruction: string;
  onInstructionChange: (val: string) => void;
  onCancel: () => void;
  onSend: () => void;
}

export function AIModal(props: AIModalProps) {
  return (
    <Show when={props.show}>
      <div class="fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-black/50">
        <div class="bg-base-100 rounded-box flex w-full max-w-lg flex-col gap-4 p-6 shadow-lg">
          <h3 class="text-lg font-bold">AI Instructions</h3>
          <textarea
            class="textarea textarea-bordered h-32 w-full"
            placeholder="Enter your instructions for the AI..."
            value={props.instruction}
            onInput={(e) => props.onInstructionChange(e.currentTarget.value)}
          />
          <div class="flex justify-end gap-2">
            <button class="btn btn-ghost" onClick={props.onCancel}>
              Cancel
            </button>
            <button class="btn btn-primary" onClick={props.onSend}>
              Send
            </button>
          </div>
        </div>
      </div>
    </Show>
  );
}
