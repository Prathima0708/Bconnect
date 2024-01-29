// // Import necessary modules
// import React from 'react';
// import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
// import Header from '../../components/Header';

// // Sample data for the ledger
// const ledgerData = [
//   { id: '1', date: '2023-11-15', description: 'Item 1', amount: 50.00 },
//   { id: '2', date: '2023-11-16', description: 'Item 2', amount: -20.00 },
//   // Add more ledger entries as needed
// ];

// const LedgerScreen = () => {
//   return (
//     <SafeAreaView style={styles.container}>
     
//     <Header title="Ledger" />
//     <View style={styles.container}>
//       <Text style={styles.title}>Ledger</Text>
//       <FlatList
//         data={ledgerData}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.entryContainer}>
//             <Text style={styles.date}>{item.date}</Text>
//             <Text style={styles.description}>{item.description}</Text>
//             <Text style={styles.amount}>{item.amount.toFixed(2)}</Text>
//           </View>
//         )}
        
//       />
//     </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   entryContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     borderBottomWidth: 1,
//     borderColor: '#ccc',
//     paddingVertical: 8,
//   },
//   date: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   description: {
//     flex: 1,
//     fontSize: 16,
//     marginLeft: 8,
//   },
//   amount: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default LedgerScreen;


import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, SafeAreaView, ScrollView } from 'react-native';
import Header from '../../components/Header';

const ledgerData = [
  { id: '1', date: '2023-11-15', particulars: 'Item 1', voucherType: 'Sale', voucherNo: 'V001', dr: 50.00, cr: 0.00, balance: 50.00 },
  { id: '2', date: '2023-11-16', particulars: 'Item 2', voucherType: 'Expense', voucherNo: 'V002', dr: 0.00, cr: 20.00, balance: 30.00 },
  // Add more ledger entries as needed
];

const LedgerScreen = () => {
  const [toDate, setToDate] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Ledger" />
      <View style={styles.container}>
        {/* Date Input Boxes */}
        <View style={styles.dateInputContainer}>
          <Text style={styles.dateInputLabel}>Nov 13 2023</Text>
          <Text style={styles.dateInputLabel}>To</Text>
          <Text style={styles.dateInputLabel}>Nov 15 2023</Text>
         
        </View>
        <ScrollView horizontal={true}>
          <View>
            {/* Column Headers */}
            <View style={styles.tableHeader}>
              <Text style={styles.columnHeader}>Date</Text>
              <Text style={styles.columnHeader}>Particulars</Text>
              <Text style={styles.columnHeader}>Voucher Type</Text>
              <Text style={styles.columnHeader}>Voucher No</Text>
              <Text style={styles.columnHeader}>Dr.</Text>
              <Text style={styles.columnHeader}>Cr.</Text>
              <Text style={styles.columnHeader}>Balance</Text>
            </View>
            {/* Ledger Entries */}
            <FlatList
              data={ledgerData}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.entryContainer}>
                  <Text style={styles.entryColumn}>{item.date}</Text>
                  <Text style={styles.entryColumn}>{item.particulars}</Text>
                  <Text style={styles.entryColumn}>{item.voucherType}</Text>
                  <Text style={styles.entryColumn}>{item.voucherNo}</Text>
                  <Text style={styles.entryColumn}>{item.dr.toFixed(2)}</Text>
                  <Text style={styles.entryColumn}>{item.cr.toFixed(2)}</Text>
                  <Text style={styles.entryColumn}>{item.balance.toFixed(2)}</Text>
                </View>
              )}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  dateInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateInputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor:'white',
    padding:10,
    borderRadius:10,
    fontFamily:'regular'
  },
  dateInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff', // White background
    borderColor: '#ccc',
    borderWidth: 1,
    marginLeft: 8,
    paddingHorizontal: 8,
    fontFamily:'regular'
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 8,
    paddingTop: 8,
    marginBottom: 8,
    fontFamily:'regular'
  },
  columnHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    padding:10,
    fontFamily:'regular'
  },
  entryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
  },
  entryColumn: {
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
    fontFamily:'regular'
  },
});

export default LedgerScreen;




