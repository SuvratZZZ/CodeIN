import { GoogleLogin as GoogleLoginComponent, googleLogout } from '@react-oauth/google';
import { useAuthStore } from '../store/useAuthStore';

const GoogleLogin = () => {
    const { googleLogin } = useAuthStore();

    function handleLogout() {
        googleLogout();
    }

    return (
        <div className="w-full">
            <GoogleLoginComponent
                onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                    googleLogin(credentialResponse);
                }}
                onError={() => {
                    console.log("Login Failed");
                }}
                useOneTap
                shape="rectangular"
                text="signin_with"
                size="large"
                width="100%"
                locale="en"
            />
        </div>
    )
}

export default GoogleLogin;