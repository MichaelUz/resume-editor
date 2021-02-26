import React from 'react';
import {Text, View, Font } from '@react-pdf/renderer';

import allStyles from './styles';

const TitledSection = (props) => {

    const styles = {
        ...allStyles.Section
    }

    const makeHR = () => {
        return(
            <View style={styles.hrContainer}>
                <View style={styles.hr}></View>
            </View>
        )
    }

    const makeHeading = (title) => {
        return(
            <View style={styles.heading}>
                <Text style={styles.headingTitle}>{title}</Text>
                {makeHR()}
            </View>
        );
    }

    return (
        <View style={styles.titledSection}>
            {makeHeading(props.section)}
            {props.children}
        </View>
    );
}

export default TitledSection;