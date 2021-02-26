import React from 'react';
import ElementContainer from './ElementContainer/ElementContainer';
import Input from '../Input/Input';
import Dropdowm from '../Dropdown/Dropdown';
import Button from '../Button/Button';

const Skills = (props) => {
    const data = props.data;
    const style = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }
    const viewStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    }
    const buttonStyle = {
        backgroundColor: '#f06141',
        color: 'white',
        borderRadius: '2px',
        marginLeft: '5px',
        border: 'none'
    }

    const inputChangeHandler = (dataItem, index, value) => {
        const newData = [...props.data];
        newData[index][dataItem] = value;
        props.update(newData);
    }

    const addSkill = () => {
        const newData = [...props.data];
        newData.push({
            name: 'Skill',
            proficiency: 'strong'
        });
        props.update(newData);
    }

    const removeSkill = (index) => {
        const newData = [...props.data];
        newData.splice(index, 1);
        props.update(newData);
    }

    const skillsJSX = data.map((skill, index) => {
        return(
            <div style={style} key={index + 'entireskill'}>
                <Input
                    key={index+'input'}
                    label=''
                    width='100%'
                    height='30px'
                    textarea={false}
                    update={(event) => inputChangeHandler('name', index, event.target.value)}
                    val={skill.name}
                />
                <Dropdowm
                    key={index+'dd'}
                    value={skill.proficiency}
                    update={(event) => inputChangeHandler('proficiency', index, event.target.value.toLowerCase())}
                />
                <button onClick={() => removeSkill(index)} style={buttonStyle}>X</button>
            </div>
        )
    });

    return(
        <ElementContainer save={props.save} title={props.title}>
            <div style={viewStyle}>
                {skillsJSX}
            </div>
            <Button click={addSkill} color={'white'}>{'Add skill'}</Button>
        </ElementContainer>
    );
};

export default Skills;