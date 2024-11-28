import React from 'react';

export default function UrlForm() {
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.target as HTMLFormElement);
        alert(data.get('inputText'));
    }
    return (
        <form className='border-4 border-black' onSubmit={handleSubmit}>
            <input type="text" name="inputText" />
            <button type="submit">Submit</button>
        </form>
    )
}
