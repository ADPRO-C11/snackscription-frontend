import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

interface Subscription {
  id: string;
  uniqueCode: string;
  type: string;
  shippingAddress: {
    address: string;
    city: string;
    phoneNumber: string;
    postalCode: string;
    province: string;
  };
  subscriptionBoxId: string;
  userId: string;
  status: string;
  dateCreated: string;
}

interface SubscriptionModalProps {
  subscription: Subscription;
  onClose: () => void;
  onSave: (updatedSubscription: Subscription) => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ subscription, onClose, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [shippingAddress, setShippingAddress] = useState(subscription.shippingAddress);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const updatedSubscription = { ...subscription, shippingAddress };
    onSave(updatedSubscription);
    setIsEditing(false);
  };

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300); // Match this timeout with the CSS transition duration
  };

  const statusColor = subscription.status === 'PENDING' ? 'text-yellow-500'
    : subscription.status === 'SUBSCRIBED' ? 'text-green-500'
    : subscription.status === 'REJECTED' ? 'text-red-500'
    : '';

  return ReactDOM.createPortal(
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="bg-black bg-opacity-50 absolute inset-0 transition-opacity duration-300" onClick={closeModal}></div>
      <div className={`bg-white p-6 rounded-lg shadow-lg z-10 w-full max-w-lg mx-auto transform transition-transform duration-300 ${isVisible ? 'scale-100' : 'scale-95'}`}>
        <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-900" onClick={closeModal}>
          &times;
        </button>
        <h2 className="font-bold text-2xl mb-4 text-center">Subscription Details</h2>
        <div className="border-b pb-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Unique Code:</span>
            <span>{subscription.uniqueCode}</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Type:</span>
            <span>{subscription.type}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold">Date Created:</span>
            <span>{new Date(subscription.dateCreated).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-2">Shipping Address</h3>
          {isEditing ? (
            <div className="space-y-2">
              <label>Address</label>
              <input
                type="text"
                name="address"
                value={shippingAddress.address}
                onChange={handleInputChange}
                placeholder="Address"
                className="w-full p-2 border rounded"
              />
              <label>City</label>
              <input
                type="text"
                name="city"
                value={shippingAddress.city}
                onChange={handleInputChange}
                placeholder="City"
                className="w-full p-2 border rounded"
              />
              <label>Province</label>
              <input
                type="text"
                name="province"
                value={shippingAddress.province}
                onChange={handleInputChange}
                placeholder="Province"
                className="w-full p-2 border rounded"
              />
              <label>Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={shippingAddress.postalCode}
                onChange={handleInputChange}
                placeholder="Postal Code"
                className="w-full p-2 border rounded"
              />
              <label>Phone number</label>
              <input
                type="text"
                name="phoneNumber"
                value={shippingAddress.phoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="w-full p-2 border rounded"
              />
              <div className="flex justify-end space-x-2 mt-4">
                <button onClick={handleSubmit} className="bg-orange-400 hover:bg-orange-500 text-white p-2 rounded transition duration-300">Save</button>
                <button onClick={() => setIsEditing(false)} className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded transition duration-300">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <p><strong>Address:</strong> {shippingAddress.address}</p>
              <p><strong>City:</strong> {shippingAddress.city}, {shippingAddress.province}</p>
              <p><strong>Postal Code:</strong> {shippingAddress.postalCode}</p>
              <p><strong>Phone Number:</strong> {shippingAddress.phoneNumber}</p>
              <button onClick={() => setIsEditing(true)} className="bg-orange-400 hover:bg-orange-500 text-white p-1 px-4 rounded mt-10 transition duration-300">Edit</button>
            </div>
          )}
        </div>

        <div className={`mt-4 text-center ${statusColor}`}>
          <strong>Status: </strong>{subscription.status}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default SubscriptionModal;
