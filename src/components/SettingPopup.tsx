import { useEffect, useState } from "preact/hooks";
import type { Component, Timer } from "./MainApp";

export default function SettingPopup({ onClose }: Props): Component {
  const [showPP, setPP] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(
    JSON.parse(localStorage.getItem("show-history") ?? "true")
  );
  const [darkMode, setDarkMode] = useState<boolean>(
    JSON.parse(localStorage.getItem("dark-mode") ?? "true")
  );

  function clearHistory(): void {
    localStorage.removeItem("links");
    location.reload();
  }

  function toggleHistory(): void {
    const newValue: boolean = !showHistory;
    localStorage.removeItem("links");
    localStorage.setItem("show-history", JSON.stringify(newValue));
    setShowHistory(newValue);
    location.reload();
  }
  function toggleDarkMode(): void {
    const newValue: boolean = !darkMode;
    localStorage.setItem("dark-mode", JSON.stringify(newValue));
    setDarkMode(newValue);

    if (newValue) {
      document.body.classList.add("bg-slate-950");
      document.body.classList.remove("bg-slate-300");
    } else {
      document.body.classList.add("bg-slate-300");
      document.body.classList.remove("bg-slate-950");
    }
    location.reload();
  }

  function exportHistory(): void {
    const data: string = localStorage.getItem("links") as string,
      json: string = data ? JSON.stringify(JSON.parse(data), null, 2) : "[]",
      blob: Blob = new Blob([json], { type: "application/json" }),
      url: string = URL.createObjectURL(blob),
      link: HTMLAnchorElement = document.createElement("a");
    link.href = url;
    link.download = "imagen-a-link-historial.json";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[999] sm:pb-16 flex items-start sm:items-center justify-center bg-black/40 backdrop-blur-xl text-slate-100"
    >
      <div
        onClick={(e: Event) => e.stopPropagation()}
        className="bg-slate-800 sm:rounded-md px-10 h-[350px] w-full max-w-lg relative flex flex-col items-center justify-center"
      >
        <button
          type="button"
          onClick={onClose}
          class="absolute font-sans top-1 right-3 font-semibold text-lg cursor-pointer opacity-80 hover:opacity-100"
        >
          x
        </button>
        {showPP ? (
          <>
            <p class="text-sm w-full text-start">
              Todos los links, imagenes, fechas y horarios generados por&nbsp;
              {location.host}&nbsp;se almacenan local y temporalmente en tu
              navegador. Solo tú tienes acceso a estos datos.
              <br />
              <br />
              Si prefieres, puedes deshabilitar y/o vaciar el historial para que
              ningún dato se almacene localmente.
              <br />
              <br />
              <a
                href="mailto:gixi@lym.software"
                target="_blank"
                rel="noopener noreferrer"
                class="flex w-max"
              >
                Soporte:&nbsp;
                <address class="hover:underline">gixi@lym.software</address>
              </a>
            </p>
          </>
        ) : (
          <>
            <div class="w-full flex justify-between items-center border-b border-indigo-300/60 py-3">
              <p class="text-sm">Modo oscuro</p>

              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={darkMode}
                  class="sr-only peer"
                  value=""
                />
                <div
                  onClick={toggleDarkMode}
                  class="group peer rounded-full duration-300 w-16 h-8 scale-70 ring-2 ring-indigo-300 after:duration-300 after:bg-indigo-300 peer-checked:after:bg-indigo-300 peer-checked:ring-indigo-300 after:rounded-full after:absolute after:h-6 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-hover:after:scale-95"
                ></div>
              </label>
            </div>
            <div class="w-full flex justify-between items-center border-b border-indigo-300/60 py-3">
              <p class="text-sm">Habilitar historial</p>
              <label class="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showHistory}
                  class="sr-only peer"
                  value=""
                />
                <div
                  onClick={toggleHistory}
                  class="group peer rounded-full duration-300 w-16 h-8 scale-70 ring-2 ring-indigo-300 after:duration-300 after:bg-indigo-300 peer-checked:after:bg-indigo-300 peer-checked:ring-indigo-300 after:rounded-full after:absolute after:h-6 after:w-6 after:top-1 after:left-1 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-hover:after:scale-95"
                ></div>
              </label>
            </div>
            <div class="w-full flex justify-between items-center border-b border-indigo-300/60 py-3">
              <p class="text-sm">Vaciar historial</p>
              <svg
                onClick={clearHistory}
                class="size-8 mr-4 bg-indigo-300 hover:bg-indigo-200 cursor-pointer rounded-sm"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9 4.5V6H6V7.5H18V6H15V4.5H9ZM6.75 8.25H8.25V17.6893L8.56066 18H15.4393L15.75 17.6893V8.25H17.25V18.3107L16.0607 19.5H7.93934L6.75 18.3107V8.25Z"
                  fill="#000"
                />
              </svg>
            </div>
            <div class="w-full flex justify-between items-center border-indigo-300/60 py-3">
              <p class="text-sm">Exportar historial en JSON</p>
              <svg
                onClick={exportHistory}
                class="size-8 mr-4 bg-indigo-300 hover:bg-indigo-200 p-1 cursor-pointer rounded-sm"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <footer class="flex flex-col gap-y-2 sm:flex-row w-full text-slate-300 items-start sm:items-center justify-between text-xs mt-4 sm:mt-6">
              <a
                target="_blank"
                href="https://github.com/gixi404/imagen-a-link"
                class="opacity-80 hover:underline cursor-default hover:opacity-100 text-start"
              >
                Repositorio de GitHub
              </a>
              <button
                type="button"
                onClick={() => setPP(true)}
                class="opacity-80 hover:underline cursor-default hover:opacity-100 text-start"
              >
                Política de Privacidad
              </button>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}

interface Props {
  onClose: () => void;
}
