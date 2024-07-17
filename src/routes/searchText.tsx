import React, { useState, ChangeEvent } from 'react'

export default () => {
  const [query, setQuery] = useState<string>('')

  const text = `
    <h2>Genesis 1</h2>
    <p>In the beginning God created the heavens and the earth. The earth was without form, and void; and darkness was on the face of the deep. And the Spirit of God was hovering over the face of the waters.</p>
    <p>Then God said, “Let there be light”; and there was light. And God saw the light, that it was good; and God divided the light from the darkness. God called the light Day, and the darkness He called Night. So the evening and the morning were the first day.</p>
    <p>Then God said, “Let there be a firmament in the midst of the waters, and let it divide the waters from the waters.” Thus God made the firmament, and divided the waters which were under the firmament from the waters which were above the firmament; and it was so. And God called the firmament Heaven. So the evening and the morning were the second day.</p>
    <p>Then God said, “Let the waters under the heavens be gathered together into one place, and let the dry land appear”; and it was so. And God called the dry land Earth, and the gathering together of the waters He called Seas. And God saw that it was good.</p>
    <p>Then God said, “Let the earth bring forth grass, the herb that yields seed, and the fruit tree that yields fruit according to its kind, whose seed is in itself, on the earth”; and it was so. And the earth brought forth grass, the herb that yields seed according to its kind, and the tree that yields fruit, whose seed is in itself according to its kind. And God saw that it was good. So the evening and the morning were the third day.</p>
    <p>Then God said, “Let there be lights in the firmament of the heavens to divide the day from the night; and let them be for signs and seasons, and for days and years; and let them be for lights in the firmament of the heavens to give light on the earth”; and it was so. Then God made two great lights: the greater light to rule the day, and the lesser light to rule the night. He made the stars also. God set them in the firmament of the heavens to give light on the earth, and to rule over the day and over the night, and to divide the light from the darkness. And God saw that it was good. So the evening and the morning were the fourth day.</p>
    `

  const highlightedText = query ? text.replace(new RegExp(`(${query})`, 'gi'), '<mark>$1</mark>') : text

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  return (
    <div>
      <h1>Text Search</h1>
      <input
        className='form-control'
        type='text'
        value={query}
        onChange={handleInputChange}
        placeholder='Enter search term'
      />
      <div className='col-md-8 mt-3' dangerouslySetInnerHTML={{ __html: highlightedText }} />
    </div>
  )
}
