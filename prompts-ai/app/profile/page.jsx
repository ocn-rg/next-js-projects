'use client';

import Profile from '@components/Profile';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const MyProfile = () => {
	const router = useRouter();
	const [posts, setPosts] = useState([]);
	const { data: session } = useSession();
	const handleEdit = (post) => {
		router.push(`/update-prompt?id=${post._id}`);
	};
	const handleDelete = async (post) => {
		const hasConfirmed = confirm('Delete the prompt');

		if (hasConfirmed ){
			try {
				await fetch(`/api/prompt/${post._id.toString()}`, {method: "DELETE"});
				const filteredPosts = posts.filter((item) =>  item._id !== post._id);

				setPosts(filteredPosts);
			} catch (error) {
				console.log(error);
			}
		}
	};

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/users/${session?.user.id}/posts`);
			const data = await response.json();

			setPosts(data);
		}

		if (session?.user.id) fetchPosts();
	}, []);

	return (
	<Profile 
	name='My' desc='Your Personalised profile page'
	data={posts}
	handleEdit={handleEdit}
	handleDelete={handleDelete} />
	)
}

export default MyProfile