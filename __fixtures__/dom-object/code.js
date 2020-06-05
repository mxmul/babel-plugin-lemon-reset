import React from "react";
import {DomObject} from "lemon-reset";

export function App() {
  return (
    <DomObject type="application/pdf" data="document.pdf"></DomObject>
  );
}
