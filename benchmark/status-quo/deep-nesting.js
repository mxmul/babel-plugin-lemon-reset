import React from "react";
import { Div } from "lemon-reset";

/** Lighthouse flags pages with DOM trees that:
 *
 * Have more than 1,500 nodes total.
 * Have a depth greater than 32 nodes.
 * Have a parent node with more than 60 child nodes.
 */

const depth = 32;
const children = 60;

function RowWithDeepNesting() {
  let el = <Div>hello world!</Div>;
  for (let i = 0; i < depth; i++) {
    el = <Div>{el}</Div>;
  }
  return el;
}

export default function () {
  const children = [];
  for (let i = 0; i < children; i++) {
    children.push(<RowWithDeepNesting key={i} />);
  }
  return <Div>{children}</Div>;
}
