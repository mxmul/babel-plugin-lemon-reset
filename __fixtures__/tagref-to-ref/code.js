import React from "react";
import {A} from "lemon-reset";

export function App() {
  const anchorRef = React.useRef();
  return (
    <A href="https://www.example.com" tagRef={ref}>Clicky</A>
  );
}
