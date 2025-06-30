import type { ToasterAttributes } from "@moaqzdev/toast/utils";

declare global {
  namespace preact.JSX {
    interface IntrinsicElements {
      "moaqz-toaster": Partial<ToasterAttributes>;
    }
  }
}
