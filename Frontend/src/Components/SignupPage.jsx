import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../Store/authUser';
const SignupPage = () => {
	const { searchParams } = new URL(document.location);
	const emailValue = searchParams.get("email");

	const [email, setEmail] = useState(emailValue || "");
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");

	const { signup } = useAuthStore();

	const handleSignUp = (e) => {
		e.preventDefault();
		signup({ email, userName, password });
	}

  return (
    <>
    <div className="hero-bg h-screen w-full bg-cover bg-center bg-no-repeat">
      <header className="max-w-6xl mx-auto flex justify-between items-center py-6 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src="https://streamverse1.s3.ap-south-1.amazonaws.com/Photos/SV_Logo.png" alt="logo" className="w-10 h-10" />
          <h1 className="text-2xl font-bold text-[#B20000]">StreamVerse</h1>
        </Link>
        <nav className="flex items-center gap-4">
          <a href="/login" className="text-lg font-medium">Login</a>
          <a href="/signup" className="text-lg font-medium">Signup</a>
        </nav>
      </header>
      <div className='flex justify-center items-center mt-20 mx-3'>
				<div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
					<h1 className='text-center text-white text-2xl font-bold mb-4'>Sign Up</h1>

					<form className='space-y-4' onSubmit={handleSignUp}>
						<div>
							<label htmlFor='email' className='text-sm font-medium text-gray-300 block'>
								Email
							</label>
							<input
								type='email'
								className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
								placeholder='you@example.com'
								id='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
            <div>
							<label htmlFor='username' className='text-sm font-medium text-gray-300 block'>
								Username
							</label>
							<input
								type='text'
								className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
								placeholder='johndoe'
								id='username'
								value={userName}
								onChange={(e) => setUserName(e.target.value)}
							/>
						</div>

						<div>
							<label htmlFor='password' className='text-sm font-medium text-gray-300 block'>
								Password
							</label>
							<input
								type='password'
								className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring'
								placeholder='••••••••'
								id='password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>

						<button
							className='w-full py-2 bg-red-600 text-white font-semibold rounded-md
							hover:bg-red-700'
						>
							Sign Up
						</button>
					</form>
          <div className='text-center text-gray-400'>
						Already a member?{" "}
						<Link to={"/login"} className='text-red-500 hover:underline'>
							Sign in
						</Link>
					</div>
				</div>
			</div>
    </div>
    </>
  );
};

export default SignupPage;
