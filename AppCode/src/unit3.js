import React from 'react';
import rehypeRaw from 'rehype-raw';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const Markdown2 = (props) => {
    const [markdown, setMarkdown] = React.useState('Under Construction')

    React.useEffect(() => {
        axios.get(`https://raw.githubusercontent.com/MLH-Fellowship/MLH-A11Y/server-side/api/topics/Animations.md`)

            .then(res => {
                const p = res.data;
                setMarkdown(p)
            })
    }, [])

    return (
        <div>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{markdown}</ReactMarkdown>
        </div>
    )
}

export default Markdown2
