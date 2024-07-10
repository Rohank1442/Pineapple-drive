import { useState } from "react";
import "./Display.css";
const Display = ({ contract, account }) => {
    const [data, setData] = useState("")
    const getdata = async () => {
        let dataArray;
        const OtherAddress = document.querySelector(".address").value;
        console.log(OtherAddress);
        console.log("5");
        try {
            if (OtherAddress) {
                dataArray = await contract.display(OtherAddress);
                console.log(dataArray);
            } else {
                dataArray = await contract.display(account);
            }
        } catch (e) {
            alert("You don't have access");
        }
        console.log("1");
        // Object.keys({ 'key': 'value' })
        // if (window.dataArray) {
        //     Object.assign(window.dataArray, {})
        // }
        const isEmpty = Object.keys(dataArray).length == 0;
        // account.toString();
        console.log("2");
        console.log(isEmpty);
        console.log("3");

        if (!isEmpty) {
            const str = dataArray.toString(); 
            const str_array = str.split(",");
            console.log(str);
            console.log(str_array);
            const images = str_array.map((item, i) => {
                return (
                    <a href={item} key={i} target="_blank">
                        <img key={i} src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
                            alt="new"
                            className="image-list"
                        ></img>
                    </a>
                )
            })
            setData(images);
        }
        else {
            alert("No Image to display");
        }
    };
    return (
        <>
            <div className="image-list">{data}</div>
            <input
                type="text"
                placeholder="Enter Address"
                className="address"
            ></input>
            <button className="center button" onClick={getdata}>
                Get Data
            </button>
        </>
    );
};
export default Display;