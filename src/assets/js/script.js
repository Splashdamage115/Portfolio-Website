let url = 'src/assets/jsonHost/data.json';

fetch(url).then((response) => {
  if (response.ok) {
    return response.json();
  }
  throw new Error('Something went wrong');
})
.then((responseJson) => {
  console.log(responseJson);
})
.catch((error) => {
  console.log(error)
});