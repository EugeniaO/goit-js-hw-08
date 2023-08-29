import throttle from 'lodash.throttle';

const form = document.querySelector(".feedback-form");
        
form.addEventListener("submit", onFormSubmit);
form.addEventListener("input", throttle(onTextareaInput, 500));

const formData = {};

populateData();

function onTextareaInput(evt) {
    formData[evt.target.name] = evt.target.value;
    localStorage.setItem("feedback-form-state", JSON.stringify(formData));
};

function onFormSubmit(evt) {
    evt.preventDefault();
    const data = new FormData(form);

    for (let pair of data.entries()) {
        if (!pair[1]) {
            alert("Please fill in all the fields!");
            return;
        }
    }

    localStorage.removeItem("feedback-form-state");
    console.log(formData);
    evt.currentTarget.reset();
};


function populateData() {
    const savedData = localStorage.getItem("feedback-form-state");

    if (savedData) {
        const parsedData = JSON.parse(savedData);

        Object.entries(parsedData).forEach(([name, value]) => {
            form.elements[name].value = value;
            formData[name] = value;
        });
    }
 }