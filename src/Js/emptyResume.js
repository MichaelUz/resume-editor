let sampleResponsibilities = `-This line has a bullet point.
*This text is in bold.*
**This text is highlighted and in bold.**
Manual text wrapping
Is required.`


const emptyResume  = {
    PersonalInformation:{
        name: 'John Doe',
        phoneNumber: '',
        location: '',
        email: ''
    },
    Education:{
        degree: "",
        school: "",
        secondaryLine: "",
        timeline: "",
        location: ""
    },
    Experience:[
        {
            company: 'A Company',
            description: '*This* **can** also be styled.',
            responsibilities: sampleResponsibilities,
            timeline: '01/2020 - 12/2020'
        }
    ],
    Projects:[],
    Skills: [],
}

export default emptyResume;