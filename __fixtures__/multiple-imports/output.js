import React from "react";
// we expect a single import of the CSS file
import _lemonStyles from "lemon-reset/lib/components/LemonReset/LemonReset.css";
import { A } from "lemon-reset";
import { Div } from "lemon-reset";

export function App() {
  return (
    <div className={_lemonStyles["lemon--div"]}>
      Hello World!
      <a href="https://www.example.com" className={_lemonStyles["lemon--a"]}>
        Link
      </a>
    </div>
  );
}
