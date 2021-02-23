import React, { useState } from 'react';
import axios from 'axios';
const Data = () => {
    const [typep, setTypep] = useState('girlfriend');
    const [numberp, setNumberp] = useState(1);
    const options = {
        method: 'GET',
        url: 'https://adult-movie-provider.p.rapidapi.com/api/video/FindVideo',
        params: { keyword: typep, offset: '0', next: numberp },
        headers: {
            'x-rapidapi-key':
                '09c33fb821msh7d4a45c2a95634ap198cc5jsn159c7443481e',
            'x-rapidapi-host': 'adult-movie-provider.p.rapidapi.com',
        },
    };
    let id = 0;
    // const [pData, setPData] = useState([]);
    const [rawData, setRawData] = useState([]);
    const getData = () => {
        axios
            .request(options)
            .then(function (response) {
                const wData = response.data;
                // setPData(rawData[0]);
                setRawData(wData);
                // console.log(wData);
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    return (
        <>
            <div className="alll">
                <h2 className="ext">
                    <input
                        value={typep}
                        onChange={(e) => setTypep(e.target.value)}
                    />
                </h2>
                <h2 className="ext">
                    <input
                        value={numberp}
                        onChange={(e) => setNumberp(e.target.value)}
                    />
                </h2>
                <button className="ext" onClick={() => getData()}>
                    <h5>get data</h5>
                </button>
            </div>

            {rawData.map((data) => {
                const {
                    title,
                    thumbs,
                    embed_url,
                    pornstars,
                    duration,
                    dateadded,
                    channels,
                } = data;
                return (
                    <div className="jumbotron" key={id++}>
                        <h1 className="text-info">{title}</h1>

                        {thumbs.map((thumb) => {
                            return (
                                <img
                                    className="spa"
                                    src={thumb}
                                    width="320px"
                                    height="220px"
                                    alt={title}
                                />
                            );
                        })}
                        <h3>
                            <a
                                href={embed_url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Link
                            </a>
                        </h3>
                        <h3 className="text-warning">Duration : {duration}</h3>
                        <h3 className="text-danger">
                            Pornstars :{' '}
                            {pornstars.map((pornstar) => {
                                return (
                                    <span className="text-success">
                                        {pornstar} ,{' '}
                                    </span>
                                );
                            })}
                        </h3>
                        <h3 className="text-warning">
                            Tags :
                            {channels.map((tag) => {
                                return (
                                    <span className="text-danger"> {tag},</span>
                                );
                            })}
                        </h3>
                        <h3>Date Added : {dateadded}</h3>
                    </div>
                );
            })}
        </>
    );
};

export default Data;
