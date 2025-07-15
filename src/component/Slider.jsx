import React from 'react'


const Slider = ({ data = []}) => {
    return (
        <div className='p-10 bg-gradient-to-r gap-9 '>
            <div className='slider-container'>
                <div className='slider '>
                    {[...data, ...data].map((item, index) => (
                        <div key={`${index}-${item.id}`} className="slide">
                            <img
                                src={item.image}
                                alt={`Slider ${item.id}`}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
        
    )
}

export default Slider
