import { useEffect, useState } from "preact/hooks";
import { useDropzone } from "react-dropzone";
import coverImage from "/cover.webp?url";
import { twJoin, twMerge } from "tailwind-merge";
import BlurLoader from "./BlurLoader";
import SettingPopup from "./SettingPopup";
import { toast } from "@moaqzdev/toast/utils";
import type { Component, Timer } from "./MainApp";

const API_CLOUDINARY: string =
  "https://api.cloudinary.com/v1_1/dgs55s8qh/image/upload";
const DEFAULT_COVER_URL: string =
  "https://res.cloudinary.com/dgs55s8qh/image/upload/v1751309836/pzhmk6aissc5a4kkpxmt.jpg";

export default function Form({ addToHistory }: Props): Component {
  const defaultUrl: string = String(location),
    [newLink, setNewLink] = useState<string>(defaultUrl),
    [loadingLink, setLoadingLink] = useState<boolean>(false),
    [disableBtn, setDisabledBtn] = useState<boolean>(false),
    [showSuccess, setShowSuccess] = useState<boolean>(false),
    [showSetting, setShowSetting] = useState<boolean>(false),
    { getRootProps, getInputProps, acceptedFiles } = useDropzone(),
    [lastFile, setLastFile] = useState<File>(acceptedFiles[0]);

  useEffect(() => {
    if (acceptedFiles[0]) {
      setLastFile(acceptedFiles[0]);
      setDisabledBtn(false);
      setNewLink(defaultUrl);
    }
  }, [acceptedFiles]);

  async function onSubmit(event: Event): Promise<void | (() => void)> {
    event.preventDefault();

    if (disableBtn)
      return toast.info({ title: "Ya generaste un link para esa imagen" });

    setLoadingLink(true);
    setDisabledBtn(true);

    if (!acceptedFiles[0]) {
      setTimeout(() => {
        setLoadingLink(false);
        setShowSuccess(true);
        setNewLink(DEFAULT_COVER_URL);
      }, 1500);
      const timer: Timer = setTimeout(() => setShowSuccess(false), 2000);
      return () => clearTimeout(timer);
    }

    const formData: FormData = new FormData();

    try {
      formData.append("file", acceptedFiles[0]);
      formData.append("upload_preset", "arjhb0vs");
      const res: Response = await fetch(API_CLOUDINARY, {
        method: "POST",
        body: formData,
      });
      const { secure_url: url }: { secure_url: string } = await res.json();
      setNewLink(url);
      addToHistory(url);
      setShowSuccess(true);
      const timer: Timer = setTimeout(() => setShowSuccess(false), 2000);
      return () => clearTimeout(timer);
    } catch (err: any) {
      console.error(err.message);
      toast.error({
        title: "Ocurrio un error",
        description: "Por favor, intenta nuevamente",
      });
    } finally {
      setLoadingLink(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-lg px-4 md:px-6 py-6 md:py-8 flex flex-col items-center md:items-start justify-between gap-y-10 sm:rounded-sm bg-gray-800 border-y-2 sm:border-2 border-indigo-300/50 relative"
    >
      <button
        type="button"
        className="absolute top-2 right-2 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
        onClick={() => setShowSetting(true)}
        aria-label="Abrir preferencias"
      >
        <svg
          class="size-9"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M11.7 14C10.623 14 9.74999 13.1046 9.74999 12C9.74999 10.8954 10.623 10 11.7 10C12.7769 10 13.65 10.8954 13.65 12C13.65 12.5304 13.4445 13.0391 13.0789 13.4142C12.7132 13.7893 12.2172 14 11.7 14Z"
            stroke="#fff"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16.8841 16.063V14.721C16.8841 14.3887 17.0128 14.07 17.2419 13.835L18.1672 12.886C18.6443 12.3967 18.6443 11.6033 18.1672 11.114L17.2419 10.165C17.0128 9.93001 16.8841 9.61131 16.8841 9.27899V7.93599C16.8841 7.24398 16.3371 6.68299 15.6624 6.68299H14.353C14.029 6.68299 13.7182 6.55097 13.4891 6.31599L12.5638 5.36699C12.0867 4.87767 11.3132 4.87767 10.8361 5.36699L9.91087 6.31599C9.68176 6.55097 9.37102 6.68299 9.04702 6.68299H7.73759C7.41341 6.68299 7.10253 6.81514 6.87339 7.05034C6.64425 7.28554 6.51566 7.6045 6.51592 7.93699V9.27899C6.51591 9.61131 6.3872 9.93001 6.15809 10.165L5.23282 11.114C4.75573 11.6033 4.75573 12.3967 5.23282 12.886L6.15809 13.835C6.3872 14.07 6.51591 14.3887 6.51592 14.721V16.063C6.51592 16.755 7.06288 17.316 7.73759 17.316H9.04702C9.37102 17.316 9.68176 17.448 9.91087 17.683L10.8361 18.632C11.3132 19.1213 12.0867 19.1213 12.5638 18.632L13.4891 17.683C13.7182 17.448 14.029 17.316 14.353 17.316H15.6614C15.9856 17.3163 16.2966 17.1844 16.5259 16.9493C16.7552 16.7143 16.8841 16.3955 16.8841 16.063Z"
            stroke="#fff"
            stroke-width="1"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </button>
      {showSetting && <SettingPopup onClose={() => setShowSetting(false)} />}
      <BlurLoader loadingLink={loadingLink} showSuccess={showSuccess} />

      <h1 className="text-3xl md:text-4xl text-balance font-bold text-center w-full text-white">
        <span className="text-indigo-300">Imagen</span>&nbsp;a&nbsp;
        <span className="text-indigo-300">Link</span>
      </h1>

      <section className="flex flex-col md:flex-row justify-between h-full md:h-40 items-center w-full gap-y-4 md:gap-y-0 md:gap-x-8">
        {/* @ts-ignore-next-line */}
        <div
          {...getRootProps()}
          className="flex font-semibold text-xl md:text-2xl justify-center items-center bg-slate-600 w-full md:w-4/6 min-h-20 border-2 border-dashed border-indigo-100 rounded-sm h-full px-6"
        >
          {/* @ts-ignore-next-line */}
          <input {...getInputProps()} accept="image/*" multiple={false} />
          <p className="text-slate-200 italic select-none text-center text-balance">
            Suelta la imagen o haz clic aquí
          </p>
        </div>

        {acceptedFiles[0] ? (
          <img
            src={URL.createObjectURL(acceptedFiles[0])}
            alt="Imagen generada"
            className="h-28 sm:h-full w-2/6 max-w-36 self-center rounded-sm"
          />
        ) : lastFile ? (
          <img
            src={URL.createObjectURL(lastFile)}
            alt="Imagen generada"
            className="h-28 sm:h-full w-2/6 max-w-36 self-center rounded-sm"
          />
        ) : (
          <img
            src={coverImage}
            alt="Imagen por defecto"
            className="h-28 sm:h-full w-2/6 max-w-36 self-center rounded-sm"
          />
        )}
      </section>

      <button
        className={twJoin(
          "opacity-100 w-full self-center py-2 font-semibold rounded-sm text-white text-xl md:text-2xl duration-75 border bg-indigo-600 hover:scale-[0.98] hover:bg-indigo-700 cursor-pointer",
          (loadingLink || showSuccess) && "pointer-events-none"
        )}
        type="submit"
      >
        Generar Link
      </button>

      <div
        className={twMerge(
          loadingLink ? "z-auto" : "z-50",
          "w-full flex flex-col justify-center items-start gap-y-1"
        )}
      >
        <h2 className="text-xl font-semibold text-gray-100">Nuevo Link:</h2>
        <div className="flex justify-center items-center w-full">
          <div className="p-2 w-full h-12 overflow-y-hidden overflow-x-auto bg-gray-200 flex justify-center items-center border-y-2 border-x-2 rounded-l-sm border-indigo-600 relative">
            <a
              className={twMerge(
                newLink == defaultUrl
                  ? "text-indigo-800/90 pointer-events-none"
                  : "text-indigo-800 hover:text-indigo-500 hover:underline",
                "tracking-tighter w-full text-start text-lg whitespace-nowrap"
              )}
              href={newLink == defaultUrl ? "" : newLink}
              target="_blank"
              rel="noreferrer"
            >
              {newLink}
            </a>
          </div>
          <svg
            viewBox="0 0 24 24"
            onClick={() => {
              if (newLink == defaultUrl) return;
              window.navigator.clipboard.writeText(newLink);
              toast.success({ title: "Copiado al portapapeles" });
            }}
            className={twJoin(
              newLink != defaultUrl && "cursor-pointer hover:brightness-125",
              "duration-75 rounded-r-sm p-2 h-12 w-14 bg-indigo-600"
            )}
          >
            <path
              d="M21 8C21 6.34315 19.6569 5 18 5H10C8.34315 5 7 6.34315 7 8V20C7 21.6569 8.34315 23 10 23H18C19.6569 23 21 21.6569 21 20V8ZM19 8C19 7.44772 18.5523 7 18 7H10C9.44772 7 9 7.44772 9 8V20C9 20.5523 9.44772 21 10 21H18C18.5523 21 19 20.5523 19 20V8Z"
              fill="#fff"
            />
            <path
              d="M6 3H16C16.5523 3 17 2.55228 17 2C17 1.44772 16.5523 1 16 1H6C4.34315 1 3 2.34315 3 4V18C3 18.5523 3.44772 19 4 19C4.55228 19 5 18.5523 5 18V4C5 3.44772 5.44772 3 6 3Z"
              fill="#fff"
            />
          </svg>
        </div>
      </div>
    </form>
  );
}

interface Props {
  addToHistory: (link: string) => void;
}
