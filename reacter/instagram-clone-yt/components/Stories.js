import React, { useEffect, useState } from 'react';
import {faker} from "@faker-js/faker";
import Story from './Story'

function Stories() {

    const [suggestions, setSuggestions] = useState([])

    // npm install --save-dev @faker-js/faker
    useEffect(() => {
        const suggestions = [...Array(20)].map((_, i) => ({
            // ...faker.helpers.contexualCard(), 
            userId: faker.datatype.uuid(),
            username: faker.internet.userName(),
            email: faker.internet.email(),
            avatar: faker.image.avatar(),
            password: faker.internet.password(),
            birthdate: faker.date.birthdate(),
            registeredAt: faker.date.past(),
            id: i,
        }));

        console.log(suggestions);     
        setSuggestions(suggestions);   
    }, []);

    return (
        <div 
            className="flex space-x-2 p-6 bg-white mt-6
                    border-gray-200 border rounded-sm
                    overflow-x-scroll scrollbar-thin scrollbar-thumb-black
                    "
            // npm install --save-dev tailwind-scrollbar
        >
            {/* Story */}
            {suggestions.map(profile => (
                <Story 
                    key={profile.id} 
                    // Key is SUPER IMPORTANT!!!
                    img={profile.avatar} 
                    username={profile.username} 
                />
            ))}
            
        </div>
    );
}

export default Stories;