import {useState, useEffect} from "react"

export const CheckLogin = () => {
    const [isLogin, setIslogin] = useState(null)

    useEffect(() => {
        if (!isLogin) {
            const user = localStorage.getItem('login')
            if(user) {
                setIslogin(true)
            }
        }
        // console.log(isLogin);
    }, [isLogin])

    return {isLogin}
}