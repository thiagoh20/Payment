import axios from "axios";
import { sanitizeResponse } from "./sanitizeResponse";

export const responseNotification = async (phone: string, payload: any) => {
    try {
        await axios({
            method: 'post',
            url: `https://www.cpocketbot.com/api/sendPaymentNotify`,
            headers: {
                'Content-Type': 'application/json'
            },                                
            data: {
                from: phone,
                response: sanitizeResponse(payload)
            }
        });
    } catch(err) {
        console.log(err)
    }
} 