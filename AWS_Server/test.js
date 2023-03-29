// const axios = require('axios')

// const getBreeds = async () => {
//   try {
//     return await axios.get('localhost:8100')
//   } catch (error) {
//     console.error(error)
//   }
// }

// const countBreeds = async () => {
//   const breeds = await getBreeds()

//   console.log(breeds);
// }

// countBreeds()

const shell = require('shelljs')

shell.exec('./curl.sh')