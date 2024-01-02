import { observable, action, makeObservable, runInAction, toJS } from "mobx";
import axios from "axios";
class Service {
    servicesList = [];
    count = 0;
    constructor() {
        makeObservable(this, {
            servicesList: observable,
            getServicesList: action,
            postService: action
        });
        this.getServicesList();
    }
    getServicesList() {
        axios.get("http://localhost:8787/services").then((res) => {
            runInAction(() => {
                this.servicesList = res.data;
            })
            if (toJS(this.servicesList.length == 0)) {
                this.postService({
                    "id": "10",
                    "name": "Evening makeup",
                    "description": "Glowing and durable makeup to your taste",
                    "price": 300,
                    "duration": 1,
                    "image": "https://img.freepik.com/free-photo/golden-face-powder-makeup-product-cosmetic-generative-ai_188544-9719.jpg?w=1060&t=st=1704149855~exp=1704150455~hmac=c8c7140ef2760a84fcbcb31c89c15b3b1f6fadbb3d607cd64600922fdb624aa0",
                });
                this.postService({
                    "id": "20",
                    "name": "Bride's makeup",
                    "description": "Durable and radiant bridal makeup for a perfect look",
                    "price": 1500,
                    "duration": 1.5,
                    "image": "https://img.freepik.com/free-photo/makeup-brushes-burst-beige-powder-dark-background_23-2148209045.jpg?t=st=1704150025~exp=1704150625~hmac=8267f47388727914141fa9266a2e5e18f85edfd332fee56c29b62455fbb52dd9",
                });
                this.postService({
                    "id": "30",
                    "name": "Personal makeup workshop",
                    "description": "Learn how to make yourself perfectly matched",
                    "price": 600,
                    "duration": 2,
                    "image": "https://t4.ftcdn.net/jpg/01/17/33/75/240_F_117337584_HTxMCryXz0UVvJo8Kbm0ptKDDxMDqAUx.jpg",
                });
                this.postService({
                    "id": "40",
                    "name": "Fashion productions",
                    "description": "Professional makeup perfectly matched to your fashion",
                    "price": 5000,
                    "duration": 5,
                    "image": "https://img.freepik.com/free-photo/powder-brushes-with-color-pigment_23-2148209014.jpg?t=st=1704150139~exp=1704150739~hmac=36c074a8a178eb0a4f06654785e2bc3714e7ef76cf6679853acf43e70616bd0b",
                });
            }
        }).catch((error) => {
            console.log(error);
        });

    }
    postService(service) {
        this.count++;
        service.id = this.count;
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:8787/service', service)
                .then((res) => {
                    if (res.status === 200) {
                        runInAction(() => {
                            this.servicesList.push(service);});
                            console.log(service);
                    } else {
                        console.error("Service was not added. Unexpected status:", res.status);
                    }
                    resolve(res.status); // Resolve with the status code
                })
                .catch((error) => {
                    // console.error("Error adding meeting:", error);
                    reject(error); // Reject with the error for further handling
                });
        });
    }
    // postService(service) {
    //     this.count++;
    //     service.id = this.count;
    //     axios.post('http://localhost:8787/service', service).then((res) => {
    //         runInAction(() => {
    //             this.servicesList.push(service);
    //         })
    //         console.log(service);
    //         console.log( this.servicesList);
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    // }

}
export default new Service();

