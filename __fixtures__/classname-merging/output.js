import React from "react";
import _lemonStyles from "lemon-reset/lib/components/LemonReset/LemonReset.css";
import { A, Div } from "lemon-reset";

export function App({ linkClasses }) {
  return (
    <div className={_lemonStyles["lemon--div"] + (" " + "literal")}>
      Hello World!
      <a
        href="https://www.example.com"
        className={_lemonStyles["lemon--a"] + (" " + linkClasses.join(" "))}
      >
        Link
      </a>
    </div>
  );
}
