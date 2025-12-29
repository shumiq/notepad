import { createEffect, createSignal, Show } from "solid-js";
import { Icon } from "./Icon";

const [theme, setTheme] = createSignal();

export const getTheme = () =>
  theme() || localStorage.getItem("theme") || "light";

export function ThemeController() {
  createEffect(() => {
    setTheme(getTheme());
  });
  return (
    <button
      class="btn btn-md btn-square"
      onclick={() => {
        if (theme() !== "light") {
          setTheme("light");
          localStorage.setItem("theme", "light");
        } else {
          setTheme("dark");
          localStorage.setItem("theme", "dark");
        }
      }}
    >
      <Show when={theme() === "light"}>
        <Icon name="light_mode" />
      </Show>
      <Show when={theme() === "dark"}>
        <Icon name="dark_mode" />
      </Show>
    </button>
  );
}
