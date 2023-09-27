import React, { Component } from 'react';
import './App.css';
import { appList } from 'components/appList';


class App extends Component {

    constructor() {
        super();
        this.state = {
            categorize: false
        }
        this.categorized = Object.keys(appList).reduce((prev, key) => {
            const app = appList[key];
            prev[app.type].push({
                id: key,
                name: app.name,
                img: app.img
            });
            return prev;
        }, { gif: [], image: [], other: [] });
        this.categories = {
            gif: 'Generadores de GIFs',
            image: 'Generadores de imágenes',
            other: 'Otros'
        }
    }

    render() {
        return (
            <div className='labs-app'>
                <div className='header'>
                    <img src={`${process.env.RESOURCES_URL}/labs.png`} alt="progredemente labs"/>
                    <div className='title-container'>
                        <div className='title'>progredemente labs</div>
                        <div className='subtitle'>Donde sí puedes <a href='https://www.youtube.com/watch?v=QNTZbJSQVis' target='_blank' rel="noopener noreferrer">liarla parda</a></div>
                        <div className='author'>por <a href='/'>progredemente</a></div>
                    </div>
                </div>
                <div className='app-container'>
                    <div className='actions'>
                        <div className='prg-button' onClick={() => {
                            this.setState({ categorize: !this.state.categorize })
                        }}>
                            {
                                this.state.categorize ? 'Descategorizar' : 'Categorizar'
                            }
                        </div>
                    </div>
                    {
                        !this.state.categorize && Object.keys(appList).map((k) => {
                            const app = appList[k];
                            return (
                                <a key={k} className='app' href={`/${k}`}>
                                    <img src={`${process.env.RESOURCES_URL}/${app.img}`} />
                                    <div>{app.name}</div>
                                </a>
                            );
                        })
                    }
                    {
                        this.state.categorize && Object.keys(this.categorized).map((k) => {
                            const category = this.categorized[k];
                            return (
                                <>
                                <div key={k} className='category'>{this.categories[k]}</div>
                                {
                                    category.map((c) => {
                                        return (
                                            <a key={c.id} className='app'href={`/${c.id}`}>
                                                <img src={`${process.env.RESOURCES_URL}/${c.img}`} />
                                                <div>{c.name}</div>
                                            </a>
                                        );
                                    })
                                }
                                </>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}

export default App;
