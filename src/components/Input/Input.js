import React from 'react';

const Input = (props) => {

    const styles = {
        input:{
            width: '100%',
            height: props.height !== undefined ? props.height : '30px',
            border: '1px solid rgb(200, 200, 200)',
            outline: 'none',
            borderRadius: '5px',
            paddingLeft: '5px',
        },
        div: {
            marginRight: '20px',
            width: props.width ? props.width : '45%'
        },
        p: {
            margin: '1px',
            fontWeight: 'bold',
            color: 'rgb(150, 150, 150)'
        }        
    };

    const jsx = props.textarea ? 
    <textarea style={styles.input} 
        placeholder={props.placeholder} 
        onChange={(event) => props.update(event)}
        value={props.val}
    >
        {props.children}
    </textarea> :
    <input 
        style={styles.input} 
        type={props.type ? props.type : 'text'}
        placeholder={props.placeholder} 
        onChange={(event) => props.update(event)}
        value={props.val !== undefined ? props.val : '' }
    />;

    return(
        <div style={styles.div}>
            <p style={styles.p}>{props.label}</p>
            {jsx}
        </div>
       
    );
}

export default Input;