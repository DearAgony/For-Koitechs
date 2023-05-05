export const prepareLanguages = (data: any) => {
  let array = []
  let count = {} as any
  for (let i = 0; i < data.length; i++) {
    if (data[i].language) {
      array.push(data[i].language)
    }
  }
  for (let elem of array) {
    if (count[elem] === undefined) {
      count[elem] = 1
    } else {
      count[elem]++
    }
  }
  for (let key in count) {
    count[key] = ((count[key]/array.length)*100).toFixed(2)
  }
  return count
  
}