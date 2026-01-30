import { createSignal } from "solid-js";
import { setLoading } from "../utils/global";

interface UseAIProps {
  content: () => string;
  onContentChange: (val: string) => void;
}

export function useAI({ content, onContentChange }: UseAIProps) {
  const [showAIModal, setShowAIModal] = createSignal(false);
  const [instruction, setInstruction] = createSignal("");

  const openAIModal = () => {
    setShowAIModal(true);
  };

  const handleCancel = () => {
    setShowAIModal(false);
    setInstruction("");
  };

  const handleSend = async () => {
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
        onContentChange(data.output);
      }
    } finally {
      setLoading(false);
      setInstruction("");
    }
  };

  return {
    showAIModal,
    instruction,
    setInstruction,
    openAIModal,
    handleCancel,
    handleSend,
  };
}
