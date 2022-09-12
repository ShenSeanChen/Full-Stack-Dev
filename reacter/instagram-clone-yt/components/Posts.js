import React, { useEffect, useState } from 'react';
import Post from './Post'
import {faker} from "@faker-js/faker";
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';

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

    // Fake data generated from faker-js
    // // npm install --save-dev @faker-js/faker
    // const [posts, setPosts] = useState([])
    // useEffect(() => {
    //     const posts = [...Array(6)].map((_, i) => ({
    //         // ...faker.helpers.contexualCard(), 
    //         id: faker.datatype.uuid(),
    //         username: faker.internet.userName(),
    //         userImg: 'https://links.papareact.com/3ke',
    //         img: faker.image.avatar(),
    //         caption: 'This is dope!',
    //         id: i,
    //     }));

    //     console.log(posts)
    //     setPosts(posts);   
    // }, []);

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
            snapshot => { //snapshot is a real-time listener for the backend
                setPosts(snapshot.docs);
        });

        return unsubscribe;
    }, [db])

    console.log('recording posts')
    console.log(posts)

    if (posts != null) {
        return (
            <div>
    
                {/* Posts  */}
                {/* {posts.map((post) => (
                    <Post key={post.id} id={post.id}
                    username={post.username} userImg={post.userImg}
                    img={post.img} caption={post.caption}/>
                ))} */}
                {posts.map((post) => (
                    <Post key={post.id} id={post.id}
                    username={post.data().username} 
                    userImg={post.data().profileImg}
                    img={post.data().image} 
                    caption={post.data().caption}
                    // comments={post.data().comments}
                    />
                ))}
    
            </div>
        )
    }

}

export default Posts
