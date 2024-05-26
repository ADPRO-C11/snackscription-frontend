import { Review } from "./interface"

export const ReviewCard = ({ review } : { review: Review}) => {
    return (
        <div className="h-md w-full border rounded p-3">
            <p className="text-sm">{review.author} </p>
            <p className="font-bold"> {review.rating}/5 </p>
            <p className="text-md"> {review.content} </p>                    
        </div>
    )
}