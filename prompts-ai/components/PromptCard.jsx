'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
	const router = useRouter();
	const pathName = usePathname();
	const {data: session} = useSession();
	const [copied, setCopied] = useState('');
	const handleCopy = () => {
		setCopied(post.prompt);
		navigator.clipboard.writeText(post.prompt);
		setTimeout(() => setCopied(''), 3000);
	}

	return (
	<div className='prompt_card'>
		<div className='
		flex gap-5
		justify-between
		items-center'>
			<div className='
			flex flex-1 gap-3
			justify-start
			items-center
			cursor-pointer'>
				<Image src={post.creator.image} alt='user_image'
				width={40} height={40}
				className='rounded-full object-contain'/>
				<div className='flex flex-col'>
					<h3 className='
					font-satoshi font-semibold
					text-gray-500'>
					{post.creator.username}
					</h3>
					<p className='
					font-inter
					text-sm text-gray-500'>{post.creator.email}</p>
				</div>
			</div>
			<div onClick={handleCopy}
			className='copy_btn'>
				<Image width={12} height={12}
				src={
					copied === post.prompt 
					? '/assets/icons/tick.svg' 
					: '/assets/icons/copy.svg'
				}
				alt='copy/tick-image'
				/>
			</div>
		</div>
		<p className='
		my-4
		font-satoshi
		text-sm text-gray-700
		'>{post.prompt}</p>
		<p onClick={ () => handleTagClick && handleTagClick(post.tag)} 
		className='
		font-inter
		text-sm 
		blue_gradient
		cursor-pointer'>#{post.tag}</p>
		{session?.user.id === post.creator._id &&
		pathName === '/profile' && (
		<div className='
		mt-5 pt-3
		flex-center gap-4
		border-t border-gray-100'>
			<p onClick={handleEdit}
			className='
			cursor-pointer
			green_gradient
			font-inter text-sm'>Edit</p>
			<p onClick={handleDelete}
			className='
			cursor-pointer
			orange_gradient
			font-inter text-sm'>Delete</p>
		</div>
		)}
	</div>
	)
}

export default PromptCard