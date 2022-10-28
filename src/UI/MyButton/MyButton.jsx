import React from 'react';
import s from "./MyButton.module.css";

function MyButton({children, ...props}) {
  return (
    <button {...props} className={s.myBtn}>
        {children}
    </button>
  )
}

export default MyButton