import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { hydrateContentFromCms } from "@/lib/cmsContent";

// Pull content from Strapi (if configured) before the first render so pages
// never flash the bundled defaults. Resolves immediately when no CMS is set.
hydrateContentFromCms().finally(() => {
  createRoot(document.getElementById("root")!).render(<App />);
});
