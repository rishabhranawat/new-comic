import { useState } from 'react';
import ComicStrip from './ComicStrip';
import InputSection from './InputSection';

const AppContainer = () => {

  const [imagePaths, setImagePaths] = useState([]);
  const [comicStrip, setComicStrip] = useState([]);


  return (
    <div className="p-4 bg-cyan-100">
      <div className="flex flex-col space-y-4 items-center h-screen">

        <div className="text-center flex flex-col space-y-2 mb-8">
          <h1 className="text-3xl font-semibold text-gray-700">News that doesn't confuse!</h1>
          <h3 className="text-gray-700">Stay up-to-date by converting news article to comic strips.</h3>
        </div>


        <InputSection 
          setComicStrip={setComicStrip}
          setImagePaths={setImagePaths}
        />
        <ComicStrip 
          imagePaths={imagePaths}
          comicStrip={comicStrip}
        />

      </div>
    </div>
  );
}

export default AppContainer;