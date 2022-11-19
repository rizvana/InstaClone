import React, { useEffect, useState } from 'react'
import './PostView.css'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


function PostView() {
    const [state, setState] = useState([]);
    const navigate = useNavigate()
    function toMonthName(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber - 1);

        // 👇️ using visitor's default locale
        return date.toLocaleString([], {
            month: 'short',
        });
    }
    useEffect(() => {
        axios.get('https://anantha-1998-mern-app.herokuapp.com/')
            .then(function (response) {
                setState(response.data.reverse());
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])
    return (
        <>
            <div className="navBar">
                <img className='logoImg' src="images/icon.svg" alt="logo" />
                <h1 className='logo'>Instaclone</h1>
                <img onClick={() => navigate('/post')} className='camera' src="images/camera.png" alt="camera" />
            </div>
            {state.map(user => {
                let base64String = btoa(
                    String.fromCharCode(...new Uint8Array((user.PostImage.data.data)))
                );
                console.log(base64String);
                return (
                    <>
                        <div className='post'>
                            <div className="name">
                                <div className="nameAndlocation">
                                    <h3>{user.name}</h3>
                                    <h3>{user.location}</h3>
                                </div>
                                <img src="images/more_icon.svg" alt="" />
                            </div>
                            <div className="postImg">
                                <img src={`data:image/png;base64,${base64String}`} alt="PostedImage" />
                            </div>
                            <div className="likeshare">
                                <div>
                                    <img src="images/heart@2x.png" alt="like" />
                                    <img src="images/share@2x.png" alt="like" />
                                    <p>{user.date.split("/")[0] + " " + toMonthName(parseInt(user.date.split("/")[1])) + "," + user.date.split("/")[2]}</p>
                                </div>
                                <p>{user.likes} likes</p>
                            </div>
                            <div className="description">
                                <h3>{user.description}</h3>
                            </div>
                        </div>
                    </>
                )
            })
            }

        </>
    )
}

export default PostView