import React from "react";
import SuperInputText from "../common/c1-SuperInputText/SuperInputText";
import SuperButton from "../common/c2-SuperButton/SuperButton";
import SuperCheckbox from "../common/c3-SuperCheckbox/SuperCheckbox";

export function TastsPage() {
    return <div>test page
        <div>input <SuperInputText/></div>
        <div><SuperButton>button</SuperButton></div>
        <div><SuperCheckbox/>checkbox</div>
    </div>
}