document.addEventListener("DOMContentLoaded", function () {
    console.log("hello")
    
    
    document.getElementById('toggle-description').addEventListener('click', function () {
        toggleSection('description');
    });
    
    document.getElementById('toggle-review').addEventListener('click', function () {
        toggleSection('review');
    });
});

function toggleSection(sectionId) {
    var section = document.getElementById(sectionId + '-section');
    console.log(sectionId + '-section')
    console.log(section)
    console.log(section.style.display)
    document.querySelectorAll('.toggle-section').forEach(item => {
        item.style.display = 'none'
    })
    if (section.style.display === 'none' || section.style.display === '') { 
        section.style.display = 'block';
    } else {
        section.style.display = 'none';
    }
}