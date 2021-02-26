import React from 'react';
import ElementContainer from './ElementContainer/ElementContainer';
import Input from '../Input/Input';
import prettyPrint from '../../Js/PrettyPrint';

const PanelElement = (props) =>{
    
    const keys = Object.keys(props.data);

    const inputChangeHandler = (dataItem, value) => {
        const newData = {
            ...props.data,
            [dataItem]: value
        }
        props.update(newData);
    }

    //Converts key-value resume data into form information
    const info = {};
    keys.forEach((key) => {
        info[key] = {
            label: prettyPrint(key)
        };
    });

    //Form components
    const inputs = keys.map((key, index) => {

        return(
            <Input
                key={`${props.title}.${key}`}
                label={info[key].label}
                update={(event) => inputChangeHandler(key, event.target.value)}
                val={props.data[key]}
            />
        )
    });

    return(
        <ElementContainer save={props.save} title={props.title}>
            {inputs}
        </ElementContainer>
    );
}



export default PanelElement;