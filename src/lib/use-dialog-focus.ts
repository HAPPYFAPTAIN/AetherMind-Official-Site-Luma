import { useEffect } from "react";

export function useDialogFocus(
  open: boolean,
  close: () => void,
  panelSelector = ".dash-modal",
) {
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = document.querySelector<HTMLElement>(panelSelector);
    const selector =
      "button:not(:disabled),a[href],input:not(:disabled),select:not(:disabled),textarea:not(:disabled)";
    panel?.querySelector<HTMLElement>(selector)?.focus();
    const keydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
      if (e.key !== "Tab" || !panel) return;
      const nodes = [...panel.querySelectorAll<HTMLElement>(selector)].filter(
        (el) => el.getClientRects().length,
      );
      if (!nodes.length) return;
      const first = nodes[0],
        last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", keydown);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", keydown);
      previous?.focus();
    };
  }, [open, close, panelSelector]);
}
