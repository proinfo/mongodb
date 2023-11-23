console.log('Client-side code running');

const button = document.getElementById('myButton');
button.addEventListener('click', function (e) {
  console.log('button was clicked');

  fetch('/clicked', { method: 'GET' })
    .then(async function (response) {
      if (response.ok) {
        console.log('Click was recorded');
        document.querySelector('body').append(await response.text())
        return;
      }
      throw new Error('Request failed.');
    })
    .catch(function (error) {
      console.log(error);
    });
});
