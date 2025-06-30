import type { Component } from "./MainApp";

export default function BlurLoader({
  loadingLink,
  showSuccess,
}: Props): Component {
  return (
    <>
      {showSuccess && (
        <div className="absolute flex items-center justify-center pb-16 inset-0 z-50 pointer-events-none sm:rounded-sm backdrop-blur-xs">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="size-30"
          >
            <path
              d="M12 6.5L12 17.5M12 17.5L16 12.9118M12 17.5L8 12.9118"
              stroke="oklch(93% 0.034 272.788)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </div>
      )}
      {loadingLink && !showSuccess && (
        <div className="absolute pb-16 w-full pointer-events-none backdrop-blur-xs h-full flex items-center justify-center sm:rounded-sm top-0 left-0 z-50">
          <span className="size-16 border-8 border-t-indigo-600 border-white rounded-full animate-spin" />
        </div>
      )}
    </>
  );
}

interface Props {
  loadingLink: boolean;
  showSuccess: boolean;
}
