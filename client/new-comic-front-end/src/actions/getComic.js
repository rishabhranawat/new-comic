const apiUrl = 'localhost:5000/api/generate-comic-strip';

export const getComic = async ({ content, numImages }) => {
  return new Promise((resolve, reject) => {
    fetch(`${apiUrl}/api/post`, {
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