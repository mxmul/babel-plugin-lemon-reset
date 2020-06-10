import React from "react";
import _lemonStyles from "lemon-reset/lib/components/LemonReset/LemonReset.css";

export function Container(props) {
  return <div {...props} className={_lemonStyles["lemon--div"]} />;
}
