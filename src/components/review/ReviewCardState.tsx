import { Review } from "./interface"

export const ReviewCardState = ({ review } : { review: Review}) => {
    return (
        <div className="h-md w-full border rounded p-3 relative">
            <div>
                <p className="text-sm">{review.author} </p>
                <p className="font-bold"> {review.rating}/5 </p>
                <p className="text-md"> {review.content} </p>                    
            </div>
            <p className="absolute top-2 right-2 text-sm">Status: {review.state}</p>
        </div>        
    )
}