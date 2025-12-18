import { createSignal } from "solid-js";

const [theme, setTheme] = createSignal();

export const getTheme = () =>
  theme() || localStorage.getItem("theme") || "light";

export function ThemeController() {
  return (
    <select
      value={getTheme() as string}
      onChange={(e) => {
        setTheme(e.currentTarget.value);
        localStorage.setItem("theme", e.currentTarget.value);
      }}
      class="select select-xs"
    >
      <option disabled={true}>Select theme</option>
      <option>light</option>
      <option>dark</option>
    </select>
  );
}
