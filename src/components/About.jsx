import React from 'react'

const About = () => {
  return (
    <div name="About" className='w-full h-full pt-[200px] bg-gradient-to-b from-gray-800 to-black text-white'>
        <div className='max-w-screen-lg p-4 mx-auto flex flex-col justify-center w-full h-full'>
            <div className='pb-8'>
                <p className='text-4xl font-bold inline border-b-4 border-gray-500'>About</p>
            </div>

            <p className='text-xl mt-20'>Hello! I’m a web developer who thrives on bringing ideas to life through clean, efficient, and engaging code. With a foundation in modern front-end technologies like React.js, Tailwind CSS, and Next.js, I specialize in transforming concepts into fully functional, visually stunning websites. Over the past 2 years, I’ve had the privilege of working on diverse projects, honing my skills in building responsive interfaces and delivering exceptional user experiences. Every line of code I write reflects my passion for creativity, precision, and innovation.</p>

            <br/>

            <p className='text-xl'>When I’m not developing, I immerse myself in learning new tools and techniques to stay ahead in the fast-paced world of technology. I also enjoy collaborating with like-minded professionals to solve challenging problems and create meaningful digital solutions. My journey as a developer is driven by a desire to not only build websites but also to inspire and leave a lasting impact through my work.</p>

        </div>

    </div>
  )
}

export default About