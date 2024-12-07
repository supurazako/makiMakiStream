export default function TwitchStreamBox({ url }: { url: string }) {
    return (
        <iframe
        allow="fullscreen"
        title="text"
        // TODO: change parent url when deploy
        src={url+"&parent=localhost"}  
        width="100%"
        height={window.innerHeight}
        ></iframe>
    )
}
