import {useState, useEffect} from 'react';
import { getComic } from '../actions/getComic';
import Range from './Range';


const InputSection = ({
  setComicStrip,
  setImagePaths,
}) => {

  const [buttonLoading, setButtonLoading] = useState(false);
  const [buttonSucceeded, setButtonSucceeded] = useState(false);
  const [content, setContent] = useState('');
  const [numImages, setNumImages] = useState(4);




  const handleClick = () => {
    setButtonLoading(true);
    getComic({content, numImages}).then(({imagePaths, comicStrip}) => {
      setImagePaths(imagePaths);
      setComicStrip(comicStrip);
      return console.log(data);
    }).catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
  
    setTimeout(() => {
      setButtonLoading(false);
      setButtonSucceeded(true);
    }, 1500)
  }, [buttonLoading])

  useEffect(() => {
    setTimeout(() => {
      setButtonSucceeded(false);
    }, 1500)
  }, [buttonSucceeded])
  
  

  return (
    <div className="flex flex-col space-y-4">
      <div>
        <div className="text-sm font-semibold text-gray-700">News article</div>
        <textarea
          id="comic-text"
          rows="4"
          cols="50"
          placeholder="Enter your article here."
          className="rounded resize-none border p-2"
          value={content}
          setValue={(e) => { setContent(e.target.value) }}
        />
      </div>

      <div>
        <div className="text-sm font-semibold text-gray-700">Number of images</div>
        <Range
          value={numImages}
          setValue={setNumImages}
          min={1}
          max={6}
          set={1}
        />
        <div className="text-gray-700 text-sm">{numImages} images</div>
      </div>


      <button
        className="border rounded-lg p-2 bg-pink-500 relative flex justify-center items-center"
        onClick={() => {handleClick()}}
      >
        <div className={`${buttonLoading || buttonSucceeded ? 'invisible' : ''}`}>Generate comic strip</div>
        <div className={`${buttonLoading ? '' : 'invisible'} absolute`}>Loading...</div>
        <div className={`${buttonSucceeded ? '' : 'invisible'} absolute`}>Succeeded</div>

      </button>
    </div>
  )
}

export default InputSection;