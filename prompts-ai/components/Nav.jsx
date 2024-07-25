'use client';

import Link from 'next/link';
import Image from 'next/image';
import LogoImage from '@public/assets/images/logo.svg';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
	const isUserLoggedIn = true;
	const [providers, setProviders] = useState(null);
	const [toggleDropdown, setToggleDropdown] = useState(false);
	
	useEffect(() => {
		const setProviders = async () => {
			const response = await getProviders();
			setProviders(response);
		}
		setProviders();
	}, [])

	return (
	<nav className='
    w-full 
    mb-16 pt-3
    flex-between 
    '>
		<Link href='/' className='
		flex 
      	flex-center gap-2 
      	'>
			<Image src={ LogoImage } alt='prompts-ai logo' height={30} width={30} 
			className='object-contain'/>
			<p className='logo_text'>prompts-ai</p>
      	</Link>

		{/* desktop-navigation */}
		<div className='sm:flex hidden'>
			{isUserLoggedIn ? ( 
			<div className='
			flex
			gap-3 md:gap-5
			'>
				<Link href='/create-prompt' className='black_btn'>Create Post</Link>
				<button type='button' onClick={ signOut } className='outline_btn'>Sign Out</button>
				<Link href='/profile'>
					<Image src={ LogoImage } alt='profile' height={37} width={37}
					className='rounded-full'/>
				</Link>
			</div> 
			)
			:( 
			<>
				{providers && Object.values(providers).map( (provider) => (
					<button type='button' 
					onClick={ () => signIn(provider.id) }  
					key={provider.id}
					className='black_btn'
					>Sign In</button>	
				))}
			</> 
			)}	
		</div>

		{/* mobile-navigation */}
		<div className='
		relative flex 
		sm:hidden
		'>
			{isUserLoggedIn ? (
				<div className='flex'>
					<Image src={ LogoImage } alt='profile' height={37} width={37}
					onClick={() => setToggleDropdown( (prev) => !prev )}
					className='rounded-full'/>
					{toggleDropdown && (
						<div className='dropdown'>
							<Link href='/profile'
							onClick={ () => setToggleDropdown(false) }
							className='dropdown_link'
							>Profile</Link>
							<Link href='/create-prompt'
							onClick={ () => setToggleDropdown(false) }
							className='dropdown_link'
							>Create Prompt</Link>
							<button type="button"
							onClick={() => {setToggleDropdown(false),signOut();} }
							className='
							mt-5 w-full
							black_btn
							'>Sign Out</button>
						</div>
					)}
				</div>
			)
			:(
				<>
					{providers && Object.values(providers).map( (provider) => (
						<button type='button' 
						onClick={ () => signIn(provider.id)} 
						key={provider.id}
						className='black_btn'
						>Sign In</button>	
					))}
				</> 
			)}
		</div>
    </nav>
  )
}

export default Nav