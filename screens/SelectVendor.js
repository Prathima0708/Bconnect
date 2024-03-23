import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { SIZES ,FONTS} from '../constants'
import Button from '../components/Button'
import { commonStyles } from '../styles/CommonStyles'
import axios from 'axios'
import { fetchVendorsList } from '../constants/utils/URL'

const SelectVendor = () => {
    const [vendors,seVendors]=useState([])
    useEffect(()=>{
        const fetchVendors=async()=>{
            const res=await axios.get(`${fetchVendorsList}`)
            console.log('vendors list',res.data)
        }
       fetchVendors()

    },[])
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: 'white',
                fontFamily: 'regular',
            }}
        >
            <View
                style={{
                    flex: 1,
                    padding: 16,
                    ...FONTS.body4,

                    marginVertical: SIZES.padding * 2,
                    textAlign: 'center',
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Header title="Select Vendor" />
                </View>
                
                <Button
                    title="select vendor"
                   
                    filled
                   // onPress={onSubmit}
                    style={commonStyles.btn}
                />
            </View>
        </SafeAreaView>
    )
}

export default SelectVendor
