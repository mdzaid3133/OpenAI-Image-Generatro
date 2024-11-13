
import React from "react";
import FileSaver from "file-saver";

const GeneratedImageCard = ({ post, loading }) => {
  return (
    <div>
      <div className="flex items-center justify-center w-[400px] h-[400px] p-4 border-2 border-dashed border-yellow-400/90 text-gray-300/80 rounded-2xl gap-4 ">
        {loading ? (
          <>

            Generating Your Image . . .
          </>
        ) : post.photo ? (
          <img
            src={post.photo}
            alt="Generated"
            className="w-full h-full bg-gray-900/50 rounded-xl object-cover"
          />
        ) : (
          <>Write a prompt to generate image</>
        )}
      </div>

      <div className="mt-4 flex justify-center items-center">
        <button
          onClick={() => FileSaver.saveAs(post?.photo, `download.png`)}
          disabled={!post.photo}
          className={`text-white font-semibold p-2 rounded-full w-full ${post.photo ? 'cursor-pointer bg-blue-700' : 'cursor-not-allowed bg-blue-300'}`}>
          Download Now
        </button>
      </div>

    </div>
  );
};

export default GeneratedImageCard;
