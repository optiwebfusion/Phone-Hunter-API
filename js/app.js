const loadPhone = async (searchId='13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchId}`);
    const dataArray = await res.json();
    const datas = dataArray.data;
    // console.log(datas)
    displayPhone(datas, isShowAll);

}



const displayPhone = (phones, isShowAll) => {

    //  Step 1 : Get The Phone Container Div
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = ''


    // Display Show All Button If Items More then 6
    const showAllContainer = document.getElementById('show-all');

    if(phones.length > 6 && !isShowAll) {
        showAllContainer.classList.remove('hidden')
    } else {
        showAllContainer.classList.add('hidden')
    }


    // Display Only First 6 Items If Not Show All
    if (!isShowAll) {
        phones = phones.slice(0, 6)
    }

    phones.forEach(phone => {



        // Show Loading Spinner
        loadingSpinnerToggle(true);


        // Step 2 : Create a Card Content Div
        const phoneCard = document.createElement('div');

        phoneCard.classList = `card w-[85%] mx-auto md:w-full bg-base-100 shadow-[0_4px_24px_0px_rgba(0,0,0,0.3)]`;

        // Step 3 : Set the Inner HTML on Phone Card
        phoneCard.innerHTML = `
            <figure class="p-4">
                <img src="${phone.image}"
                alt="Shoes" />
            </figure>
            <div class="card-body text-center">
                <h2 class="text-center text-2xl text-slate-800 font-bold">${phone.phone_name}</h2>
                <p>There are many variations of passages of available, but the majority have suffered</p>
                <span class="my-3 text-2xl text-gray-500 font-semibold">$999</span>
                <div class="">
                    <button onclick="handleShowDetails('${phone.slug}')" class="btn bg-[#0D6EFD] hover:bg-[#0D6EFD] text-white text-lg font-medium">Show Details</button>
                </div>
            </div>
        `;

        // Step 4 : Append Child
        phoneContainer.appendChild(phoneCard)
    });

    // Hide Loading Spinner
    loadingSpinnerToggle(false)
}



// Handle Search Button
const handleSearch = (isShowAll) => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value
    loadPhone(searchText, isShowAll)
}



// Loading Spinner
const loadingSpinnerToggle = isLoading => {

    const spinner = document.getElementById('spinner');

    if (isLoading) {
        spinner.classList.remove('hidden')
    } else {
        spinner.classList.add('hidden')  
    }
}


// Show All Button
const showAll = () => {
    handleSearch(true)
}


// Handle Show Details

const handleShowDetails = async(id) => {

    // Load Single Phone Data
    const res = await fetch (`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();

    // Get The Phone Image
    const phoneImage = document.getElementById('phone-image');

    // Get The Phone Title
    const phoneTitle = document.getElementById('phone-title');

    // Get The Phone Storage
    const phoneStorage = document.getElementById('storage');

    // Get The Display Size
    const displaySize = document.getElementById('display-size');

    // Get The Phone ChipSet
    const chipSet = document.getElementById('chipset');

    // Get The Phone Memory
    const memory = document.getElementById('memory');

    // Get The Phone Slug
    const slug = document.getElementById('slug');

    // Get The Phone Release Date
    const releaseDate = document.getElementById('release-date');

    // Get The Phone Brand Name
    const brand = document.getElementById('brand');

    // Get The Phone GPS
    const gps = document.getElementById('gps');
    
    // Get The GPS Value from the API
    const apiGPS = data.data?.others?.GPS;


    // Set The Phone Image
    phoneImage.src = data.data?.image;

    // Set The Phone Title
    phoneTitle.innerText = data.data.name;

    // Set The Phone Storage
    phoneStorage.innerText = data.data.mainFeatures.storage;

    // Set The Display Size
    displaySize.innerText = data.data.mainFeatures.displaySize;

    // Set The Phone ChipSet
    chipSet.innerText = data.data.mainFeatures.chipSet;

    // Set The Phone Memory
    memory.innerText = data.data.mainFeatures.memory;

    // Set The Phone Slug
    slug.innerText = data.data.slug;

    // Set The Phone Release Date
    releaseDate.innerText = data.data.releaseDate;

    // Set The Phone Brand Name
    brand.innerText = data.data.brand;

    // Set The Phone GPS
    if (apiGPS === undefined) {
        gps.innerText = "No, GPS Not Supported";
    } else {
        gps.innerText = data.data?.others?.GPS;
    }

    showPhoneDetails(data)

}


const showPhoneDetails = (phone) => {
    //Show The Modal
    show_modal_detail.showModal()
}

loadPhone()
