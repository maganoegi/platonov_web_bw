import { useEffect } from "react";

const Picturelements = [
  "#me1", "#me2", "#me3", "#me4", "#me5", "#me6", "#me7", "#me8", "#me9",
  "#me21", "#me22", "#me23", "#me24", "#me25", "#me26", "#me27", "#me28", "#me29",
  "#bb1", "#bb2", "#bb3", "#bb4", "#bb5", "#bb6", "#bb7", "#bb8", "#bb9"
];

function getScrollPercentage() {
  const h = document.documentElement;
  const b = document.body;
  const st = "scrollTop" as const;
  const sh = "scrollHeight" as const;
  const top = (h[st] || b[st]) as number;
  const height = (h[sh] || b[sh]) as number;
  return (top / (height - h.clientHeight)) * 100;
}

function flip(el: HTMLElement) {
  el.classList.add("visible");
  el.style.transform = "rotateY(180deg)";
}

function backflip(el: HTMLElement) {
  el.classList.remove("visible");
  el.style.transform = "rotateY(0deg)";
}

export function useAboutFlipOnScroll() {
  useEffect(() => {
    // initial flip window (matches AnimateFirstPicture())
    for (let i = 0; i < 9; i++) {
      const holder = document.querySelector(Picturelements[i]);
      const flipper = holder?.querySelector("div.flipper") as HTMLElement | null;
      if (flipper && !flipper.classList.contains("visible")) flip(flipper);
    }

    function onScroll() {
      const currentRelative = Math.round(getScrollPercentage() / 3.6);

      let lower = 0;
      let higher = 0;

      if (currentRelative <= 3) {
        lower = 0;
        higher = lower + 8;
      } else if (currentRelative >= 23) {
        higher = 26;
        lower = higher - 8;
      } else {
        lower = currentRelative - 4;
        higher = currentRelative + 4;
      }

      for (let i = 0; i < 27; i++) {
        const holder = document.querySelector(Picturelements[i]);
        const flipper = holder?.querySelector("div.flipper") as HTMLElement | null;
        if (!flipper) continue;

        if (i >= lower && i <= higher) {
          if (!flipper.classList.contains("visible")) flip(flipper);
        } else {
          if (flipper.classList.contains("visible")) backflip(flipper);
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}
