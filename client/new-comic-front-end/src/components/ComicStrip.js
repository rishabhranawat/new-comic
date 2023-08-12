const ComicStrip = ({ comic }) => {

  const comicList = [{
    comicImage: "https://via.placeholder.com/150",
    comicText: "Message 1"
}, {
    comicImage: "https://via.placeholder.com/150",
    comicText: "Message 2"
  }, {
    comicImage: "https://via.placeholder.com/150",
    comicText: "Message 3"
  }, {
    comicImage: "https://via.placeholder.com/150",
    comicText: "Message 4"
  }];

  return (

    <div className="flex space-x-4">

      {comicList.map(({comicImage, comicText}, index) => {

      return (
        <div className="flex flex-col justify-center items-center space-y-4">
            <img 
              className="rounded w-48 h-48 "
              src={comicImage}
            />
            <div className="text-sm text-gray-700 w-48">{comicText}</div>
          </div>
        )
      })}
    </div> 
  )
}

export default ComicStrip;