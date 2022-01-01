import React, { useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'

const ScreenView = () => {
    const[userPassWord, setUserPassWord]=useState('')
    const [userText, setUserText] = useState('')
    const [user, setUser] = useState('')
    const [passWord, setPassWord] = useState('')
    const getInfor = () => {
        setUserText(user)
        setUserPassWord(passWord)
        AsyncStorage.setItem('user', user);
        AsyncStorage.setItem('passWord', passWord);
    }
    const getInformation = () => {

        AsyncStorage.getItem('user', (error, value) => {
            setUserText(value)
        })
        AsyncStorage.getItem('passWord', (error, value) => {
            setUserPassWord(value)
        })
    } 

    return (
        <View style={{ backgroundColor: 'white', justifyContent: 'center' }}>
            <TextInput
                style={{ backgroundColor: 'gray', marginVertical: 10, padding: 10, }}
                placeholder=" Nhap vao"
                value={user}
                onChangeText={value => {
                    setUser(value)
                }} />
            <TextInput
                style={{ backgroundColor: 'gray', marginVertical: 10, padding: 10, }}
                placeholder=" Nhap vao"
                value={passWord}
                onChangeText={value => {
                    setPassWord(value)
                }} />
            <TouchableOpacity
                style={{ backgroundColor: 'red', padding: 5, alignItems: 'center', justifyContent: 'center', borderRadius: 10, width: 100 }}
                onPress={getInfor}>
                <Text style={{ color: 'white', fontSize: 24 }}>Log in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ backgroundColor: 'yellow', padding: 5, alignItems: 'center', justifyContent: 'center', borderRadius: 10, width: 150, marginVertical: 10 }}
                onPress={getInformation}>
                <Text style={{ color: 'black', fontSize: 24 }}>Show infor</Text>
            </TouchableOpacity>
            <Text>{userText}</Text>
            <Text>{userPassWord}</Text>
        </View>
    )
}

export default ScreenView