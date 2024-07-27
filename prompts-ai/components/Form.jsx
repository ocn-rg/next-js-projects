import Link from 'next/link';

const Form = ({type, post, setPost, submitting, handleSubmit}) => {
	return (
	<section className='
	w-full max-w-full
	flex-start flex-col	
	'>
		<h1 className='head_text text-left'>
		<span className='blue_gradient'>{type} Post</span>
		</h1>
		<p className='desc text-left max-w-md'>
		{type} prompts and let you 
		<span className='blue_gradient'> imagination </span>
		run wild
		</p>
		<form 
		onSubmit={handleSubmit}
		className='
		mt-10 w-full max-w-2xl
		flex flex-col gap-7
		glassmosrphism
		'>
			<label>
				<span className='
				font-satoshi font-semibold
				text-base text-gray-700
				'>
					AI Prompt
				</span>
				<textarea 
				value={post.prompt}
				onChange={ (e) => setPost({ ...post, prompt: e.target.value}) } 
				placeholder='Enter prompt' required
				className='form_textarea'/>
			</label>
			<label>
				<span className='
				font-satoshi font-semibold
				text-base text-gray-700
				'>
					Tag {` `}
					<span className='font-normal'>(#product, #idea)</span>
				</span>
				<input 
				value={post.tag}
				onChange={ (e) => setPost({ ...post, tag: e.target.value}) } 
				placeholder='#tag' required
				className='form_input'/>
			</label>
			<div className='
			mx-3 mb-5
			flex-end gap-4
			'>
				<Link href='/' className='
				text-sm text-gray-500
				'>Cancel</Link>
				<button type="submit" disabled={submitting} className='
				px-5 py-1.5
				text-sm text-white
				bg-primary-orange
				rounded-full
				'>
					{ submitting ? `${type}...` : type }
				</button>
			</div>
		</form>
	</section>
  	)
}

export default Form