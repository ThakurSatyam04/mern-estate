import { useEffect, useState } from "react"
import {useParams} from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from "swiper/modules";
import 'swiper/css/bundle';
import {FaBath, FaBed, FaChair, FaMapMarkedAlt, FaParking, FaShare} from 'react-icons/fa';

const ShowListing = () => {
  SwiperCore.use([Navigation])
  const [isListing, setIsListing] = useState(null);
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

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
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
              <FaShare 
                className="text-slate-500"
                onClick={()=>{
                  console.log("clicked")
                  navigator.clipboard.writeText(window.location.href);
                  setIsCopied(true);
                  setTimeout(()=>{
                    setIsCopied(false);
                  },2000)
                }}
                />
                </div>
                {isCopied && (
                  <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2"> Link copied!</p>
                )}
                <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
                  <p className="text-2xl font-semibold">
                    {isListing.name} - ${' '}
                    {isListing.offer 
                    ? isListing.discountPrice.toLocaleString('en-US') 
                    : isListing.regularPrice.toLocaleString('en-US')}
                    {isListing.type === 'rent' && '/ month'}
                  </p>
                  <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
                    <FaMapMarkedAlt className="text-green-700" />{isListing.address}
                  </p>
                  <div className="flex gap-4">
                    <p className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                      {isListing.type === 'rent' ? 'For Rent' : 'For Sale'}
                    </p>
                    {
                      isListing.offer && (
                        <p className="bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">${+isListing.regularPrice - +isListing.discountPrice}</p>
                      )
                    }
                  </div>
                  <p className='text-slate-800'>
                    <span className='font-semibold text-black'>Description - </span>
                    {isListing.description}
                  </p>
                  <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
                    <li className='flex items-center gap-1 whitespace-nowrap '>
                      <FaBed className="text-lg"/>
                      {
                        isListing.bedrooms > 1
                        ? `${isListing.bedrooms} beds`
                        : `${isListing.bedrooms} bed`
                      }
                    </li>
                    <li className='flex items-center gap-1 whitespace-nowrap '>
                      <FaBath className="text-lg"/>
                      {
                        isListing.bedrooms > 1
                        ? `${isListing.bedrooms} baths`
                        : `${isListing.bedrooms} bath`
                      }
                    </li>
                    <li className='flex items-center gap-1 whitespace-nowrap '>
                      <FaParking className='text-lg' />
                      {isListing.parking ? 'Parking spot' : 'No Parking'}
                    </li>
                    <li className='flex items-center gap-1 whitespace-nowrap '>
                      <FaChair className='text-lg' />
                      {isListing.furnished ? 'Furnished' : 'Unfurnished'}
                    </li>
                  </ul>
                </div>
        </>
      }
    </main>
  )
}

export default ShowListing
