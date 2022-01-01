import React, {useEffect, useState} from "react"
import { TextInput, TouchableOpacity, View, Text, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Screen = () => {
    const [value, setValue] = useState('')
    const [array, setArray] = useState([])
    const [index, setIndex] = useState(NaN)
    useEffect(() => {
        AsyncStorage.getItem('arr',(error,value)=>{
            setArray(JSON.parse(value))
        })
    })
    const saveInfor = () => {
        if (!isNaN(index)) {
            // Đây là sửa
            let fixArr = [...array]
            fixArr.splice(index, 1, value)
            setArray(fixArr)
            AsyncStorage.setItem('arr', JSON.stringify(fixArr))
        } else {
            //Đây là thêm mới
            let newArr = [...array, value]
            setArray(newArr)
            AsyncStorage.setItem('arr', JSON.stringify(newArr))
        }
        setIndex(NaN)
        setValue('')
    }
    const editInformation = (item, index) => {
        setValue(item)
        setIndex(index)
    }
    const deleteInformation = (index) => {

        let array2 = array.filter((v, i) => {
            return (i != index)
        })
        setArray(array2)
        AsyncStorage.setItem('arr',JSON.stringify(array2))
    }
    const renderItem = ({ item, index }) => {
        return (
            <View style={{ flexDirection: 'row', padding: 5, borderWidth: 1 }}>
                <View style={{ flex: 1 }}>
                    <Text style={{ marginRight: 20, lineHeight: 20, color: 'red', fontSize: 15, padding: 10 }}>{item}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => editInformation(item, index)}
                        style={{ borderWidth: 1, backgroundColor: 'yellow', borderRadius: 5, padding: 5 }}>
                        <Text style={{ fontSize: 15, color: 'black', fontWeight: '500' }}>edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => deleteInformation(index)}
                        style={{ borderWidth: 1, marginLeft: 10, backgroundColor: 'red', borderRadius: 5, padding: 5 }}>
                        <Text style={{ fontSize: 15, color: 'white', fontWeight: '500' }}>remove</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
            <TextInput
                onChangeText={value => {
                    setValue(value)
                }}
                value={value}
                style={{ borderRadius: 10, borderWidth: 1, marginHorizontal: 20, width: '90%', fontSize: 15, color: 'black' }} />
            <TouchableOpacity onPress={saveInfor}
                style={{ borderWidth: 1, borderRadius: 5, justifyContent: 'center', padding: 5, width: '15%', alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
                <Text style={{ color: 'black', fontSize: 15 }}>Save</Text>
            </TouchableOpacity>
            <FlatList data={array}
                style={{ width: '100%' }}
                renderItem={renderItem}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default Screen