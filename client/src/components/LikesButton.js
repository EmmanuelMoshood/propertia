import React, {useState} from 'react'

function LikesButton() {
    //[currentValue, updateFunction] = useState(initialValue)
    const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>{count} Likes</button>
  )
}

export default LikesButton