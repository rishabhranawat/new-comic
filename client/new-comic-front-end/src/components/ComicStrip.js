const ComicStrip = ({ 
  imagePaths,
  comicStrip,
  imageUrls,
  imageBlobUrls,
 }) => {

  return (

    <div className="flex space-x-4">

      {comicStrip.map((caption, index) => {
      const splitImagePath = imagePaths[index].substring(6);
      const path = `https://new-comic-production.up.railway.app/${splitImagePath}`;
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
