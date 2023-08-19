import { useState } from 'react';
import ComicStrip from './ComicStrip';
import InputSection from './InputSection';

const AppContainer = () => {

  const [imagePaths, setImagePaths] = useState([]);
  const [comicStrip, setComicStrip] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageBlobUrls, setImageBlobUrls] = useState([]);


  return (
    <div className="p-4 bg-gray-100">
      <div className="flex flex-col space-y-4 items-center h-screen">
        <div className="text-center flex flex-col space-y-2 mb-8">
          <h1 className="text-3xl font-semibold text-gray-700">Mirth</h1>
        </div>


        <InputSection 
          setComicStrip={setComicStrip}
          setImagePaths={setImagePaths}
          setImageUrls={setImageUrls}
          setImageBlobUrls={setImageBlobUrls}
        />
        <ComicStrip 
          imagePaths={imagePaths}
          comicStrip={comicStrip}
          imageUrls={imageUrls}
          imageBlobUrls={imageBlobUrls}
        />

      </div>
    </div>
  );
}

export default AppContainer;