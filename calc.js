const baseCost = 500;
const firstSubjectCost = 450;
const additionalSubjectCost = 150;

function calculateTotal(sectionId, totalElementId) {
    const section = document.querySelector(sectionId);
    const totalElement = document.querySelector(totalElementId);
    const selectedSubjects = section.querySelectorAll('input[type="checkbox"]:checked').length;
    let total = baseCost;

    if (selectedSubjects > 0) {
        total += firstSubjectCost + (selectedSubjects - 1) * additionalSubjectCost;
    }
    
    totalElement.innerText = total;

    // Update remaining subjects with (+150 Rands)
    section.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        const label = checkbox.nextElementSibling;
        if (!checkbox.checked) {
            label.innerText = checkbox.dataset.subject + (selectedSubjects > 0 ? " (+150 Rands)" : "");
        } else {
            label.innerText = checkbox.dataset.subject;
        }
    });
}

// Function to initialize the sections
function initializeSection(sectionSelector, totalSelector, subjects) {
    const section = document.querySelector(sectionSelector);
    const totalElement = document.querySelector(totalSelector);
    const subjectGrid = section.querySelector('.subject-grid');

    // Clear existing subjects
    subjectGrid.innerHTML = '';

    subjects.forEach(subject => {
        const div = document.createElement('div');
        const input = document.createElement('input');
        const label = document.createElement('label');

        input.type = 'checkbox';
        input.id = `${sectionSelector}-${subject.replace(/\s+/g, '_')}`; // Unique IDs for each subject
        input.dataset.subject = subject;
        input.addEventListener('change', () => calculateTotal(sectionSelector, totalSelector));

        label.setAttribute('for', input.id);
        label.innerText = subject;

        div.appendChild(input);
        div.appendChild(label);
        subjectGrid.appendChild(div);
    });

    // Initial calculation
    calculateTotal(sectionSelector, totalSelector);
}

// Initialize FET Phase Subjects
initializeSection('#fet-phase', '#fet-total', [
    'Mathematics', 'Math Literacy', 'Geography', 'Tourism', 'English Fal/HL', 'Economics', 
    'Physical Sciences', 'Technical Maths', 'Accounting', 'History', 'Business Studies',
    'Natural Sciences', 'Life Sciences', 'EMS', 'Social Sciences', 'Technical Sciences'
]);

// Initialize GET Phase Subjects
initializeSection('#get-phase', '#get-total', [
    'Mathematics', 'Math Literacy', 'Geography', 'History', 'English', 
    'Natural Sciences', 'Life Sciences', 'EMS', 'Social Sciences'
]);

// Initialize Extra Tuition Services
initializeSection('#extra-services', '#extra-total', [
    'Mathematics', 'Math Literacy', 'Geography', 'History', 'English', 
    'Natural Sciences', 'Life Sciences', 'EMS', 'Social Sciences', 'Technical Sciences'
]);
