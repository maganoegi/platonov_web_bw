import type { PropsWithChildren } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { SegmentedLine } from "./SegmentedLine";

export function Container({ children }: PropsWithChildren) {
  return (
    <div id="container">
      <div className="header">
        <Header />
      </div>

      <div className="content">{children}</div>

      <div className="footer">
        <Footer />
      </div>

      {/* Keep this as a sibling like legacy. It can be last. */}
      <SegmentedLine />
    </div>
  );
}
