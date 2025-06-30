import { useEffect, useState } from "react";
import Form from "./Form";
import History from "./History";

export default function MainApp(): Component {
  const [history, setHistory] = useState<Link[]>([]);

  useEffect(() => {
    const stored: string | null = localStorage.getItem("links");
    if (stored) setHistory(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("links", JSON.stringify(history));
  }, [history]);

  function addToHistory(link: string): void {
    const isEnabled: boolean =
      JSON.parse(localStorage.getItem("show-history") as string) ?? true;

    if (!isEnabled) return;

    setHistory((prev: Link[]) => [
      ...prev,
      { url: link, createdAt: new Date(Date.now()).toLocaleString() },
    ]);
  }

  return (
    <>
      <Form addToHistory={addToHistory} />
      <History history={history} />
    </>
  );
}

export interface Link {
  url: string;
  createdAt: string;
}

export type Component = React.JSX.Element;

export type Timer = ReturnType<typeof setTimeout>;
