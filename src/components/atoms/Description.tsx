import { useState } from "react";

const Description = ({ text, amountOfWords = 40 }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const splittedText = text.split(' ')
  const itCanOverflow = splittedText.length > amountOfWords
  const beginText = itCanOverflow
    ? splittedText.slice(0, amountOfWords - 1).join(' ')
    : text
  const endText = splittedText.slice(amountOfWords - 1).join(' ')
  return <p className="font-light text-left text-md text-[#ffd8e4]">
    {beginText} {" "}
    {itCanOverflow && <>
      {!isExpanded && <span>... </span>}
      <span className={`${!isExpanded && 'hidden'}`} >
        {endText}
      </span>

      <span className="text-left text-[#d0bcff] cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? " Show less" : " Show more"}
      </span>
    </>}
  </p>
};

export default Description;