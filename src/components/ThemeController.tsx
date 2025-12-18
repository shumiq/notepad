import { createSignal, Show } from "solid-js";

const themeSignal = createSignal();

const [theme, setTheme] = themeSignal;

export const getTheme = () =>
  theme() || localStorage.getItem("theme") || "light";

export function ThemeController() {
  return (
    <>
      <Show when={getTheme() !== "dark"}>
        <button
          onClick={() => {
            setTheme("dark");
            localStorage.setItem("theme", "dark");
          }}
          class="cursor-pointer"
        >
          <span class="material-symbols-outlined swap-off">light_mode</span>
        </button>
      </Show>
      <Show when={getTheme() === "dark"}>
        <button
          onClick={() => {
            setTheme("light");
            localStorage.setItem("theme", "light");
          }}
          class="cursor-pointer"
        >
          <span class="material-symbols-outlined swap-on">dark_mode</span>
        </button>
      </Show>
    </>
  );
}
