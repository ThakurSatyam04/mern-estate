import {Link} from 'react-router-dom';
import { useState, useEffect } from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingCard from '../components/ListingCard';

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(()=>{
      const fetchOfferListings = async ()=>{
        try {
          const res = await fetch('https://mern-estate-brown.vercel.app/api/listing/get?offer=true&limit=4');
          const data = await res.json();
          setOfferListings(data);     
          fetchRentListings();     
        } catch (error) {
          console.log(error);
        }
      }

      const fetchRentListings = async () => {
        try {
          const res = await fetch('/api/listing/get?type=rent&limit=4');
          const data = await res.json();
          setRentListings(data);  
          fetchSaleListings();
        } catch (error) {
          console.log(error)
        }      
      };

      const fetchSaleListings = async ()=>{
        try {
          const res = await fetch('/api/listing/get?type=sale&limit=4');
          const data = await res.json();
          setSaleListings(data);
        } catch (error) {
          console.log(error)
        }
      }
      fetchOfferListings();

  }, []);
  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">Find your next <span className="text-slate-500">perfect</span><br />place with ease</h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod consequatur maiores temporibus quas, dolorem blanditiis voluptate harum iure. Temporibus, qui.br
          <br />
          Lorem ipsum dolor sit, amet consectetur adipisicing.
        </div>
        <Link to={'/search'} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
          Lets get started...
        </Link>
      </div>

      {/* Swiper */}
      <Swiper navigation>
        {
          offerListings && offerListings.length > 0 && 
          offerListings.map((listing)=> (
            <SwiperSlide key={listing._id}>
              <div style={{background: `url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize: 'cover',}} className='h-[500px]'>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* listing results for offer sale and rent */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
      {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {rentListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {saleListings.map((listing) => (
                <ListingCard listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
