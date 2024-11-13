import { useState } from "react";
import { FaDownload } from "react-icons/fa";
import FileSaver from "file-saver";
import { FaRegCopy } from "react-icons/fa6";

function ImageCard({item}) {
  const [copySuccess, setCopySuccess] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageSrc;
    link.download = "generated-image.jpg";
    link.click();
  };

   // short prompt length here
  function shortenText(text, maxlength) {
    return text.length > maxlength ? text.slice(0, maxlength) + '...' : text;
  }

  const copyToClipboard = async (prompt) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopySuccess("Prompt copied to clipboard!");
    } catch (err) {
      setCopySuccess("Failed to copy!");
      console.error("Failed to copy text: ", err);
    }
  };


const createdAt = new Date(item?.createdAt);
const now = new Date();
const diffInMs = now - createdAt;

let timeAgo;
if (diffInMs >= 1000 * 60 * 60 * 24) {
  // More than a day
  timeAgo = `${Math.floor(diffInMs / (1000 * 60 * 60 * 24))}d`;
} else if (diffInMs >= 1000 * 60 * 60) {
  // More than an hour
  timeAgo = `${Math.floor(diffInMs / (1000 * 60 * 60))}h`;
} else {
  // Less than an hour, show minutes
  timeAgo = `${Math.floor(diffInMs / (1000 * 60))}m`;
}

  return (
    <div key={item?._id} className="relative flex flex-col bg-gray-800 rounded-lg shadow-xl transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl cursor-pointer">
      {/* Lazy loaded image */}
      <img
        alt={item?.prompt}
        src={item?.photo}
        className="w-full h-full object-cover rounded-lg"
        style={{
              width: `${item?.photo.split('/')[3].split('x')[0]}px`, // Extract width from URL
              height: `${item?.photo.split('/')[3].split('x')[1]}px`, // Extract height from URL
            }}
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 flex flex-col justify-end bg-black bg-opacity-50 rounded-lg p-4 opacity-0 hover:opacity-100 transition-opacity duration-300">
        {/* Prompt */}
        <p className="text-sm text-white mb-2">• {shortenText(item?.prompt,100)}</p>

        {/* Author and Download */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 text-white">
            
            <span className="text-sm font-semibold">{item?.name}</span>
            <span>{timeAgo} ago</span>

          </div>
          <div className="flex gap-1 items-center">
          <FaRegCopy 
           onClick={() => copyToClipboard(item?.prompt)}
           className="text-white"/>
           <span>copy</span>
          </div>

           <FaDownload 
           onClick={() => FileSaver.saveAs(item?.photo, `download.png`)}
           className="text-white"/>
        </div>
      </div>
    </div>
  );
}

export default ImageCard;
