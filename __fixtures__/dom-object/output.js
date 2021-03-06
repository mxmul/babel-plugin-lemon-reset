import React from "react";
import _lemonStyles from "lemon-reset/lib/components/LemonReset/LemonReset.css";
import { DomObject } from "lemon-reset";

export function App() {
  return (
    <object
      type="application/pdf"
      data="document.pdf"
      className={_lemonStyles["lemon--object"]}
    ></object>
  );
}
