const displayArt = (art, url) => {
    const imgUrl = "/full/600,/0/default.jpg"

    const artContainer = document.getElementById('artBlock');

    const artImg = artContainer.querySelector('.artImg');
    let image = document.createElement('img');
    image.src = `${url}/${art.image_id}${imgUrl}`;
    image.style.width = '100%';
    artImg.append(image);

    const artArtist = artContainer.querySelector('.artArtist');
    let artist = document.createElement('p');
    artist.innerHTML = art.artist_display;
    artArtist.append(artist);

    const artTit = artContainer.querySelector('.artTitle');
    let title = document.createElement('h2');
    title.innerHTML = art.title;
    artTit.append(title);

    const artMed = artContainer.querySelector('.artMedium');
    let medium = document.createElement('p');
    medium.innerHTML = art.medium_display;
    artMed.append(medium);
}

const apiFetch = async () => {
    try{
        const response = await fetch('https://api.artic.edu/api/v1/artworks');
        const apiData = await response.json();
        if(!response.ok){
            throw new Error(response.status);
        }
        let artData = apiData.data;
        let artURL = apiData.config.iiif_url;
        displayArt(artData[Math.floor(Math.random() * artData.length)],artURL);
        // for(art of apiData.data){
        //     console.log(`Artist: ${art.artist_titles} // Title: ${art.title} - ${art.medium_display}`);
        // }
    } catch(error) {
        console.error(error);
    }
}

apiFetch();