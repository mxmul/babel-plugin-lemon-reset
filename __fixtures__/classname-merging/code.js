import React from "react";
import {A, Div} from "lemon-reset";

export function App({ linkClasses }) {
  return (
    <Div className="literal">
      Hello World!
      <A href="https://www.example.com" className={linkClasses.join(" ")}>Link</A>
    </Div>
  );
}
