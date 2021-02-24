import React, { useEffect, useLayoutEffect, useState } from "react";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { useStore } from "../../../stores/Store";
import SwiperCore, { Navigation, Pagination } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "swiper/components/scrollbar/scrollbar.scss";
import MobilePostDetails from "./MobilePostDetails";
import ComputerPOstDetails from "./ComputerPOstDetails";
import { observer } from "mobx-react-lite";
interface DetailParams {
  id: string;
}
SwiperCore.use([Navigation, Pagination]);

const PostDetails:React.FC<RouteComponentProps<DetailParams>> = ({
  match,
}) => {
    const [Posts, SetPosts] = useState({})
  const { PostsStore } = useStore();
  const { posts, loadpost, selectedPost } = PostsStore;
  useEffect(() => {
    loadpost(match.params.id);
    
  }, [loadpost, match.params.id,posts]);
  function useMediaQuery() {
    const [screenSize, setScreenSize] = useState([0, 0]);
    
    useLayoutEffect(() => {
      function updateScreenSize() {
        setScreenSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener("resize", updateScreenSize);
      updateScreenSize();
      return () => window.removeEventListener("resize", updateScreenSize);
    }, []);
    
    return screenSize;
  }

  const [width] = useMediaQuery();
  console.log(width);
  
  return (
    <>
    {width < 500 ? <MobilePostDetails />: <ComputerPOstDetails post ={selectedPost}/>}
    </>
  );
    // return (width < 500 ? history.push(`/posts/mobile/${selectedPost?.id}`): history.push(`/posts/computer/${selectedPost?.id}`))
  
}

export default observer(PostDetails);
