import React from 'react';
import {PDFViewer,  Page, Text, View, Document, Font } from '@react-pdf/renderer';
import TitledSection from './TitledSection';
import * as Sections from './Sections';

import allStyles from './styles';

import classes from './ResumeDisplay.module.css'

const ResumeDisplay = (props) => {  
    
    const styles = allStyles.Meta;

    const sections = [
        'PersonalInformation',
        'Education',
        'Experience',
        'Projects',
        'Skills'
    ]

    let sectionsJSX = sections.map((section) => {

        let SectionComponent = Sections[section];
        let data = props.resume[section];
        
        if(!Array.isArray(data) || (Array.isArray(data) && data.length > 0))
            return <SectionComponent key={'displaySeciton' + section} title={section} data={props.resume[section]}/>;
        else 
            return null;
    });
    
    // Create Document Component
    const MyDocument = () => (
        <PDFViewer style={styles.pdfViewer} scale={2.0}>
            <Document title={props.title}>
                <Page size="LETTER" style={styles.page}>
                    {sectionsJSX}
                </Page>
            </Document>
        </PDFViewer>
    );
    
    return (
        <div className={classes.ResumeDisplay}>
            {MyDocument()}
        </div>
    );

}

export default ResumeDisplay;