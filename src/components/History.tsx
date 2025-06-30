import { toast } from "@moaqzdev/toast/utils";
import type { Component, Link } from "./MainApp";

export default function History({ history }: Props): Component {
  const isVisible: boolean =
    localStorage.getItem("show-history") === null
      ? true
      : JSON.parse(localStorage.getItem("show-history") as string);

  if (!isVisible || !history || history.length == 0) return <></>;

  return (
    <section className="w-full max-w-lg">
      <h2 className="text-2xl font-semibold text-indigo-500 mb-2">Historial</h2>
      <ul className="flex flex-col gap-y-2">
        {history
          .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
          .map(({ url, createdAt }: Link) => (
            <li
              key={url}
              className="bg-gray-800 border-2 text-indigo-400 border-indigo-300/50 rounded-sm px-3 py-2 flex items-center justify-between"
            >
              <div className="flex items-center gap-3 min-w-0 w-full relative">
                <img
                  src={url}
                  alt="preview"
                  className="size-10 w-1/10 object-cover bg-gray-800 rounded-sm"
                  loading="lazy"
                />
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-200 cursor-default hover:text-indigo-300 truncate w-9/10 text-sm pr-3 pb-3"
                >
                  {url.split("upload/")[1]}
                </a>
                <span className="text-xs text-indigo-200/80 absolute bottom-0 left-14">
                  {createdAt}
                </span>
              </div>
              <svg
                onClick={() => {
                  navigator.clipboard.writeText(url);
                  toast.success({ title: "Copiado al portapapeles" });
                }}
                className="duration-75 cursor-pointer size-6 scale-100 hover:scale-105"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21 8C21 6.34315 19.6569 5 18 5H10C8.34315 5 7 6.34315 7 8V20C7 21.6569 8.34315 23 10 23H18C19.6569 23 21 21.6569 21 20V8ZM19 8C19 7.44772 18.5523 7 18 7H10C9.44772 7 9 7.44772 9 8V20C9 20.5523 9.44772 21 10 21H18C18.5523 21 19 20.5523 19 20V8Z"
                  fill="#fff"
                />
                <path
                  d="M6 3H16C16.5523 3 17 2.55228 17 2C17 1.44772 16.5523 1 16 1H6C4.34315 1 3 2.34315 3 4V18C3 18.5523 3.44772 19 4 19C4.55228 19 5 18.5523 5 18V4Cu5 3.44772 5.44772 3 6 3Z"
                  fill="#fff"
                />
              </svg>
            </li>
          ))}
      </ul>
    </section>
  );
}

interface Props {
  history: Link[];
}
