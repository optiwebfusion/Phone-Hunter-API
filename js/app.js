const loadPhone = async (searchId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchId}`);
    const dataArray = await res.json();
    const datas = dataArray.data;
    // console.log(datas)
    displayPhone(datas)
}



const displayPhone = phones => {

    //  Step 1 : Get The Phone Container Div
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = ''


    // Display Show All Button If Items More then 6
    const showAllContainer = document.getElementById('show-all');

    if(phones.length > 6) {
        showAllContainer.classList.remove('hidden')
    } else {
        showAllContainer.classList.add('hidden')
    }

    // Display Only First 6 Items
    phones = phones.slice(0, 6)


    phones.forEach(phone => {
        console.log(phone)



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
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">Buy Now</button>
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
const handleSearch = document.getElementById('handle-search');
handleSearch.addEventListener('click', (e) => {
    // Get the Search Field
    const searchField = document.getElementById('search-field');
    loadPhone(searchField.value)


})


// Loading Spinner
const loadingSpinnerToggle = isLoading => {

    const spinner = document.getElementById('spinner');

    if (isLoading) {
        spinner.classList.remove('hidden')
    } else {
        spinner.classList.add('hidden')  
    }
}


// loadPhone()