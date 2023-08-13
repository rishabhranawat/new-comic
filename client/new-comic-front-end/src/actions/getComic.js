const apiUrl = 'http://localhost:5000';

export const getComic = async ({ content, numImages }) => {
  return new Promise((resolve, reject) => {
    fetch(`${apiUrl}/api/generate-comic-strip`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content, numImages })
    }).then(res => {
      if (res.ok) {
        res.json().then(data => {
          console.log({ data });
          resolve(data)
        }).catch((error) => {
          console.log(error);
        });
      } else {
        res.text().then(text => reject(text));
      };
    }).catch((error) => {
      reject(error);
    });
  });
}