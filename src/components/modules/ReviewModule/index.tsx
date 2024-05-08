import axios from 'axios';
import { useEffect, useState } from 'react';

type Review = {
    id: number;
    title: string;
    body: string; 
    userId: string; 
};

export const ReviewModule = () => {
    const [data, setData] = useState([] as Review[]); 
    
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://jsonplaceholder.typicode.com/posts'
            ); 
            const posts: Review[] = result.data;
            setData(posts);
        }
        fetchData();
    }, [data]); 

    return (
        <section>
            <div className="flex flex-col p-5 space-y-4">
                {data.map((item => (
                    <div className="w-fill border rounded p-3">
                        <h2 className="font-bold"> {item.title} </h2>
                        <p> {item.body} </p>                    
                    </div>
                )))}
            </div>
        </section>
    )
}