import React, { useState, useEffect, useRef } from 'react';
import SubscriptionService from '../subscription/SubscriptionService';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import AuthenticationService from '../authentication/AuthenticationService';

interface SubscriptionBox {
  id: string;
  name: string;
  type: string;
  price: number;
  items: Item[];
  description: string;
}

interface Item {
  id: string;
  name: string;
  quantity: number;
}

interface SubscriptionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  subscriptionBox: SubscriptionBox;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onRequestClose, subscriptionBox }) => {
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    role: '',
    accountNonExpired: true,
    accountNonLocked: true,
    credentialsNonExpired: true,
    authorities: [],
    username: '',
    enabled: true
  });

  const [subscription, setSubscription] = useState({
    type: subscriptionBox.type,
    shippingAddress: {
      address: "",
      city: "",
      phoneNumber: "",
      postalCode: "",
      province: "",
    },
    subscriptionBoxId: subscriptionBox.id,
    userId: ""
  });

  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const getUserProfile = async () => {
      const token = getCookie('token');
      try {
        if (token) {
          const userData = await AuthenticationService.getProfile(token);
          setUser(userData.user);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUserProfile();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onRequestClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modalRef, onRequestClose]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSubscription((prevState) => ({
      ...prevState,
      shippingAddress: {
        ...prevState.shippingAddress,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = getCookie('token');
      if (token) {
        subscription["type"] = subscription.type.toUpperCase();
        subscription["userId"] = user.id;
        await SubscriptionService.createSubscription(subscription, token);
        router.push("/subscription");
        onRequestClose();
      }
    } catch (error) {
      console.log("Error", error);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md mt-16">
        {isSubscribing ? (
          <form onSubmit={handleSubmit} method='post'>
            <div className='grid grid-cols-1 gap-5 p-4'>
              <h1 className='text-2xl font-bold mb-4'>Create Subscription</h1>
              <div className='flex flex-col mb-4'>
                <label className='mb-2 font-medium'>Subscription Type</label>
                <input
                  type="text"
                  id="type"
                  name="type"
                  value={subscriptionBox.type}
                  disabled={true}
                  className='border-slate-300 border-2 p-2 rounded-lg bg-gray-200 cursor-not-allowed'
                />
              </div>
              <label className='mb-2 font-bold'>Shipping Address</label>
              <div className='flex flex-col mb-4'>
                <label className='mb-2'>Address</label>
                <input
                  id="address"
                  name="address"
                  value={subscription.shippingAddress.address}
                  required={true}
                  className='border-slate-300 border-2 p-2 rounded-lg'
                  onChange={handleInputChange}
                />
                <label className='mt-2 mb-2'>City</label>
                <input
                  id="city"
                  name="city"
                  value={subscription.shippingAddress.city}
                  required={true}
                  className='border-slate-300 border-2 p-2 rounded-lg'
                  onChange={handleInputChange}
                />
                <label className='mt-2 mb-2'>Province</label>
                <input
                  id="province"
                  name="province"
                  value={subscription.shippingAddress.province}
                  required={true}
                  className='border-slate-300 border-2 p-2 rounded-lg'
                  onChange={handleInputChange}
                />
                <label className='mt-2 mb-2'>Postal Code</label>
                <input
                  id="postalCode"
                  name="postalCode"
                  value={subscription.shippingAddress.postalCode}
                  required={true}
                  className='border-slate-300 border-2 p-2 rounded-lg'
                  onChange={handleInputChange}
                />
                <label className='mt-2 mb-2'>Phone Number</label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  value={subscription.shippingAddress.phoneNumber}
                  required={true}
                  className='border-slate-300 border-2 p-2 rounded-lg'
                  onChange={handleInputChange}
                />
              </div>
              <div className='flex justify-between'>
                <input
                  type="submit"
                  value="Create Subscription"
                  className='bg-orange-400 text-white rounded-lg p-3 hover:bg-orange-200 font-medium'
                />
                <button
                  type="button"
                  onClick={() => setIsSubscribing(false)}
                  className='bg-gray-400  text-white rounded-lg p-3 hover:bg-gray-200 font-medium'
                >
                  Back
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">{subscriptionBox.name}</h2>
            <div className='border border-black rounded-lg image-container relative'>
              <img src='/static/images/snack box.jpg' alt='Description of the image' className='rounded-full' />
            </div>
            <p className='text-center mb-4'>{subscriptionBox.description}</p>
            <p className='text-center font-bold mb-4'>${subscriptionBox.price.toFixed(2)}</p>
            <ul className='list-disc list-inside mb-4'>
              {subscriptionBox.items.map(item => (
                <li key={item.id}>{item.name} (Quantity: {item.quantity})</li>
              ))}
            </ul>
            <div className='flex justify-center'>
              <button className="bg-orange-400 text-white px-4 py-2 rounded font-medium mr-2" onClick={() => setIsSubscribing(true)}>Subscribe</button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded font-medium" onClick={onRequestClose}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionModal;
