import React from 'react';
import {Text, View, Font } from '@react-pdf/renderer';
import TitledSection from './TitledSection';

import allStyles from './styles';
import { propEq } from 'ramda';

const readTextArea = (input, isDescription=false) => {
    
    let i = 0;
    let highlightStart = false;
    let boldStart = false;
    let curr = "";
    let lines = [];

    const bullet = '•';

    const styles = allStyles.GeneralText;

    const addTextComponent = (text, highlighted=false, bold=false) => {

        if(text === '')return;
        let style= {};
        if(highlighted && !bold) style = styles.highlighted;
        else if (highlighted && bold) style = styles.highlightedBold;
        else if (!highlighted && bold) style = styles.bold;
        else style = styles.regular;

        return <Text key={i + text} style={style}>{text}</Text>;
    }

    const getPreviousChar = (input, startIndex) => {
        
        let i = startIndex;
        let char = input.charAt(i);
        while((char === '*' || char === ' ') && i >= 0){
            char = input.charAt(--i);
        }

        return i >= 0 ? char : '\n';
    }

    while(i < input.length){
        let char = input.charAt(i);
        let lineElements = [];

        //Add characters
        while(char !== '\n' && i < input.length){

            if ((char === ' ' || char === '\n') && !(highlightStart || boldStart)){
                lineElements.push(addTextComponent(curr));
                lineElements.push(addTextComponent(" "));
                curr = '';
            }
            else if(char !== '*' && !(char === '-' && getPreviousChar(input, i - 1) === '\n')){
                curr += char;
                if (getPreviousChar(input, i - 1) === '\n' && !isDescription){
                    lineElements.push(<Text key={i+'indent'} style={styles.indent}>{" "}</Text>);
                }
            }
            else if(char === '*'){
                if(i+1 < input.length && input.charAt(i + 1) === '*'){
                    highlightStart = !highlightStart;
                    if(!highlightStart){
                        lineElements.push(addTextComponent(curr, true, true));
                        curr = '';
                    }
                    i++;
                }
                else{
                    boldStart = !boldStart;
                    if(!boldStart){
                        lineElements.push(addTextComponent(curr, false, true));
                        curr = '';
                    }
                } 
            }
            else if (char === '-' && getPreviousChar(input, i - 1) === '\n'){
                lineElements.push(<Text key={i+'bulletPoint'} style={styles.bulletPoint}>{bullet}</Text>);
            }
            i++;
            char = input.charAt(i);
        }
        curr += '\n';
        lineElements.push(addTextComponent(curr, false, false));
        curr = '';

        //Add entire line
        lines.push(
            <View key={i + 'lineView'} style={styles.lineView}>
                {lineElements}
            </View>
        );
        
        i++;
    }

    addTextComponent(curr, false, false);

    return lines;

}


const Education = (props) => {

    const data = props.data;
    const styles = allStyles.Education;

    return(
        <TitledSection section="Education">
            <View style={styles.educationView}>
                <View style={styles.educationLeft}>
                    <View style={styles.degreeSchoolBox}>
                        <Text style={styles.degree}>{data.degree + ' '}</Text>
                        <Text style={styles.school}>{' - ' + data.school}</Text>
                    </View>
                    <Text style={styles.secondaryLine}>{data.secondaryLine}</Text>
                </View>
                <View style={styles.educationRight}>
                    <Text style={styles.timeline}>{data.timeline}</Text>
                    <Text style={styles.location}>{data.location}</Text>
                </View>
            </View>
            
        </TitledSection>
    )
}

const PersonalInformation = (props) =>{

    const data = props.data;
    const infoBoxText =  `${data.phoneNumber} | ${data.email} | ${data.location}`;
    
    const styles = allStyles.PersonalInformation;

    return(
        <View style={styles.personalInformationView}>
            <Text style={styles.name}>{data.name} </Text>
            <Text style={styles.infoBox}>{infoBoxText} </Text>
        </View>
    )
}

const ShortProjExp = (props) => {

    const data = props.data;
    const styles = allStyles.ShortProjExp;

    const Jobs = data.map((job,index) => (
        <View key={index} style={styles.view}>
            <View style={styles.left}>
                <Text style={styles.title}>{job.company + ' | '}</Text>
                <Text style={styles.description}>{job.description}</Text>
            </View>
            <View style={styles.right}>
                <Text style={styles.timeline}>{job.timeline}</Text>
            </View>
        </View>
    ));


    return(
        <TitledSection section="Experience">
            {Jobs}
        </TitledSection>
    )
}

const ProjExp = (props) => {

    const data = props.data;
    const styles = allStyles.ProjExp;
    const shortStyles = allStyles.ShortProjExp;
    
    let key = props.title === 'Projects' ? 'title' : 'company';

    const ProjExps = data.map((element, index) => {

        if(element.responsibilities !== ''){
            const textComponents = readTextArea(element.responsibilities);
            const descComponents = readTextArea(element.description, true);
            return(
                <View key={index} style={styles.view}>
                    <View style={styles.header}>
                        <Text style={styles.title}>{element[key] + ' | '}</Text>
                        {descComponents}
                    </View>
                    <View style={styles.responsibilitiesView}>
                        {textComponents}
                    </View>
                    <View style={styles.timelineView}>
                        <Text style={styles.timeline}>{element.timeline}</Text>
                    </View>
                </View>
            );
        }
        else{
            const descComponents = readTextArea(element.description, true);
            return (
                <View key={index + 'short'} style={shortStyles.view}>
                    <View style={shortStyles.left}>
                        <Text style={shortStyles.title}>{element[key] + ' | '}</Text>
                        {descComponents}
                    </View>
                    <View style={shortStyles.right}>
                        <Text style={shortStyles.timeline}>{element.timeline}</Text>
                    </View>
                </View>
            )
        }
    });

    return(
        <TitledSection section={props.title}>
            {ProjExps}
        </TitledSection>
    )
}

const Skills = (props) => {
    
    const data = props.data;
    const styles = {
        ...allStyles.Skills,
        generalText: allStyles.GeneralText
    }

    let skillCount = {
        first: 0,
        second: 0
    };
    let skills = [[], [], [], []];
    let skillsJSX = [[], [], []];

    //Sort the skills into the correct arrays
    data.forEach((skill) => {
        if(skill.proficiency === 'strong') skills[0].push(skill);
        else if(skill.proficiency === 'medium') skills[1].push(skill);
        else if(skill.proficiency === 'familiar') skills[2].push(skill);
        else if(skill.proficiency === 'n/a') skills[3].push(skill);
    });

    //Make JSX elements of the skills
    for (let i = 0; i < skills.length; i++){
        skillsJSX[i] = skills[i].map((skill, index) => {
            
            //Determine char count for each line
            if(i < 3){
                if(index >= 0 && index < Math.floor(skills[i].length / 2)) 
                    skillCount.first++;
            
                if(index >= Math.floor(skills[i].length / 2) && index < skills[i].length)
                    skillCount.second++;
            }
            
            
            if (skill.proficiency !== 'n/a')
                return <Text key={index+skill.name} style={styles.generalText.whiteRegular}>{skill.name}</Text>;
            else
                return(
                    <View key={index + skill.name + 'view'} style={styles.additionalSkill}>
                        <Text key={index+skill.name} style={styles.generalText.boldSmall}>{skill.name}</Text>
                    </View>
                ); 
                
        });
    }

    //Determine final style of section
    const determineStyle = (elements, style, line=0) => {
        let numSkills = elements.length;

        let total = Math.max(line === 0 ? skillCount.first : skillCount.second, 1);
        let width = numSkills / total * 98;

        width+='%';
        return {
            ...style,
            width: width
        }
    }

    //Make skill line JSX
    let skillLinesJSX = [[],[]];

    for(let i = 0; i < 2; i++){
        let start;
        let end;

        for (let j = 0; j < 3; j++){
            let style;
            if(j === 0) style = styles.strongSkill;
            if(j === 1) style = styles.mediumSkill;
            if(j === 2) style = styles.familiarSkill;

            if(i === 0){
                start = 0;
                end = Math.floor(skillsJSX[j].length / 2);
            }
            else{
                start = Math.floor(skillsJSX[j].length / 2);
                end = skillsJSX[j].length;
            }
            
            skillLinesJSX[i].push(
                <View key={i+j+'section'} style={determineStyle(skills[j].slice(start,end), style, i)}>
                    {skillsJSX[j].slice(start, end)}
                </View>
            )
        }
    }
    
    return(
        <TitledSection section="Skills">
            <View style={styles.view}>
                <View style={styles.skillsView}>
                    <View style={styles.lineView}>
                        {skillLinesJSX[0]}
                    </View>
                    <View style={styles.lineView}>
                        {skillLinesJSX[1]}
                    </View>
                </View>
                <View style={styles.sideView}>
                    {skillsJSX[3]}
                </View>
            </View>
        </TitledSection>
    )
}

export {
    PersonalInformation, 
    Education,
    ProjExp as Projects,
    ProjExp as Experience,
    ShortProjExp as ShortExperience,
    ShortProjExp as ShortProjects,
    Skills as Skills
}

export const SectionTypes = {
    PERSONAL_INFORMATION: 'PersonalInformation',
    EDUCATION: 'Education',
    EXPERIENCE: 'Experience',
    PROJECTS: 'Projects',
    SKILLS: 'Skills'
}
