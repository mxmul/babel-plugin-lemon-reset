import React from "react";
import _lemonStyles from "lemon-reset/lib/components/LemonReset/LemonReset.css";

export function App() {
  const anchorRef = React.useRef();
  return (
    <a
      href="https://www.example.com"
      ref={ref}
      className={_lemonStyles["lemon--a"]}
    >
      Clicky
    </a>
  );
}
