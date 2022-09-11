import React, { useState, useEffect } from 'react'
import {faker} from "@faker-js/faker";
import Suggestion from './Suggestion'


function Suggestions() {
    const [suggestions, setSuggestions] = useState([]);
    
    useEffect(() => {
        const suggestions = [...Array(5)].map((_, i) => (
            {
                // ...faker.helpers.contextualCard
                userId: faker.datatype.uuid(),
                username: faker.internet.userName(),
                email: faker.internet.email(),
                // company: faker.company.companyName(),
                company: faker.company.name(),
                img: faker.image.avatar(),
                password: faker.internet.password(),
                birthdate: faker.date.birthdate(),
                registeredAt: faker.date.past(),
                id: i,
            }
        ))

        setSuggestions(suggestions)    
    }, []); 



    return (
        <div className='mt-4'>
            <div className='flex justify-between ml-10 mt-5'>
                <h2 className='text-gray-500'>Suggestions for you</h2>
                <button className='text-gray-800 font-semibod'>See All</button>
            </div>

            <div className='ml-10'>
                {suggestions.map((suggestion) => (
                    <Suggestion key={suggestion.id} img={suggestion.img}
                    username={suggestion.username} company={suggestion.company} />
                ))}
            </div>      
        </div>
    )
}

export default Suggestions
