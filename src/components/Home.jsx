import React from 'react'
import HeroIamge from "../assets/heroImage.png";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-scroll";

const Home = () => {
  return (
    <div name="Home" className='w-full h-screen bg-gradient-to-b from-black via-black to-gray-800 pt-[80px]'>

        <div className='max-w-screen-lg mx-auto flex flex-col md:flex-row items-center justify-center h-full px-4'>

            <div className='flex flex-col justify-center h-full'>

                <h2 className='text-4xl sm:text-7xl font-bold text-white'>I am a Developer</h2>

                <p className='text-gray-500 py-4 max-w-md'> With 2 years of hands-on experience in web design and development, I specialize in creating dynamic and visually appealing websites.
                My expertise lies in working with modern front-end technologies such as React.js, Tailwind CSS, and Next.js, which I use to build responsive, user-friendly, and high-performance websites. </p>

                <div>
                    <Link to='Portfolio' smooth duration={500} className='group text-white w-fit px-6 py-3 my-2 flex items-center rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer'>
                        Portfolio 
                        <span className='group-hover:rotate-90 duration-300'>
                            <MdKeyboardArrowRight size={25} className='ml-1'/>
                        </span>
                    </Link>    
                </div>
            </div>

            <div>
                <img src={HeroIamge} alt='My Profile' className='rounded-2xl mx-auto w-2/3 md:w-full'></img>
            </div>
        </div>
    </div>
  )
}

export default Home