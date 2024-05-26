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

const rejectReview = async (subsbox: string, user: string) => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_REVIEW_URL}/subscription-boxes/${subsbox}/users/${user}/reject`)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        });
}

export const ReviewAdminModule = () => {
    
    const [subsbox, setSubsbox] = useState<string>(''); 
    const handleClick = (e: any) => {
        e.preventDefault();
        const subsboxInput = document.getElementsByName('subsbox-input')[0] as HTMLInputElement;
        setSubsbox(subsboxInput.value);
    }
    
    const [data, setData] = useState<Review[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {      
            setLoading(true);      
            if (subsbox) {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_REVIEW_URL}/admin/subscription-boxes/${subsbox}/reviews?state=PENDING`)
                const data = await response.json();
                console.log(data);
                setData(data);
                setLoading(false);
            }
        }
        fetchData();
    }, [subsbox])

    return <section>
        <h1 className="text-2xl font-bold">Review Admin</h1>
        <form>
            <input type="text" placeholder="Subscription Box ID" name="subsbox-input" className="h-12 border"/>
            <button onClick={handleClick} className="bg-blue-300 w-[150px] py-3 rounded-md sm:text-lg font-medium focus:bg-blue-400 hover:bg-blue-400" type="submit">
                Search
            </button>
        </form>
        <p>Current subsbox: {subsbox}</p>
        <div className="flex flex-col">
            {loading ? <p>Loading...</p> : data.map((review) => {
                return (
                    <div key={review.subsbox} className="h-md w-full border rounded p-3">
                        <p className="text-sm">{review.author} </p>
                        <p className="font-bold"> {review.rating}/5 </p>
                        <p className="text-md"> {review.content} </p>
                        <button onClick={() => approveReview(review.subsbox, review.author)} className="bg-green-300 w-[150px] py-3 rounded-md sm:text-lg font-medium focus:bg-green-400 hover:bg-green-400" type="submit">
                            Approve
                        </button>
                        <button onClick={() => rejectReview(review.subsbox, review.author)} className="bg-red-300 w-[150px] py-3 rounded-md sm:text-lg font-medium focus:bg-red-400 hover:bg-red-400" type="submit">
                            Reject
                        </button>
                    </div>
                )
            })}
        </div>
    </section>
}
