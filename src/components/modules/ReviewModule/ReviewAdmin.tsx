import axios from "axios"
import { useEffect, useState } from "react";
import { Review } from "./interface";

const approveReview = async (subsbox: string, user: string) => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_REVIEW_URL}/subscription-boxes/${subsbox}/users/${user}/approve`)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        });
}

export const ReviewAdmin = () => {
    const [data, setData] = useState<Review[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_REVIEW_URL}/admin/subscription-boxes/1/reviews`)
            const data = await response.json();
            console.log(data);
            setData(data);
            setLoading(false);
        }
        fetchData();
    }, [])

    return <section>
        <h1 className="text-2xl font-bold">Review Admin</h1>
        <div className="grid grid-cols-3 gap-4">
            {loading ? <p>Loading...</p> : data.map((review) => {
                return (
                    <div key={review.subsbox} className="h-md w-full border rounded p-3">
                        <p className="text-sm">{review.author} </p>
                        <p className="font-bold"> {review.rating}/5 </p>
                        <p className="text-md"> {review.content} </p>
                        <button onClick={() => approveReview(review.subsbox, review.author)} className="bg-green-300 w-[150px] py-3 rounded-md sm:text-lg font-medium focus:bg-green-400 hover:bg-green-400" type="submit">
                            Approve
                        </button>
                    </div>
                )
            })}
        </div>
    </section>
}
