import type { ImgHTMLAttributes } from "react";
import { DarkImg } from "@/constance/data";

// Swaps to the dark-theme variant (if any) via the `.dark` class, no JS theme lookup needed.
function ThemeImg({ src = "", className = "", ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const dark = DarkImg[src];
  if (!dark) return <img src={src} className={className} {...props} />;
  return (
    <>
      <img src={src} className={`${className} dark:hidden`} {...props} />
      <img src={dark} className={`${className} hidden dark:block`} {...props} />
    </>
  );
}

export default ThemeImg;
