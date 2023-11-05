import { useEffect, useState } from "react"
import {useParams} from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from "swiper/modules";
import 'swiper/css/bundle';

const ShowListing = () => {
  SwiperCore.use([Navigation])
  const [isListing, setIsListing] = useState(null);
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  console.log(isListing)

  const listingId = params.listingId;

  useEffect(()=>{
    const getListing = async ()=>{
      try {
        setLoading(true);
        setError(false);
        const res = await fetch(`/api/listing/get/${listingId}`);
        const data = await res.json();
        if(data.success === false){
          setError(true);
          setError(false);
          return 
        }
        setIsListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
     
    }
    getListing();
  },[listingId])
  return (
    <main>
      { loading && <p className="text-center my-7 text-2xl ">Loading...</p>}
      { error && <p className="text-center my-7 text-2xl ">Something went wrong!</p>}
      
      {isListing && !loading && !error && 
        <>
          <Swiper navigation>
            {isListing.imageUrls.map((url)=> (
              <SwiperSlide key={url}>
                <div className="h-[500px]" style={{background: `url(${url}) center no-repeat` , backgroundSize: 'cover'}}></div>
              </SwiperSlide>
            ))}
          </Swiper>
          
        </>
      }
    </main>
  )
}

export default ShowListing
