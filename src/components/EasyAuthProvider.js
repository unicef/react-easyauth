import React from 'react'
import EasyAuthContext from './EasyAuthContext'
/**
** It performs actual token access and refresh mechanism
 ** getToken receives the tokem from .auth/me 
 ** refreshToken which handle the token expiry
 ** App can also call refreshToken from its page in order to refresh the token
 ** By default apiFetch and graphApiFetch handle the token refresh
*/
const EasyAuthProvider = (props) => {
    const [loginUser, setLoginUser] = React.useState({
        name: '',
        token: '',
        expiresOn: '',
        url: props.url,
        graphUrl: props.graphUrl
    })

    React.useEffect(() => {
        getToken()
    }, [])

    const getToken = () => {
        fetch(props.url + '/.auth/me')
            .then(function (res) {
                console.log(res)
                if (res.ok) {
                    return res.json()
                }
            })
            .then(res => {
                console.log(res)
                if (res) {
                    setLoginUser({
                        name: res[0].user_id,
                        token: res[0].access_token,
                        expiresOn: res[0].expires_on,
                        url: props.url,
                        graphUrl: props.graphUrl
                    })
                }
            })
            .catch(error => {
                console.log('error -', error)
            })
    }
    const handleRefresh = () => {
        fetch(props.url + '/.auth/refresh')
            .then(function (res) {
                console.log(res)
                if (res.ok) {
                    return res
                }
            })
            .then(res => {
                console.log('Refresh success')
                getToken()
                console.log(res)
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <React.Fragment>
            <EasyAuthContext.Provider
                value={{
                    userData: loginUser,
                    refreshToken: () => {
                        console.log('Refresh started')
                        handleRefresh()
                        console.log('Refresh completed')
                    }
                }}
            >
                {props.children}
            </EasyAuthContext.Provider>
        </React.Fragment>
    )
}

export default EasyAuthProvider 