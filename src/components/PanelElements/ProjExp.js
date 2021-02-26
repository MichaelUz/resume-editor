import React, { useState } from 'react';
import ElementContainer from './ElementContainer/ElementContainer';
import Button from '../Button/Button';
import Input from '../Input/Input';
import SectionNav from '../SectionNav/SectionNav';


const ProjExp = (props) => {
    
    let [currentPanelIndex, updateCPIndex] = useState(0);
    const word = props.title === 'Projects' ? 'Project' : 'Experience';

    const inputChangeHandler = (dataItem, index, value) => {
        let newData = [...props.data];
        newData[index][dataItem] = value;
        props.update(newData);
    }

    const addProjExp = () => {
        let newData = [...props.data];
        newData.push({
            [word === 'Project' ? 'title' : 'company']: word,
            description: 'Did something',
            timeline: '01/2020',
            responsibilities: ''
        });
        props.update(newData);
    }

    const removeProjExp = (index) => {

        if(!window.confirm('Are you sure you want to remove this item?')) return;
        
        let newData = [...props.data];
        newData.splice(index, 1);
        props.update(newData);

        if(currentPanelIndex >= newData.length) updateCPIndex(Math.max(currentPanelIndex-1, 0));
    }


    const style = {
        width: '100%',
        marginBottom: '10px',
    }
    const sections = [];
    props.data.forEach(item => {
        //Get first key in object (supposed to be title / company)
        const key = props.title === 'Projects' ? 'title' : 'company';
        sections.push(item[key]);
    });


    
    const items = props.data.map((projExp, index) => {

        const labels = [
            props.title === 'Projects' ? 'Title' : 'Company',
            'Description',
            'Timeline',
            'Responsibilities'
        ]

        const inputs = labels.map((label) => {
            return (
                <Input
                    key={label + currentPanelIndex}
                    label={label}
                    width='95%'
                    height={label==='Responsibilities' ? '240px' : '30px'}
                    textarea={label==='Responsibilities'}
                    update={(event) => inputChangeHandler(label.toLowerCase(), index, event.target.value)}
                    val={projExp[label.toLowerCase()]}
                />
            );
            
        });

        return(
            <div style={style} key={index}>
                {inputs}
            </div>
        );
    });

     return(
        <ElementContainer save={props.save} title={props.title}>
            <SectionNav
                sections={sections}
                cur={currentPanelIndex}
                update={(index) => updateCPIndex(index)}
            />
            {items[currentPanelIndex]}
            <Button click={addProjExp} color={'white'}>{`Add ${word}`}</Button>
            <Button click={() => removeProjExp(currentPanelIndex)}color={'white'}>{`Remove ${word}`}</Button>
        </ElementContainer>
     );
}

export default ProjExp;
