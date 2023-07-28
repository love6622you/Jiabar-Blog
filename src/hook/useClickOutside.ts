import { useEffect, useRef } from "react";

const DEFAULT_EVENTS = ["mousedown", "touchstart"];

export const useClickOutside = <T extends HTMLElement>(
  handler: () => void,
  events: string[] = DEFAULT_EVENTS,
  nodes: (HTMLElement | null)[] = []
) => {
  const ref = useRef<T>();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const listener = (event: any) => {
      const { target } = event ?? {};

      if (Array.isArray(nodes)) {
        const shouldIgnore =
          target?.hasAttribute("data-ignore-outside-clicks") ||
          (!document.body.contains(target) && target.tagName !== "HTML");

        const shouldTrigger = nodes.every((node) => node && !event.composedPath().includes(node));

        shouldTrigger && !shouldIgnore && handler();
      } else if (ref.current && !ref.current.contains(target)) {
        handler();
      }
    };

    events.forEach((fn) => document.addEventListener(fn, listener));

    return () => {
      events.forEach((fn) => document.removeEventListener(fn, listener));
    };
  }, [handler, events, nodes]);

  return ref;
};
