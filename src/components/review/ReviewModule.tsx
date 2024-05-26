/*
(User) review display and submission module

usage: 
<ReviewModule subsbox={subsboxId} user={userEmail}/>
*/

import axios from "axios";
import { useEffect, useState } from "react";
import { Review } from "./interface";
import { ReviewCard } from "./ReviewCard";
import { ReviewCardState } from "./ReviewCardState";

const ReviewForm = ({
  subsboxId,
  userId,
}: {
  subsboxId: string;
  userId: string;
}) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      rating: data.get("rating"),
      content: data.get("about"),
      author: userId,
    };
    console.log(body);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_REVIEW_URL}/subscription-boxes/${subsboxId}/users/self`,
        body
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <div className="flex space-x-2">
        <p>1</p>
        <input type="radio" name="rating" value="1" />
        <input type="radio" name="rating" value="2" />
        <input type="radio" name="rating" value="3" />
        <input type="radio" name="rating" value="4" />
        <input type="radio" name="rating" value="5" />
        <p>5</p>
      </div>
      <div className="col-span-full">        
        <div className="mt-2">
          <textarea
            placeholder="Write your review"
            id="about"
            name="about"
            rows={3}
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          ></textarea>
        </div>
      </div>
      
      <button className='bg-orange-300 w-[150px] py-3 rounded-md sm:text-lg font-medium focus:bg-orange-400 hover:bg-orange-400' type="submit">
        Submit
      </button>
    </form>
  );
};

interface ID {
  subsbox: string;
  user: string;
}

export const ReviewModule = ({user, subsbox} : {user: string, subsbox: string}) => {
  const [myReview, setMyReview] = useState<Review | null>(null);
  const [data, setData] = useState<Review[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_REVIEW_URL}/subscription-boxes/${subsbox}`
      );
      const data = await response.json();
      console.log(data);
      setData(data);
    };
    fetchData();
  }, []);

  return (
    <section className="bg-slate-300 flex justify-center">
      <div className="flex flex-col p-5 w-screen space-y-4 bg-white">
        {myReview ? 
        <ReviewCardState review={myReview} />
        :<ReviewForm subsboxId={subsbox} userId={user} />}
        
        {data.map((review) => (
          <ReviewCard key={review.author} review={review} />
        ))}
      </div>
    </section>
  );
};
