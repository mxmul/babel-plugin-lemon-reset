import React from "react";
import _lemonStyles from "lemon-reset/lib/components/LemonReset/LemonReset.css";
import * as DomTags from "lemon-reset";

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
