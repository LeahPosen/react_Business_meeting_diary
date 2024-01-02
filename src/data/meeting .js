import { observable, action, makeObservable, runInAction, toJS } from "mobx";
import axios from 'axios'
class Meeting {
    meetingsList = [];
    constructor() {
        makeObservable(this, {
            meetingsList: observable,
            getMeetingsList: action,
            postMeeting: action
        });
        this.getMeetingsList();

    }

    getMeetingsList() {
        axios.get("http://localhost:8787/appointments").then((res) => {
            runInAction(() => {
                this.meetingsList = res.data;
            })
            if (toJS(this.meetingsList.length == 0)) {
                this.postMeeting(
                    {
                        "serviceName": "Fashion productions",
                        "dateTime": "2024-01-08T10:00:00.000Z",
                        "clientName": "John Doe",
                        "clientPhone": "123-456-7890",
                        "clientEmail": "johndoe@example.com"
                    });
                this.postMeeting(
                    {
                        "serviceName": "Fashion productions",
                        "dateTime": "2024-01-02T10:00:00.000Z",
                        "clientName": "Jane Doe",
                        "clientPhone": "555-456-7890",
                        "clientEmail": "janedoe@example.com"
                    });
                this.postMeeting(
                    {
                        "serviceName": "Bride's makeup",
                        "dateTime": "2024-01-12T10:00:00.000Z",
                        "clientName": "John Smith",
                        "clientPhone": "123-456-7891",
                        "clientEmail": "johnsmith@example.com"
                    });
                this.postMeeting(
                    {
                        "serviceName": "Bride's makeup",
                        "dateTime": "2024-01-04T10:00:00.000Z",
                        "clientName": "Jane Smith",
                        "clientPhone": "555-456-7891",
                        "clientEmail": "janesmith@example.com"
                    });
                this.postMeeting(
                    {
                        "serviceName": "Evening makeup",
                        "dateTime": "2024-01-17T10:00:00.000Z",
                        "clientName": "Acme Corporation",
                        "clientPhone": "123-456-7892",
                        "clientEmail": "acme@example.com"
                    });
                this.postMeeting(
                    {
                        "serviceName": "Evening makeup",
                        "dateTime": "2024-01-07T10:00:00.000Z",
                        "clientName": "XYZ Company",
                        "clientPhone": "555-456-7892",
                        "clientEmail": "xyz@example.com"
                    });
                this.postMeeting(
                    {
                        "serviceName": "Personal makeup workshop",
                        "dateTime": "2024-01-03T10:00:00.000Z",
                        "clientName": "Bard",
                        "clientPhone": "123-456-7893",
                        "clientEmail": "bard@example.com"
                    });
                this.postMeeting(
                    {
                        "serviceName": "Personal makeup workshop",
                        "dateTime": "2024-01-02T23:00:00.000Z",
                        "clientName": "LaMDA",
                        "clientPhone": "555-456-7893",
                        "clientEmail": "lamda@example.com"
                    });
            }
            console.log(res.data);
        }).catch((error) => {
            return error.response.status;
        });

    }

    postMeeting(meeting) {
        return new Promise((resolve, reject) => {
            axios.post("http://localhost:8787/appointment", meeting)
                .then((res) => {
                    if (res.status === 200) {
                        runInAction(() => {
                            this.meetingsList.push(meeting);
                        });
                    } else {
                        console.error("Meeting was not added. Unexpected status:", res.status);
                    }
                    resolve(res.status); 
                })
                .catch((error) => {
                    reject(error); 
                });
        });
    }

}
export default new Meeting();
