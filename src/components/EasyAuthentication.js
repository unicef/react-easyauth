import React from 'react'
const EasyAuthContext = React.createContext()
/**
 * CurrencyTextField is a [react](https://reactjs.org/) component with automated currency and number format, and with [Material-ui](https://material-ui.com/) look and feel.
 *
 * CurrencyTextField is a wrapper component for <a href="https://github.com/autoNumeric/autoNumeric">autonumeric</a> and based on <a href="https://github.com/mkg0/react-numeric">react-numeric</a>.
 *
 * Main features:
 * * Adds thousands separator automatically.
 * * Adds automatically the decimals on blur.
 * * Smart input. User can only type the accepted characters depending on the current value.
 * * Lots of config options...
 * * It accepts all the `props` and `classes` of Material-Ui <a href="https://material-ui.com/api/text-field/#textfield-api">TextField API</a> (Ex: classes, label, helperText, variant).
 * * And also all the `options` from <a href="http://autonumeric.org/guide">AutoNumeric</a>
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

export { EasyAuthContext, EasyAuthProvider }