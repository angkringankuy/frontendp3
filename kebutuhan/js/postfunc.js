import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import {setInner,getValue} from "https://jscroot.github.io/element/croot.js";
import {setCookieWithExpireHour} from "https://jscroot.github.io/cookie/croot.js";

export default function PostSignUp(){
    let target_url = "https://asia-southeast2-rock-prism-401900.cloudfunctions.net/gcpproyek3";
    let tokenkey = "token";
    let tokenvalue = "40e27523381e236813ece16a5e420192592d2ed80cd74eafe115afbaebe874d2"; 
    let datainjson = {
        "username": getValue("username"),
        "password": getValue("password")
    }

    postWithToken(target_url,tokenkey,tokenvalue,datainjson,responseData);

}
function responseData(result) {
    if (result.error) {
        if (result.message === "Password Salah") {
            // Jika pesan kesalahan adalah "password salah", tampilkan pesan yang sesuai
            setInner("pesan", "Password yang Anda masukkan salah. Silakan coba lagi.");
        } else {
            // Pesan kesalahan lainnya
            setInner("pesan", result.message);
        }
        window.location.href = "404.html"; // Gantilah "404.html" dengan halaman error yang sesuai.
    } else {
        // Jika tidak ada kesalahan, lanjutkan dengan logika yang ada.
        setInner("pesan", result.message);
        setCookieWithExpireHour("token", result.token, 2);
        window.location.href = "dashboard.html";
    }
}