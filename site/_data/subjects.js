import fetchWithRetry from './fetchWithRetry.js'
import subjectSet from './subjectSet.js'

function countTransits(subject) {
  const feedbackTransits = Object.entries(subject.metadata)
    .filter(([key, value]) => key.startsWith('#feedback_') && key.endsWith('_x'))
  subject.metadata.transitCount = feedbackTransits.length
}

function transitCountSort(a, b) {
  return a.metadata.transitCount - b.metadata.transitCount
}

function filterSubjects(subjects) {
  subjects.forEach(countTransits)
  return subjects.sort(transitCountSort)
}

/*
Fetches ALL Subjects from a subject set.

Ouput:
(array of objects) array of Panoptes Subject resources 
 */
async function fetchAllSubjects(query) {
  let allSubjects = []
  let continueFetching = true
  let page = 1

  while (continueFetching) {
    const { subjects, meta } = await fetchSubjectsByPage(query, page)
    allSubjects = allSubjects.concat(subjects)
    continueFetching = (+meta.page <= +meta.page_count) || false
    page++
  }

  allSubjects = allSubjects.map(subject => allSubjects.find(s => s.id === subject.id))
  const uniqueSubjects = [...new Set(allSubjects)]
  console.log('subjects:', uniqueSubjects.length)
  return filterSubjects(uniqueSubjects)
}

/*
Fetches SOME Subjects from a subject set.

Output: (object) {
  subjects: (array) array of Panoptes Subject resources
  meta: (object) contains .count (total items available) and .page_count (total pages available)
}
 */
async function fetchSubjectsByPage(query, page = 1, pageSize = 100) {
  try {
    const { subjects, meta }  = await fetchWithRetry('/subjects', {
      ...query,
      page,
      page_size: pageSize
    })
    return { subjects, meta: meta.subjects }
  } catch (err) {
    console.error('ERROR: fetchSubjectsByPage()')
    console.error('- error: ', err)
    console.error('- args: ', projectId, page, pageSize)
    throw(err)
  }
}

export default fetchAllSubjects({ subject_set_id: subjectSet?.id })