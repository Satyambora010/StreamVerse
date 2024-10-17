import axios from "axios";
import { useEffect } from "react";
import { useAuthStore } from "../Store/authUser";
import Navbar from "./Navbar";
const Subscribe = () => {
    const { user } = useAuthStore();

    useEffect(() => {
        // Load Razorpay script dynamically
        const script = document.createElement('script');
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);

        // Clean up the script when component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleSubscribe = async () => {
        try {
            // Create an order in your backend
            const { data: order } = await axios.post('/api/payment/create-order', {
                amount: 500, // Amount in paise (e.g., 5 INR)
                currency: 'INR',
            });
    
            // Initialize Razorpay
            const options = {
                key: '', // Replace with your actual Razorpay key
                amount: order.amount, // Amount in paise
                currency: order.currency,
                name: 'StreamVerse',
                description: 'Subscription Payment',
                order_id: order.id, // The order ID returned from your backend
                handler: async function (response) {
                    // Handle payment success here
                    try {
                        // Make a request to your backend to update the user's subscription
                        await axios.post('/api/auth/updateSubscription', {
                            userId: user._id, // Replace this with the actual user ID
                            subscription: 'premium', // Update to premium
                        });
    
                        alert('Payment successful and subscription updated to premium!');
                        // Optionally redirect the user or update the UI
                    } catch (error) {
                        console.error('Failed to update subscription:', error);
                        alert('Payment successful, but failed to update subscription.');
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                },
                notes: {
                    address: 'note address',
                },
                theme: {
                    color: '#F37254',
                },
            };
    
            const rzp = new window.Razorpay(options);
            rzp.open(); // Open the Razorpay payment popup
        } catch (error) {
            console.error(error);
            alert('Payment failed. Please try again!');
        }
    };

  return (
    <div className='bg-black text-white h-screen w-full'>
      <Navbar />
      <div className='flex flex-col gap-10 bg-black py-10 px-5 md:px-20 w-full'>
        <h1 className='text-3xl font-bold text-center'>Subscribe Now</h1>
        <p className='text-lg text-center'>
          Join our community and enjoy exclusive content and features!
        </p>
        <div className='flex flex-col md:flex-row justify-center gap-5'>
          {/* Pricing Plan 1 */}
          <div className='bg-gray-800 p-5 rounded-md shadow-lg flex flex-col items-center'>
            <h2 className='text-xl font-semibold'>Basic Plan</h2>
            <p className='text-lg'>Rs 50 / one time payment</p>
            <ul className='list-disc list-inside'>
              <li>Access to Original content</li>
              <li>Community forums</li>
              <li>Regular updates</li>
            </ul>
            <button onClick={handleSubscribe} className='bg-[#b20000] px-4 py-2 rounded mt-4'>Subscribe</button>
          </div>
          </div>
      </div>
    </div>
  );
};

export default Subscribe;

