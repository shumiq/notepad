export function Icon({
  name,
  class: className,
}: {
  name: string;
  class?: string;
}) {
  return (
    <span
      class={`material-symbols-outlined ${className}`}
      style={{ color: "inherit !important", "font-size": "inherit !important" }}
    >
      {name}
    </span>
  );
}
