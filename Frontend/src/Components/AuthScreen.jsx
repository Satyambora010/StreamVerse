import { ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AuthScreen = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(email);
        navigate(`/signup?email=${email}`);
    }
  return (
    <div className='hero-bg h-screen w-full bg-cover bg-center bg-no-repeat'>
      <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
        <Link to={"/"} className='flex items-center gap-2'>
			<img src='https://streamverse1.s3.ap-south-1.amazonaws.com/Photos/SV_Logo.png' alt='logo' className='w-10 h-10' />
            <h1 className="text-2xl font-bold text-[#B20000]">StreamVerse</h1>
        </Link>
        <Link to={"/login"} className='text-[#B20000] text-xl font-semibold py-1 px-2'>
					Sign In
		</Link>
	</header>
    <div className='flex flex-col items-center justify-center text-center py-40 text-white max-w-6xl mx-auto'>
				<h1 className='text-4xl md:text-6xl font-bold mb-4'>Unlimited movies, TV shows, and more</h1>
				<p className='text-lg mb-4'>Watch anywhere. Cancel anytime.</p>
				<p className='mb-4'>Ready to watch? Enter your email to create or restart your membership.</p>

				<form className='flex flex-col md:flex-row gap-4 w-1/2' onSubmit={handleFormSubmit}>
					<input
						type='email'
						placeholder='Email address'
						className='p-2 rounded flex-1 bg-black/80 border border-gray-700'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<button className='bg-red-600 text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center'>
						Get Started
						<ChevronRight className='size-8 md:size-10' />
					</button>
				</form>
			</div>
    </div>
  );
};

export default AuthScreen;
