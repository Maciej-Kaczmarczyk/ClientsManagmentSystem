import en from './en.json'
import pl from './pl.json'

import React, { useState } from 'react'

let text = en;

const changeLanguage = (lang) => {
    if (lang === 'pl') {
        text = pl;
    } else {
        text = en;
    }
}

export default text;
export { changeLanguage };