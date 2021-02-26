import { StyleSheet, Font } from '@react-pdf/renderer';
import fontLight from '../../assets/fonts/Roboto-Light.ttf';
import fontBold from '../../assets/fonts/Roboto-Medium.ttf';

Font.register({
    family: "Roboto", 
    src: fontLight,
    fontWeight: 'normal'
});

Font.register({
    family: "Roboto", 
    src: fontBold,
    fontWeight: 'bold'
});


//Colors
const black = '#000000';
const white = '#ffffff';
const darkBlue = '#314871';
const headingBlue = '#335898';
const hrBlue = '#adc1e5';
const highlightBlue = '#e4f1fb';
const gray = '#5b5b5b';
const schoolBlue = '#5875aa';
const degreeBlue = '#5b83cb';
const bulletBlue = '#b4c6e7';
const strongGreen = '#484b36';
const mediumGreen = '#717461';
const lightGreen = '#90907f';
const borderBlue = '#99a4b8';

//font sizes
const nameFS = 22;
const infoFS = 11;
const headingTitleFS = 14;
const regular = 10.3;
const small = 9;
const bulletSize = 14;
const descriptionSize = 10;

//other
const sectionPadding = '6pt';
const sectionMargin = '8pt';

//Word -> PDF font size
// Word * 1.39 = PDF font size

//styles
const styles = StyleSheet.create({
    Meta:{
        pdfViewer: {
            width: '100%',
            height: '100%'
        },
        page:{
            display: 'flex',
            flexDirection: 'column',
            paddingVertical: '4%',
            paddingHorizontal: '6%',
            alignItems: 'center',
            fontFamily: "Roboto",
        }
    },
    Section:{
        titledSection:{
            display: 'flex',
            width: '100%',
            marginBottom: sectionMargin,
        },
        heading:{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
        },
        headingTitle:{
            color: headingBlue,
            fontWeight: 'bold',
            fontSize: headingTitleFS,
            marginRight: '10pt'
        },
        hrContainer:{
            display: 'flex',
            flexDirection: 'column',
            padding: 0,
            margin: 0,
            flexGrow: 1,
            height: headingTitleFS,
            alignItems: 'center'
        },
        hr:{
            height: '70%',
            width: '100%',
            borderBottom: `1pt solid ${hrBlue}`,
            margin: 0
        }
    },
    PersonalInformation:{
        personalInformationView:{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
        },
        name:{ 
            fontSize: nameFS,
            color: '#314871',
            fontWeight: 'normal',
            borderBottom: `1pt solid ${darkBlue}`,
            paddingLeft: '10pt',
            paddingRight: '5pt',
            paddingBottom: '5pt',
            marginBottom: '8pt'
        },
        infoBox:{
            fontSize: infoFS,
            color: gray,
            fontWeight: 'bold',
            border: `1pt solid ${gray}`,
            paddingBottom: '4pt',
            paddingLeft: '6pt',
            paddingTop: '6pt',
            paddingRight: '1pt',
            borderRadius: '5pt',
            marginBottom: '15pt'
        }

    },
    Education:{
        degree:{
            color: degreeBlue,
            fontSize: regular,
            fontWeight: 'bold'
        },
        school:{
            color: schoolBlue,
            fontSize: regular,
        },
        timeline:{
            color: schoolBlue,
            fontSize: small,
            fontWeight: 'bold'
        },
        location:{
            color: black,
            fontSize: small
        },
        secondaryLine:{
            color: black,
            fontSize: small,
            fontWeight: 'bold'
        },
        educationView:{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: sectionPadding
        },
        educationLeft:{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
        },
        degreeSchoolBox:{
            display: 'flex',
            flexDirection: 'row'
        },
        educationRight:{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end'
        }
    },
    ShortProjExp:{
        view:{
            paddingTop: sectionPadding,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
        },
        left:{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        },
        right:{
            justifyContent: 'flex-end'
        },
        title:{
            color: headingBlue,
            fontWeight: 'bold',
            fontSize: regular
        },
        timeline:{
            color: schoolBlue,
            fontSize: small,
            fontWeight: 'bold'
        }
    },
    ProjExp:{
        view:{
            paddingTop: sectionPadding,
            display: 'flex',
            flexDirection: 'column'
        },
        header:{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
            marginBottom: 4,
        },
        title:{
            color: headingBlue,
            fontWeight: 'bold',
            fontSize: regular,
        },
        description:{
            color: black,
            fontSize: descriptionSize,
            fontWeight: 'bold',
        },
        responsibilitiesView:{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '5pt',
            marginTop: '4pt',
            flexWrap: 'wrap',
            width: '100%'
        },
        responsibilities:{
            color: black,
            fontSize: regular
        },
        timelineView:{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            width: '100%'
        },
        timeline:{
            color: schoolBlue,
            fontSize: small,
            fontWeight: 'bold' ,
            margin: '6pt 0 6pt 0'
        }
    },
    Skills: {
        view:{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            padding: '0pt 10pt 0 10pt',
            marginTop: 10,
        },
        lineView:{
            display: 'flex',
            flexDirection: 'row',
            height: '20pt',
            marginTop: '1pt',
            width: '100%'
        },
        skillsView:{
            display: 'flex',
            flexDirection: 'column',
            width: '80%',
        },
        sideView:{
            display: 'flex',
            flexDirection: 'column',
            width: '20%'
        },
        strongSkill:{
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'row',
            backgroundColor: strongGreen,
            borderTopLeftRadius: '4pt',
            borderBottomLeftRadius: '4pt',
            color: white,
            fontSize: regular,
            alignItems: 'center'
        },
        mediumSkill:{
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'row',
            backgroundColor: mediumGreen,
            color: white,
            fontSize: regular,
            marginLeft: -1,
            alignItems: 'center'
        },
        familiarSkill:{
            display: 'flex',
            justifyContent: 'space-around',
            flexDirection: 'row',
            backgroundColor: lightGreen,
            borderTopRightRadius: '4pt',
            borderBottomRightRadius: '4pt',
            color: white,
            fontSize: regular,
            marginLeft: -1,
            alignItems: 'center'
        },
        additionalSkill:{
            backgroundColor: white,
            borderRadius: '2pt',
            color: black,
            textAlign: 'center',
            paddingTop: 3.5,
            fontSize: regular,
            border: '1pt solid ' + borderBlue,
            height: '20pt',
            marginTop: '1pt',

        }
    },
    GeneralText: {
        highlightedBold:{
            fontWeight: 'bold',
            fontSize:  regular,
            backgroundColor: highlightBlue,
            margin: 0,
            padding: 0,
        },
        bold:{
            fontWeight: 'bold',
            fontSize:  regular,
            paddingBottom: '0pt',
            margin: 0,
            padding: 0,
        },
        highlighted:{
            fontSize: regular,
            backgroundColor: highlightBlue
        },
        regular:{
            color: black,
            fontSize: regular,
            margin: 0,
            padding: 0,
        },
        whiteRegular: {
            color: white,
            fontSize: regular,
            margin: 0,
            padding: 0
        },
        boldSmall:{
            fontWeight: 'bold',
            fontSize:  small,
        },
        lineView:{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            alignItems: 'center',
        },
        bulletPoint:{
            fontWeight: 'bold',
            fontSize: bulletSize,
            color: bulletBlue,
            margin: '0 3pt 0 0',
            height: '100%',
        },
        indent:{
            fontWeight: 'bold',
            fontSize: bulletSize,
            color: bulletBlue,
            marginRight: 5,
            height: '100%',
        },
    }
});

export default styles;