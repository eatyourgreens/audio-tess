import fetchWithRetry from './fetchWithRetry.js'

const SUBJECT_SET_ID = 117755

async function fetchSubjectSet() {
  try {
    const { subject_sets, meta }  = await fetchWithRetry(`/subject_sets/${SUBJECT_SET_ID}`)
    return { subject_sets, meta: meta.subject_sets }
  } catch (err) {
    console.error('ERROR: fetchSubjectSet()')
    console.error('- error: ', err)
    throw(err)
  }
}

async function subjectSet() {
  const { subject_sets, meta } = await fetchSubjectSet()
  const [ subject_set ] = subject_sets
  return subject_set
}

export default await subjectSet()