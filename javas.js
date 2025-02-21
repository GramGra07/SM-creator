function toRun() {
    document.addEventListener("DOMContentLoaded", function () {
        // Select all sections with the class 'active'
        const sections = document.querySelectorAll(".active");

        // Function to toggle the 'active' class
        function toggleActiveSections() {
            sections.forEach((section) => {
                section.classList.toggle("active");
            });
        }
    });
}
function generateData() {
    let inputString = document.getElementById('inputString').value;
    const selector = document.getElementById('selector').value;
    const list = document.getElementById('inputList').value;
    inputString += 'State';
    
    // Error handling
    let enumData = list.split(',').map(item => item.trim().toUpperCase());
    const uniqueEnumData = [...new Set(enumData)];
    if (enumData.length !== uniqueEnumData.length) {
        alert('Error: The list contains duplicate enums.');
        return;
    }
    if (inputString === 'State') {
        alert('Error: The mechanism name cannot be empty.');
        return;
    }
    if (list === '') {
        alert('Error: The list cannot be empty.');
        return;
    }
    if (selector !== 'Java' && selector !== 'Kotlin') {
        alert('Error: The selector must be either "Java" or "Kotlin".');
        return;
    }
    
    uniqueEnumData.push('IDLE'); // Correctly add 'IDLE' to the enumData array
    
    let generatedData = ''; // Initialize generatedData as an empty string

    if (selector === 'Java') {
        generatedData = `public enum ${inputString} {${uniqueEnumData.join(', ')}}\n\n`;
        generatedData += `private ${inputString} ${inputString}Var = ${inputString}.IDLE;\n\n`;
        
        let setters = ''; // Initialize setters as an empty string
        for (let i = 0; i < uniqueEnumData.length; i++) {
            setters += `public void set${inputString}${uniqueEnumData[i]}() {\n    ${inputString}Var = ${inputString}.${uniqueEnumData[i]};\n}\n\n`;
        }
        generatedData += setters;

        let switchStatements = ''; // Initialize switchStatements as an empty string
        switchStatements += `switch (${inputString}Var) {\n`;
        for (let i = 0; i < uniqueEnumData.length; i++) {
            switchStatements += `    case ${uniqueEnumData[i]}:\n        // Add code here\n        break;\n`;
        }
        switchStatements += '}\n';
        generatedData += switchStatements;

        document.getElementById('outputText').className = 'java-format';

    } else if (selector === 'Kotlin') {
        generatedData = `enum class ${inputString} {${uniqueEnumData.join(', ')}}\n\n`;
        generatedData += `private var ${inputString}Var: ${inputString} = ${inputString}.IDLE\n\n`;
        
        let setters = ''; // Initialize setters as an empty string
        for (let i = 0; i < uniqueEnumData.length; i++) {
            setters += `fun set${inputString}${uniqueEnumData[i]}() {\n    ${inputString}Var = ${inputString}.${uniqueEnumData[i]}\n}\n\n`;
        }
        generatedData += setters;

        let whenStatements = ''; // Initialize whenStatements as an empty string
        whenStatements += `when (${inputString}Var) {\n`;
        for (let i = 0; i < uniqueEnumData.length; i++) {
            whenStatements += `    ${inputString}.${uniqueEnumData[i]} -> {\n        // Add code here\n    }\n`;
        }
        whenStatements += '}\n';
        generatedData += whenStatements;

        document.getElementById('outputText').className = 'kotlin-format';
    }
    
    console.log('Generated Data:', generatedData);
    
    // Display the generated data
    document.getElementById('outputText').innerText = generatedData;
}