import React from 'react';
import {PDFViewer,  Page, Text, View, Document, Font, PDFDownloadLink } from '@react-pdf/renderer';
import { withRouter } from 'react-router-dom';
import MainTitle from '../MainTitle/MainTitle';
import Button from '../Button/Button';
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
        <Document title={props.title}>
            <Page size="LETTER" style={styles.page}>
                {sectionsJSX}
            </Page>
        </Document>
    );
    
    //Show pdf viewer on desktop
    let jsx = 
        <div className={classes.ResumeDisplay}>
            <PDFViewer style={styles.pdfViewer} scale={2.0}>
                {MyDocument()}
            </PDFViewer>
        </div>

    let fileName = props.title.replace(/\s/g, '') + '.pdf';
    
    //On mobile display download button instead of resume
    if(window.innerWidth < 1000){
        jsx =
        <div className={classes.downloadPage}>
            <MainTitle/>
            <PDFDownloadLink className={classes.download} document={<MyDocument/>} fileName={fileName}>
                {({ blob, url, loading, error }) => (loading ? '   ...' : 'Download')}
            </PDFDownloadLink>
            <p>{fileName}</p>
            <div className={classes.button}>
                <Button click={() => props.history.push('/')} width="30%" color="blue">Home</Button>
            </div>
            
        </div>
    }
    
    return jsx;

}

export default withRouter(ResumeDisplay);