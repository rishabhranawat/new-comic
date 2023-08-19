const ComicStrip = ({ 
  imagePaths,
  comicStrip,
  imageUrls,
  imageBlobUrls,
 }) => {

//   const comicList = [{
//     comicImage: "https://via.placeholder.com/150",
//     comicText: "Message 1"
// }, {
//     comicImage: "https://via.placeholder.com/150",
//     comicText: "Message 2"
//   }, {
//     comicImage: "https://via.placeholder.com/150",
//     comicText: "Message 3"
//   }, {
//     comicImage: "https://via.placeholder.com/150",
//     comicText: "Message 4"
//   }];

  return (

    <div className="flex space-x-4">

      {comicStrip.map((caption, index) => {

      const imagePath = imagePaths[index];
      console.log({imagePath});
      const splitImagePath = imagePath.substring(6);
      console.log({splitImagePath})
      const path = `https://new-comic-fork-production.up.railway.app/${splitImagePath}`;
      console.log({path});

      return (
        <div className="flex flex-col justify-center items-center space-y-4" key={index}>
            <img 
              className="rounded w-72 h-72"
              src={path}
              alt={index}
            />
            <div className="text-sm text-gray-700 w-48">{caption}</div>
          </div>
        )
      })}
    </div> 
  )
}

export default ComicStrip;
