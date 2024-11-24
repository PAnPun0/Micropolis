import React from "react";

const RutubeVideo = ({ videoId }) => {
  return (
    <div>
      <iframe
        width="355"
        height="200"
        src={`https://rutube.ru/play/embed/${videoId}`}
        title="Rutube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default RutubeVideo;