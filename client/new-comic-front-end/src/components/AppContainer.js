import ComicStrip from './ComicStrip';

const AppContainer = () => {

  return (
    <div className="p-4">
      <div className="flex flex-col space-y-4 items-center justify-center">
        <textarea 
          id="comic-text" 
          rows="4" 
          cols="50" 
          placeholder="Enter your article here."
          className="rounded resize-none border p-2"
        />

        <button
          className="border rounded-lg p-2"
        >
          Generate comic strip
        </button>

        <ComicStrip />

      </div>
    </div>
  );
}

export default AppContainer;