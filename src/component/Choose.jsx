import React from 'react'
import group from '../assets/group1.png'

const Choose = () => {
    return (
        <div>
            <div className='font1 pt-10 p-4 flex flex-col gap-4'>
                <h1 className="bg-gradient-to-r from-[#5E2FF4] via-[#C570FB] to-[#5E2FF4] bg-clip-text text-transparent uppercase font-bold text-center">WHAY CHOOSE US</h1>
                <h1 className='text-center  lg:text-4xl md:text-4xl text-xl font-bold'>Why choose our token?</h1>
                <div className='max-w-6xl mx-auto flex justify-center items-center'>
                    <img src={group} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Choose