// Gallery index and max
let galleryIndex = 0;
let galleryMax = 1;

// Add navigation button
const nextPiece = () => {
    const headBlock = document.querySelector('header');

    const nextButton = document.createElement('button');
    nextButton.type = "button";
    nextButton.classList.add('nextButton');
    nextButton.innerHTML = "View next piece";
    headBlock.append(nextButton);

    nextButton.addEventListener('click', event => {
        event.preventDefault();
        let containBlock = document.querySelector('.artBlock');
        containBlock.remove();

        if(galleryIndex == galleryMax){
            galleryIndex = 0;
            artworkFetch(galleryIndex);
        } else {
            galleryIndex++;
            artworkFetch(galleryIndex);
        }
    })
}

// Add artwork container
const displayArt = (art, url) => {
    const imgUrl = "/full/600,/0/default.jpg"

    const artContainer = document.createElement('div');
    artContainer.classList.add('artBlock');

    const artImg = document.createElement('div');
    artImg.classList.add('artImg');
    let image = document.createElement('img');
    if (!art.image_id) {
        image.src = `img/noImg.jpg`;
    } else {
        image.src = `${url}/${art.image_id}${imgUrl}`;
    }
    image.style.width = '100%';
    artImg.append(image);
    artContainer.append(artImg);

    const mainBlock = document.querySelector('main');
    mainBlock.append(artContainer);

    displayInfo(art);
}

// Add artwork info
const displayInfo = (art) => {
    const artContainer = document.querySelector('.artBlock');

    const artMetadata = document.createElement('div');
    artMetadata.classList.add('artMetadata');
    artContainer.append(artMetadata);

    const artTitle = document.createElement('div');
    artTitle.classList.add('artTitle');
    let title = document.createElement('h2');
    title.innerHTML = art.title;
    artTitle.append(title);
    artMetadata.append(artTitle);

    const artMedium = document.createElement('div');
    artMedium.classList.add('artMedium');
    let medium = document.createElement('p');
    medium.innerHTML = art.medium_display;
    artMedium.append(medium);
    artMetadata.append(artMedium);

    const aboutButton = document.createElement('button');
    aboutButton.type = "button";
    aboutButton.classList.add('artButton');
    aboutButton.innerHTML = "About the artist";
    artMetadata.append(aboutButton);

    aboutButton.addEventListener('click', event => {
        event.preventDefault();
        // console.log(art.artist_ids[0]);
        agentFetch(art.artist_ids[0]);
    })
}

// Add artist info
const displayArtist = (artist) => {

    const artContainer = document.querySelector('.artBlock');

    const artistMetadata = document.createElement('div');
    artistMetadata.classList.add('artistMetadata');
    artContainer.append(artistMetadata);

    const artistName = document.createElement('div');
    artistName.classList.add('artistName');
    let name = document.createElement('h2');
    name.innerHTML = artist.title;
    artistName.append(name);
    artistMetadata.append(artistName);

    const artistLife = document.createElement('div');
    artistLife.classList.add('artistLife');
    let born = document.createElement('p');
    let birthDate = artist.birth_date;
    let deathDate = artist.death_date;
    if (!birthDate && !deathDate) {
        born.innerHTML = `Dates unknown`;
    } else if (!birthDate) {
        born.innerHTML = `Birth year unknown`;
    } else if (!deathDate) {
        born.innerHTML = `Death year unknown`;
    } else {
        born.innerHTML = `${birthDate} - ${deathDate}`;
    }
    artistLife.append(born);
    artistMetadata.append(artistLife);

    const aboutButton = document.createElement('button');
    aboutButton.type = "button";
    aboutButton.classList.add('artistButton');
    aboutButton.innerHTML = "Artwork details";
    artistMetadata.append(aboutButton);

    let artInfo = artContainer.querySelector('.artMetadata');
    artInfo.remove();
    artContainer.append(artistMetadata);

    aboutButton.addEventListener('click', event => {
        event.preventDefault();
        artworkFetch(galleryIndex);
    })
    
}

// Fetch artwork data
const artworkFetch = async (index) => {
    try{
        const response = await fetch('https://api.artic.edu/api/v1/artworks');
        const apiData = await response.json();
        if(!response.ok){
            throw new Error(response.status);
        }
        let artData = apiData.data;
        let artURL = apiData.config.iiif_url;
        let artistMetadata = document.querySelector('.artistMetadata');
        galleryMax = artData.length-1; 
        if (artistMetadata){
            artistMetadata.remove();
            displayInfo(artData[index]);
        } else {
            displayArt(artData[index],artURL);
        }
    } catch(error) {
        console.error(error);
    }
}

// Fetch artist data
const agentFetch = async (artist) => {
    try{
        const response = await fetch(`https://api.artic.edu/api/v1/agents/${artist}`);
        const agentData = await response.json();
        if(!response.ok){
            throw new Error(response.status);
        }
        let agent = agentData.data;
        // console.log(agent.title);
        // console.log(agent.birth_date);
        // console.log(agent.death_date);
        displayArtist(agent);
    } catch(error) {
        console.error(error);
    }
}

nextPiece();
artworkFetch(galleryIndex);