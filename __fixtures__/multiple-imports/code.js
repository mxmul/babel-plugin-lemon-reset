import React from "react";
// we expect a single import of the CSS file
import {A} from "lemon-reset";
import {Div} from "lemon-reset";

export function App() {
  return (
    <Div>
      Hello World!
      <A href="https://www.example.com">Link</A>
    </Div>
  );
}
