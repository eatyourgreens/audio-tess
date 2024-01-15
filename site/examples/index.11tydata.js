function ogImage(subject) {
  const [firstImage] = subject.locations
  return firstImage['image/png']
}

function subjectPreviews({ examples }) {
  const previews = examples.map(subject => ({
    id: subject.id,
    preview: ogImage(subject)
  }))
  return previews
}

export default {
  eleventyComputed: {
    subjectPreviews
  }
}