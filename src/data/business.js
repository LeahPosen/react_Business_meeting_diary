import { observable, action, makeObservable, runInAction, toJS } from "mobx";
import axios from "axios";
class Business {
    business;
    constructor() {
        makeObservable(this, {
            business: observable,
            getBusiness: action,
            postBusiness: action
        });
        this.getBusiness();
    }
    getBusiness() {
        axios.get("http://localhost:8787/businessData").then((res) => {
            runInAction(() => {
                this.business = res.data;
            })
            if (this.business.name == undefined) {
                this.postBusiness({
                    name: "MAKEUP & BEAUTY",
                    address: "Pardo 7",
                    phone: "0533158564",
                    owner: "Miri Posen",
                    logo: "https://drive.google.com/uc?export=view&id=1j60-5F7iSaY8PVbl8WSwzlGxkv6FF5HU",
                    description: "3158564@gmail.com"
                });
            }
        }).catch((error) => {
            console.log(error);
        });

    }
    postBusiness(busi) {
        axios.post('http://localhost:8787/businessData', busi).then((res) => {
            runInAction(() => {
                this.business = busi;
            })
            console.log(this.business);
            console.log(res.data);
        }).catch((error) => {
            console.log(error);
        });
    }
}
export default new Business();

