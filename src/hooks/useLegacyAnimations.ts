import { useEffect } from "react";

// Tiny helpers (intentionally simple to avoid behavior drift)
function qs(sel: string): HTMLElement | null {
  return document.querySelector(sel);
}
function qsa(sel: string): HTMLElement[] {
  return Array.from(document.querySelectorAll(sel));
}

function elementVisibility(sel: string, show: boolean) {
  const speed = 50; // matches your jQuery speed
  qsa(sel).forEach((el) => {
    if (show) {
      el.style.display = ""; // let CSS decide
      el.style.opacity = "0";
      // emulate show("fast") + animate opacity
      requestAnimationFrame(() => {
        setTimeout(() => {
          el.style.opacity = "1";
        }, 0);
      });
    } else {
      el.style.opacity = "0";
      setTimeout(() => {
        el.style.display = "none";
      }, speed);
    }
  });
}

function moveHi(direction: "up" | "down") {
  if (window.innerWidth > 600) {
    const el = qs(".hi");
    if (!el) return;
    el.style.transform = direction === "up" ? "translateY(50%)" : "translateY(200%)";
  }
}

function moveLine(direction: "left" | "right") {
  const delay = 50;
  const val = direction === "left" ? "1" : "0";
  const segments = [".s1", ".s2", ".s3", ".s4", ".s5", ".s6", ".s7", ".s8"];

  // exact sequential chain (not parallel)
  segments.reduce((p, sel) => {
    return p.then(
      () =>
        new Promise<void>((res) => {
          const el = qs(sel);
          if (el) el.style.opacity = val;
          setTimeout(res, delay);
        })
    );
  }, Promise.resolve());
}

export function useLegacyAnimations(opts: { path: string; onBack: () => void }) {
  useEffect(() => {
    // Initial visibility (matches $(document).ready initial state)
    // Home route: show nav; hide section elements
    if (opts.path === "/") {
      moveLine("right");
      moveHi("down");

      elementVisibility(".backbtn", false);
      elementVisibility(".sectionTitle", false);
      elementVisibility(".sectionContent", false);
      elementVisibility(".aboutImages", false);
      elementVisibility(".aboutContent", false);
      elementVisibility(".ProgLanguageGrid", false);
      elementVisibility(".GenDescTitle", false);
      elementVisibility(".GenDescContent", false);
      elementVisibility(".WhatDoIKnow", false);
      elementVisibility(".OpenSource", false);
      elementVisibility(".workContent", false);
      elementVisibility(".spotifyContainer", false);

      // show nav
      const nav = qs("#myNav");
      if (nav) {
        nav.style.display = "";
        nav.style.opacity = "1";
      }
      return;
    }

    // Section routes: hide nav then show items
    moveLine("left");
    moveHi("up");

    const nav = qs("#myNav");
    if (nav) {
      nav.style.opacity = "0";
      setTimeout(() => {
        nav.style.display = "none";
      }, 50);
    }

    // universal section elements
    elementVisibility(".backbtn", true);
    elementVisibility(".sectionTitle", true);
    elementVisibility(".sectionContent", true);

    if (opts.path === "/about") {
      elementVisibility(".aboutImages", true);
      elementVisibility(".aboutContent", true);
      // first picture flip is handled by useAboutFlipOnScroll (initial flip window)
    }

    if (opts.path === "/work") {
      elementVisibility(".ProgLanguageGrid", true);
      elementVisibility(".GenDescTitle", true);
      elementVisibility(".GenDescContent", true);
      elementVisibility(".WhatDoIKnow", true);
      elementVisibility(".OpenSource", true);
      elementVisibility(".workContent", true);
    }

    if (opts.path === "/contact") {
      elementVisibility(".spotifyContainer", true);
    }
  }, [opts.path, opts.onBack]);
}
