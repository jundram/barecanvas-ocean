"use client";

import { useEffect, useRef, useState } from "react";

/* The research page is a self-contained static document in
 * public/taxlens/ (charts, the in-browser scorer and its model bundle).
 * It is embedded inline and sizes itself: the document posts its height
 * whenever it changes, and we mirror the site's light/dark surface into it. */
export default function TaxLensFrame() {
  const ref = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(1200);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.source === ref.current?.contentWindow && typeof e.data?.taxlensHeight === "number") {
        setHeight(Math.ceil(e.data.taxlensHeight));
      }
    };
    window.addEventListener("message", onMessage);

    const sendTheme = () => {
      const theme = document.body.dataset.surface === "light" ? "light" : "dark";
      ref.current?.contentWindow?.postMessage({ taxlensTheme: theme }, "*");
    };
    const observer = new MutationObserver(sendTheme);
    observer.observe(document.body, { attributes: true, attributeFilter: ["data-surface"] });
    const frame = ref.current;
    frame?.addEventListener("load", sendTheme);

    return () => {
      window.removeEventListener("message", onMessage);
      observer.disconnect();
      frame?.removeEventListener("load", sendTheme);
    };
  }, []);

  const initialTheme =
    typeof document !== "undefined" && document.body.dataset.surface === "light" ? "light" : "dark";

  return (
    <iframe
      ref={ref}
      src={`/taxlens/index.html?theme=${initialTheme}`}
      title="TaxLens research"
      style={{ height }}
      className="block w-full border-0 rounded-2xl overflow-hidden"
      loading="lazy"
    />
  );
}
