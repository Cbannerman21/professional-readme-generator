// declaring the global req's
const inquirer = require('inquirer');
const fs = require('fs');
const generateReadMe = require('./src/generate-readme');
//function to create a readme document in the specified destination
const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/README.md', fileContent, err => {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                ok: true,
                message: 'File created successfully!'
            });
        });
    });
};

const promptUser = () => {
    // using let variable to enable changing the content of the strings
let readMeData = {
    projects: {
        projectName: '',
        projectDescription: '',
        projectLanguage: '',
        projectContributors: '',
    },
}

return inquirer.prompt([
    // array of questions to ask user
    { //name of project
        type: 'input',
        name: 'projectName',
        message: 'Enter the name of your project so we can make a ReadMe!'
    },
    {// project description
        type: 'input',
        name: 'projectDescription',
        message: 'What kind of project are you working on?'
    },
    { // project languages
        type: 'input',
        name: 'projecLanguage',
        message: 'What languages did you use in this project?'
    },
    { // list of contributors
        type: 'input',
        name: 'projectContributors',
        message: 'Who worked on this project?'
    },
    { //link to project site
        type: 'input',
        name: 'projectLink',
        message: 'Please add a link to the project'
    }
])
// send answers to the readme file
.then(answers => readMeData.projects = {
    projectName: answers.projectName,
    projectDescription: answers.projectDescription,
    projectLanguage: answers.projectLanguage,
    projectContributors: answers.projectContributors,
    projectLink: answers.projectLink
})

}
// calls to initialize the collection of readme data and then writing it 
promptUser()
.then(readMeData => {
    return generateReadMe(readMeData)
})
.then(readMeFile => {
    return writeFile(readMeFile)
})
