const apiFetch = async () => {
    try{
        const response = await fetch('https://api.artic.edu/api/v1/artworks');
        const apiData = await response.json();
        if(!response.ok){
            throw new Error(response.status);
        }
        for(art of apiData.data){
            console.log(`Artist: ${art.artist_titles} // Title: ${art.title} - ${art.medium_display}`);
        }
    } catch(error) {
        console.error(error);
    }
}

apiFetch();