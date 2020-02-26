import React from 'react'
const EasyAuthContext = React.createContext()

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

export { EasyAuthContext, EasyAuthProvider }