import React, { useEffect, useState } from 'react';
import Post from './Post'
import {faker} from "@faker-js/faker";

function Posts() {


    // const DUMMY_DATE = [
    //     {
    //         id: faker.datatype.uuid(),
    //         username: faker.internet.userName(),
    //         userImg: 'https://links.papareact.com/3ke',
    //         img: faker.image.avatar(),
    //         caption: 'This is dope!',
    //     }
    // ]

    const [posts, setPosts] = useState([])

    // npm install --save-dev @faker-js/faker
    useEffect(() => {
        const posts = [...Array(6)].map((_, i) => ({
            // ...faker.helpers.contexualCard(), 
            id: faker.datatype.uuid(),
            username: faker.internet.userName(),
            userImg: 'https://links.papareact.com/3ke',
            img: faker.image.avatar(),
            caption: 'This is dope!',
            id: i,
        }));

        console.log(posts)
        setPosts(posts);   
    }, []);

    return (
        <div>

            {/* Posts  */}
            {posts.map((post) => (
                <Post key={post.id} id={post.id}
                username={post.username} userImg={post.userImg}
                img={post.img} caption={post.caption}/>
            ))}

        </div>
    )
}

export default Posts
