export type Lang = "en" | "fr" | "es" | "ru" | "nl";

export type International = Record<
  Lang,
  {
    name: string;
    back: string;
    about: { nav: string; title: string; content: string };
    work: {
      nav: string;
      title: string;
      GenDescTitle: string;
      GenDescContent: string;
      WhatDoIKnow: string;
      OpenSource: string;
    };
    contact: { nav: string; title: string; content: string };
  }
>;
