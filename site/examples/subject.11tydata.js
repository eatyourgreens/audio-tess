function subjectTitle({ subject }) {
  return `Subject ${subject.id}`;
}

function subjectLocations({ subject }) {
  return subject.locations.map((loc, index) => ({
    alt: `Page ${index + 1}`,
    src: loc['image/png']
  }))
  .filter(loc => loc.src)
}

function ogImage({ subject }) {
  const [firstImage] = subject.locations
  return firstImage['image/png']
}

function description({ subject }) {
  return `The light curve for subject ${subject.id}`
}

export default {
  eleventyComputed: {
    title: subjectTitle,
    subjectLocations,
    description,
    ogImage
  }
}