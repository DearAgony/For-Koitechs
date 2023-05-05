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

export const parseDate = (date: string) => {
  let dateString = new Date(date).toDateString()
  return dateString
}

export const parseReposDate = (date: string) => {
  let dateString = new Date(date).getTime()
  return dateString
}

export const prepareRepos = (data: any) => {
  let reposArray = []
  for (let i = 0; i < data.length; i++) {
    if (data[i].language) {
      reposArray.push({
        name: data[i].name,
        updated_at: parseReposDate(data[i].updated_at),
        html_url: data[i].html_url
      })
    }
  }
  reposArray.sort((a: {updated_at: number}, b: {updated_at: number}) => b.updated_at - a.updated_at)
  return reposArray
}