export default function handleError (res) {
  return function (error) {
    console.error(error.message)
    console.error(error.stack)
    return res.status(500).send({error: error.message})
  }
}
