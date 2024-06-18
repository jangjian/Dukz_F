const textarea = document.querySelector('.input-content');

console.log(textarea)
textarea.oninput = (event) => {
  const target = event.target;

  target.style.height = 0;
  target.style.height = target.scrollHeight + 'px';
};

const review = document.getElementById('review');
review.oninput = (event) => {
  const target = event.target;

  target.style.height = 0;
  target.style.height = target.scrollHeight + 'px';
};