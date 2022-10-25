export default function getHashtags(text) {
  let hashtags = [];

  const text_in_caracteres = [];
  for (let i = 0; i < text.length; i++) {
    text_in_caracteres.push(text[i]);
  }

  for (let i = 0; i < text_in_caracteres.length; i++) {
    let newHashtag = [];
    if (text_in_caracteres[i] === "#") {
      let count = 1;
      while (true) {
        if (
          text_in_caracteres[i + count] === " " ||
          text_in_caracteres[i + count] === "#" ||
          i + count === text_in_caracteres.length
        ) {
          break;
        }

        newHashtag.push(text_in_caracteres[i + count]);
        count++;
      }

      let aux = newHashtag.join("");
      hashtags.push(aux);
    }
  }

  return hashtags.filter((item) => item !== "");
}
