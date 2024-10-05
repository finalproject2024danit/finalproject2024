import React from "react";
import styles from "./VideoPage.module.scss";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import MainContent from "../../components/MainContent/MainContent";

const VideoPage = () => {
  // Define the list of videos with titles and URLs
  const videos = [
    {
      id: 1,
      title: "Video 1",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: 2,
      title: "Video 2",
      url: "https://www.youtube.com/embed/9bZkp7q19f0",
    },
    {
      id: 3,
      title: "Video 3",
      url: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
    },
    {
      id: 4,
      title: "Video 4",
      url: "https://www.youtube.com/embed/2vjPBrBU-TM",
    },
  ];

  // Prepare the content to pass to MainContent
  const content = (
    <ul className={styles.video__inner}>
      {videos.map((video) => (
        <li key={video.id}>
          <h2>{video.title}</h2>
          <iframe
            width="560"
            height="315"
            src={video.url}
            title={video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={styles.layout}>
    <LeftSidebar />
    <div className={styles.mainContent}>
    <MainContent title="Video" content={content} />
    </div>
  </div>

    // <div className={styles.video__box}>
    //   <LeftSidebar/>
    //   <h1>Video</h1>
    //   <ul className={styles.video__inner}>
    //     <li>
    //         <h2>Name</h2>
    //         <iframe
    //       width="560"
    //       height="315"
    //       src="https://www.youtube.com/embed/dQw4w9WgXcQ"
    //       title="YouTube video player"
    //       frameBorder="0"
    //       allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    //       allowFullScreen
    //     >            
    //     </iframe>
    //     </li>
    //     <li>
    //     <h2>Name</h2>
    //     <iframe 
    //             width="560" 
    //             height="315" 
    //             src="https://www.youtube.com/embed/9bZkp7q19f0" 
    //             title="Video 2" 
    //             frameBorder="0" 
    //             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    //             allowFullScreen>
    //         </iframe>
    //     </li>
    //     <li>
    //     <h2>Name</h2>
    //     <iframe 
    //             width="560" 
    //             height="315" 
    //             src="https://www.youtube.com/embed/3JZ_D3ELwOQ" 
    //             title="Video 3" 
    //             frameBorder="0" 
    //             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    //             allowFullScreen>
    //         </iframe>
    //     </li>
    //     <li>
    //     <h2>Name</h2>
    //     <iframe 
    //             width="560" 
    //             height="315" 
    //             src="https://www.youtube.com/embed/2vjPBrBU-TM" 
    //             title="Video 4" 
    //             frameBorder="0" 
    //             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    //             allowFullScreen>
    //         </iframe>
    //     </li>
    //   </ul>
    // </div>
  );
};

export default VideoPage;

// import React from "react";
// import styles from './VideoPage.module.scss';

// const VideoPage = () => {
//     return(
//         <div className={styles.video__box}>
//     <h1>Video</h1>
//     </div>
//     )
// }

// export default VideoPage;
