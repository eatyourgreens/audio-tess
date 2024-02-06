import fetchWithRetry from './fetchWithRetry.js'

const EXAMPLES = [
// subject, transits
  94880862, // 3
  94880864, // 3
  94879057, // 3
  94878694, // 2
  94879597, // 2
  94879726, // 2
  94880124, // 2
  94879979, // 2
  94878602, // 1
  94878691, // 2
  94880222, // 3
  94879225, // 3
  94880438, // 3
  94879329, // 3
  94878733, // 2
  94878682, // 2
  94878411, // 2
  94878661, // 2
  94880022, // 1
  94880415, // 1
]

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
  return uniqueSubjects.reverse()
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

export default fetchAllSubjects({
  id: EXAMPLES.join(',')
})