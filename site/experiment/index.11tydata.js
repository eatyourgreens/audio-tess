function ogImage(subject) {
  const [firstImage] = subject.locations
  return firstImage['image/png']
}

function subjectPreviews({ experiment }) {
  const previews = experiment.map(subject => ({
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