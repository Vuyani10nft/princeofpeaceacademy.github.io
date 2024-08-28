document.addEventListener('DOMContentLoaded', function() {
    const gradeSelect = document.getElementById('grade');
    const subjectOptions = document.getElementById('subject-options');
    const responseMessage = document.getElementById('response-message');
    const form = document.getElementById('enrollment-form');

    const subjects = {
        'FET Phase': [
            'Mathematics', 'Math Literacy', 'Geography', 'Tourism', 'English Fal/HL', 'Economics',
            'Physical Sciences', 'Technical Maths', 'Accounting', 'History', 'Business Studies',
            'Natural Sciences', 'Life Sciences', 'EMS', 'Social Sciences', 'Technical Sciences'
        ],
        'GET Phase': [
            'Mathematics', 'Math Literacy', 'Geography', 'History', 'English',
            'Natural Sciences', 'Life Sciences', 'EMS', 'Social Sciences'
        ],
        'Extra Tuition Services': [
            'Mathematics', 'Math Literacy', 'Geography', 'History', 'English',
            'Natural Sciences', 'Life Sciences', 'EMS', 'Social Sciences', 'Technical Sciences'
        ]
    };

    function updateSubjects() {
        const selectedGrade = gradeSelect.value;
        const subjectsForGrade = subjects[selectedGrade] || [];

        subjectOptions.innerHTML = subjectsForGrade.map(subject => `
            <div class="checkbox-item">
                <input type="checkbox" id="${subject}" name="subjects[]" value="${subject}">
                <label for="${subject}">${subject}</label>
            </div>
        `).join('');
    }

    gradeSelect.addEventListener('change', updateSubjects);

    // Restrict phone number input to digits only
    function restrictPhoneNumberInput(event) {
        const input = event.target;
        input.value = input.value.replace(/[^0-9]/g, '');
    }

    document.getElementById('phone').addEventListener('input', restrictPhoneNumberInput);
    document.getElementById('guardian-phone').addEventListener('input', restrictPhoneNumberInput);

    // Handle form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Show processing message
        responseMessage.textContent = 'Processing your form. We will get back to you shortly.';
        responseMessage.classList.remove('hidden');

        // Use Formspree's AJAX endpoint to submit the form
        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                responseMessage.textContent = 'Thank you for your submission! We will get back to you soon.';
                form.reset(); // Reset the form fields
            } else {
                responseMessage.textContent = 'Oops! There was a problem with your submission. Please try again.';
            }
        }).catch(error => {
            responseMessage.textContent = 'Oops! There was a problem with your submission. Please try again.';
        });
    });
});
