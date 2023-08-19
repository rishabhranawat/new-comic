import {useState} from 'react';
import { getComic } from '../actions/getComic';
import Range from './Range';


const InputSection = ({
  setComicStrip,
  setImagePaths,
  setImageUrls,
  setImageBlobUrls
}) => {

  const [buttonLoading, setButtonLoading] = useState(false);
  const [content, setContent] = useState('');
  const [numImages, setNumImages] = useState(4);




  const handleClick = () => {
    setButtonLoading(true);
    getComic({content, numImages}).then(({imagePaths, comicStrip, imageData}) => {
      setImagePaths(imagePaths);
      setComicStrip(comicStrip);
      let imageUrls = [];
      let imageBlobUrls = [];
      imageData.forEach((image) => {
        const imageUrl = URL.createObjectURL(image);
        imageUrls.push(imageUrl);
        const blob = image.blobg();
        const imageBlobUrl = URL.createObjectURL(blob);
        imageBlobUrls.push(imageBlobUrl);
        console.log({ imageUrl, imageBlobUrl, type: typeof(image) });
      })
      setImageUrls(imageUrls);
      setImageBlobUrls(imageBlobUrls);
    }).catch((error) => {
      console.log(error);
    })
  }


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
          onChange={(e) => { setContent(e.target.value) }}
        />
      </div>

      <div>
        <div className="text-sm font-semibold text-gray-700">Number of images: {numImages}</div>
        <Range
          value={numImages}
          setValue={setNumImages}
          min={1}
          max={6}
          set={1}
        />
      </div>


      <button
        className="border rounded-lg p-2 bg-pink-500 relative flex justify-center items-center hover:bg-pink-600 text-white font-semibold"
        onClick={() => {handleClick()}}
      >
        <div className={`${buttonLoading ? 'invisible' : ''}`}>Generate comic strip</div>
        <div className={`${buttonLoading ? '' : 'invisible'} absolute`}>Loading...</div>

      </button>
    </div>
  )
}

export default InputSection;