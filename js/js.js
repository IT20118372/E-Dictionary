const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");

const btn = document.getElementById("search-btn");
btn.addEventListener("click", () => {
	let inpWord = document.getElementById("inp-word").value;
	fetch(`${url}${inpWord}`)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			result.innerHTML = `
  <div class="word">
    <h3>${inpWord}</h3>
    <button onclick="playSound()"> <i class="fas fa-volume-up"></i></button>
  </div>
  <div class="details">
    <p>${data[0].meanings[0].partOfSpeech}</p>
    <p>/${data[0].phonetic}/</p>
  </div>
  <p class="word-meaning">
    ${data[0].meanings[0].definitions[0].definition}
  </p>
  <p class="word-example">${
			data[0].meanings[0].definitions[0].example || ""
		}</p>
  `;
			sound.setAttribute("src", `https:${data[0].phonetics[0].audio}`);
		})
		.catch((error) => {
			result.innerHTML = `<h3 class="error" Style="color:red">I'm Sorry. But I couldn't Find The Word!</h3>
			<center>
			<img src="https://res.cloudinary.com/dff4rbfkn/image/upload/c_scale,h_126/v1639015777/EnragedWindyHorse-size_restricted_vksq2v.gif">
			</center>
			`;
		});
});
function playSound() {
	sound.play();
}
