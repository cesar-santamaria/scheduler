import React from "react";
import classNames from "classnames";

import "components/Button.scss";

export default function Button(props) {
   const className = classNames( "button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
      }
   )

   return (
   <button 
      className={className}
      disabled={props.disabled}
      onClick={props.onClick}
   >
      {props.children}
   </button>
   );
}
