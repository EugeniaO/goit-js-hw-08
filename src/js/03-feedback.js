import throttle from 'lodash.throttle';

const refs = {
    form: document.querySelector(".feedback-form"),
            email: document.querySelector(".feedback-form input"),

        textarea: document.querySelector(".feedback-form textarea")
} 

refs.form.addEventListener("submit", onFormSubmit);
refs.form.addEventListener("input", throttle(onTextareaInput, 500));
const formData = {};

populateData();



function onTextareaInput(evt) {
    
    formData[evt.target.name] = evt.target.value;
    // console.log(formData);

    localStorage.setItem("feedback-form-state", JSON.stringify(formData));

};


function onFormSubmit(evt) {
    evt.preventDefault();
    evt.currentTarget.reset();
localStorage.removeItem("feedback-form-state");
    console.log(formData);
 };


function populateData() {
    const savedData = localStorage.getItem("feedback-form-state",);
    if (savedData) {
            const parsedData = JSON.parse(savedData);

        Object.entries(parsedData).forEach(([name, value]) => {
            console.log(name, value);
            refs.form.elements[name].value = value;
        }

        );
    }
 }