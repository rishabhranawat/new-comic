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

      const path = `https://new-comic-fork.vercel.app/${imagePaths[index].splice(0,6)}`;
      console.log({path})

      return (
        <div className="flex flex-col justify-center items-center space-y-4" key={index}>
            <img 
              className="rounded w-72 h-72"
              src={imagePaths[index]}
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