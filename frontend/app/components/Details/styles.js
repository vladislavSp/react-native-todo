import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   title: {
       fontSize: 16,
       color: '#fff',
       marginBottom: 16,
   },
   text: {
       color: '#fff',
       marginBottom: 10,
   },
   tabList: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       marginVertical: 32,
   },
   tab: {
       justifyContent: 'center',
       alignItems: 'center',
       borderRadius: 6,
       width: '30%',
       height: 43,
   },
   tabText: {
        fontFamily: 'RoadRadioBlack',
        color: '#fff',
        textAlign: 'center',
        opacity: 0.5,
        fontSize: 10,
   },
   tabTextActive: {
       opacity: 1,
   },
   headerTable: {
       height: 24,
       flexDirection: 'row',
   },
   tableText: {
       fontFamily: 'RoadRadioBlack',
       fontSize: 15,
       color: '#fff',
   },
   tableTextFirst: {
       marginLeft: 3,
       marginRight: 17,
   },
   tableRow: {
       backgroundColor: '#333333',
       marginBottom: 4,
       borderRadius: 6,
       height: 21,
       paddingLeft: 34,
       justifyContent: 'center',
   },
   tableRowText: {
       fontFamily: 'RoadRadioBlack',
       fontSize: 11,
       color: '#fff',
   }
});
