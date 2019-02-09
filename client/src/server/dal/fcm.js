const axios = require('axios');

export const subscribeTokenToTopic = (token, topic, sendNotification) => new Promise((resolve, reject) =>  {
    axios.request('https://iid.googleapis.com/iid/v1/'+token+'/rel/topics/'+topic, {
        method: 'POST',
        headers: {
            'Authorization': 'key='+process.env.FB_SERVER_KEY
        }
    }).then(() => {
        console.log('Subscribed '+token+' to "'+topic+'"');
        if (sendNotification) {
            const notification = {
                'title': 'അറിയിപ്പുകൾ സ്വീകരിക്കാൻ താല്പര്യം പ്രകടിപ്പിച്ചതിന് നന്ദി.',
                'body': 'ഒരു പുതിയ പോസ്റ്റ് പ്രസിദ്ധീകരിക്കുമ്പോഴൊക്കെ നിങ്ങൾ ആദ്യം അറിഞ്ഞിരിക്കും.',
                'click_action': 'https://infoclinic.in'
            };
            axios.request('https://fcm.googleapis.com/fcm/send', {
                method: 'POST',
                headers: {
                    'Authorization': 'key='+process.env.FB_SERVER_KEY,
                    'Content-Type': 'application/json'
                },
                data: {
                    notification,
                    'to': token
                }
            }).then(() => {
                console.log('Send message to token: '+token);
                resolve();
            }).catch(error => {
                reject(error);
            })
        } else {
            resolve();
        }
    }).catch(error => {
        reject(error);
    })
});