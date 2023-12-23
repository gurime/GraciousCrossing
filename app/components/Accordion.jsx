'use client'
import { useState } from 'react';

const Accordion = ({ title, content }) => {
const [isActive, setIsActive] = useState(false);
const [contentHeight, setContentHeight] = useState(0);
const toggleAccordion = () => {
setIsActive(!isActive);
};

const setContentRef = (element) => {
if (element) {
setContentHeight(element.scrollHeight);
}
};

return (
<div className={`accordion-item ${isActive ? "active" : ""}`}>
<div className="accordion-header" onClick={toggleAccordion}>
<h3>{title}</h3>
<span className="accordion-icon"></span>
</div>
<div
className="accordion-content"
style={{ maxHeight: isActive ? `${contentHeight}px` : 0 }}
ref={setContentRef}
>
<p>{content}</p>
</div>
</div>
);
};

export default Accordion;