import React from 'react'
import html from "../assets/html.png";
import css from "../assets/css.png";
import javascript from "../assets/javascript.png";
import react from "../assets/react.png";
import nextjs from "../assets/nextjs.png";
import github from "../assets/github.png";
import tailwind from "../assets/tailwind.png";


const Experience = () => {

    const techs=[
        {
            id: 1,
            src: html,
            tittle: 'HTML',
            style: 'shadow-orange-500',
        },
        {
            id: 2,
            src: css,
            tittle: 'CSS',
            style: 'shadow-blue-500',
        },
        {
            id: 3,
            src: javascript,
            tittle: 'JavaScript',
            style: 'shadow-yellow-500',
        },
        {
            id: 4,
            src: react,
            tittle: 'ReactJS',
            style: 'shadow-blue-600',
        },
        {
            id: 5,
            src: tailwind,
            tittle: 'Tailwind',
            style: 'shadow-sky-400',
        },
        {
            id: 6,
            src: nextjs,
            tittle: 'NextJS',
            style: 'shadow-white',
        },
        {
            id: 7,
            src: github,
            tittle: 'GitHub',
            style: 'shadow-gray-400',
        },
    ]


  return (
    <div name='Experience' className='bg-gradient-to-b from-gray-800  to-black h-full w-full pt-[200px]'>
        <div className='max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full text-white'> 
            <div>
                <p className='text-4xl font-bold inline border-b-4 border-gray-500 p-2'>Experience</p>
                <p className='py-6'>These are latest technologies which are used by me for project.</p>
            </div>

            <div className='w-full grid grid-cols-2 sm:grid-cols-3 gap-8 py-8 text-center px-12 sm:px-0'>

            {
                techs.map(({id, src, tittle, style})=>(

                    <div key={id} className={`shadow-md hover:scale-105 duration-500 rounded-lg ${style}`}>
                    <img src={src} alt="" className='w-20 mx-auto'/>
                    <p className='mt-4'>{tittle}</p>
                </div>
                ))
            }

            </div>

        </div>
    </div>
  )
}

export default Experience